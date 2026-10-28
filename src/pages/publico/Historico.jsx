import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaginaInterna from "../../components/PaginaInterna";
import TituloGradiente from "../../components/TituloGradiente";
import Icone from "../../components/Icone";
import useLargura from "../../hooks/useLargura";
import { CORES } from "../../tema";

const API_URL = "http://localhost:5000";

const CORES_RISCO = {
  "mínimo": "#4CAF7D",
  "leve": "#8BC34A",
  "moderado": CORES.coral,
  "moderadamente severo": "#E8743B",
  "severo": "#D64545",
};

function formatarData(iso) {
  return new Date(iso).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function dataCurta(iso) {
  const d = new Date(iso);
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

function Grafico({ titulo, subtitulo, pontos, maximo }) {
  const L = 340;
  const A = 170;
  const margemEsq = 10;
  const margemDir = 10;
  const topo = 22;
  const base = 34;
  const area = A - topo - base;
  const util = L - margemEsq - margemDir;
  const n = pontos.length;
  const passo = util / Math.max(n, 1);
  const larguraBarra = Math.min(36, passo * 0.62);
  const resumo = pontos
    .map((p) => `${dataCurta(p.data)}: ${p.valor}, ${p.categoria}`)
    .join("; ");
    

  return (
    <div style={styles.cartaoGrafico}>
      <p style={styles.tituloGrafico}>{titulo}</p>
      <p style={styles.subGrafico}>{subtitulo}</p>

      {n < 2 ? (
        <p style={styles.semGrafico}>
          Faz pelo menos duas avaliações para veres a evolução.
        </p>
      ) : (
        <svg
          viewBox={`0 0 ${L} ${A}`}
          role="img"
          aria-label={`${titulo}. ${resumo}`}
          style={{ width: "100%", height: "auto" }}
        >
          <line
            x1={margemEsq}
            x2={L - margemDir}
            y1={topo + area}
            y2={topo + area}
            stroke="#E5E7EB"
            strokeWidth="1"
          />
          {pontos.map((p, i) => {
            const h = Math.max(3, (p.valor / maximo) * area);
            const x = margemEsq + i * passo + (passo - larguraBarra) / 2;
            const y = topo + area - h;
            const cor = CORES_RISCO[p.categoria] || "#9CA3AF";
            return (
              <g key={i}>
                <rect x={x} y={y} width={larguraBarra} height={h} rx="6" fill={cor} />
                <text
                  x={x + larguraBarra / 2}
                  y={y - 6}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={CORES.textoEscuro}
                >
                  {p.valor}
                </text>
                <text
                  x={x + larguraBarra / 2}
                  y={A - 12}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#9CA3AF"
                >
                  {dataCurta(p.data)}
                </text>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}

function Pilula({ valor, maximo, categoria }) {
  const cor = CORES_RISCO[categoria] || "#6B7280";
  return (
    <span style={{ ...styles.pilula, background: cor + "20", color: cor }}>
      <span style={{ ...styles.ponto, background: cor }} />
      {valor}/{maximo} · {categoria}
    </span>
  );
}

export default function Historico() {
  const navigate = useNavigate();
  const largo = useLargura() >= 900;
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [estado, setEstado] = useState("a-carregar");
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let cancelado = false;

    async function carregar() {
      setEstado("a-carregar");
      const uuid = localStorage.getItem("arsm_uuid");
      if (!uuid) {
        setEstado("pronto");
        return;
      }

      try {
        const resposta = await fetch(`${API_URL}/api/utilizador/${uuid}/historico`);
        if (resposta.status === 404) {
          if (!cancelado) {
            setAvaliacoes([]);
            setEstado("pronto");
          }
          return;
        }
        if (!resposta.ok) throw new Error("resposta inválida");
        const dados = await resposta.json();
        if (!cancelado) {
          setAvaliacoes(dados);
          setEstado("pronto");
        }
      } catch (e) {
        console.error(e);
        if (!cancelado) setEstado("erro");
      }
    }

    carregar();
    return () => {
      cancelado = true;
    };
  }, [tentativa]);

  const recentes = avaliacoes.slice(-8);
  const pontosPHQ9 = recentes.map((a) => ({
    valor: a.pontuacao_phq9,
    categoria: a.categoria_risco_phq9,
    data: a.data_hora,
  }));
  const pontosGAD7 = recentes.map((a) => ({
    valor: a.pontuacao_gad7,
    categoria: a.categoria_risco_gad7,
    data: a.data_hora,
  }));
  const maisRecentesPrimeiro = [...avaliacoes].reverse();

  return (
    <PaginaInterna>
      <TituloGradiente as="h1" style={{ fontSize: largo ? 40 : 30, fontWeight: 700 }}>
        O teu histórico
      </TituloGradiente>
      <p style={styles.subtitulo}>
        As tuas avaliações anteriores, guardadas de forma anónima neste navegador.
      </p>

      {estado === "a-carregar" && <p style={styles.mensagem}>A carregar...</p>}

      {estado === "erro" && (
        <div style={styles.vazio}>
          <Icone nome="alerta" tamanho={34} cor="#D64545" />
          <p style={styles.tituloVazio}>Não foi possível carregar o histórico</p>
          <p style={styles.textoVazio}>
            Verifica a tua ligação e tenta outra vez.
          </p>
          <button style={styles.botao} onClick={() => setTentativa((t) => t + 1)}>
            Tentar outra vez
          </button>
        </div>
      )}

      {estado === "pronto" && avaliacoes.length === 0 && (
        <div style={styles.vazio}>
          <Icone nome="relogio" tamanho={34} cor={CORES.azul} />
          <p style={styles.tituloVazio}>Ainda sem avaliações</p>
          <p style={styles.textoVazio}>
            Quando fizeres a tua primeira avaliação, ela vai aparecer aqui.
          </p>
          <button style={styles.botao} onClick={() => navigate("/phq9")}>
            Fazer a primeira avaliação
          </button>
        </div>
      )}

      {estado === "pronto" && avaliacoes.length > 0 && (
        <>
          <div style={{ ...styles.graficos, gridTemplateColumns: largo ? "1fr 1fr" : "1fr" }}>
            <Grafico
              titulo="Depressão (PHQ-9)"
              subtitulo="Pontuação de 0 a 27. Mais baixo é melhor."
              pontos={pontosPHQ9}
              maximo={27}
            />
            <Grafico
              titulo="Ansiedade (GAD-7)"
              subtitulo="Pontuação de 0 a 21. Mais baixo é melhor."
              pontos={pontosGAD7}
              maximo={21}
            />
          </div>

          <div style={styles.legenda}>
            {Object.entries(CORES_RISCO).map(([nome, cor]) => (
              <span key={nome} style={styles.itemLegenda}>
                <span style={{ ...styles.ponto, background: cor }} />
                {nome}
              </span>
            ))}
          </div>

          <h2 style={styles.secao}>Todas as avaliações</h2>
          <div style={{ ...styles.lista, gridTemplateColumns: largo ? "1fr 1fr" : "1fr" }}>
            {maisRecentesPrimeiro.map((a) => (
              <div key={a.id} style={styles.cartao}>
                <p style={styles.data}>{formatarData(a.data_hora)}</p>
                <div style={styles.linha}>
                  <span style={styles.rotulo}>Depressão</span>
                  <Pilula
                    valor={a.pontuacao_phq9}
                    maximo={27}
                    categoria={a.categoria_risco_phq9}
                  />
                </div>
                <div style={styles.linha}>
                  <span style={styles.rotulo}>Ansiedade</span>
                  <Pilula
                    valor={a.pontuacao_gad7}
                    maximo={21}
                    categoria={a.categoria_risco_gad7}
                  />
                </div>
              </div>
            ))}
          </div>

          <p style={styles.aviso}>
            Estes resultados são apenas uma indicação de rastreio. Variações
            pequenas entre avaliações são normais e não são um diagnóstico.
          </p>
        </>
      )}
    </PaginaInterna>
  );
}

const styles = {
  subtitulo: { margin: "8px 0 28px", fontSize: 16, color: "#6B7280" },
  mensagem: { textAlign: "center", color: "#6B7280", margin: "40px 0" },
  vazio: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 6,
    padding: "48px 24px",
    background: "#FFFFFF",
    border: "1px solid #EEEEEE",
    borderRadius: 22,
  },
  tituloVazio: { margin: "10px 0 0", fontSize: 18, fontWeight: 700, color: CORES.textoEscuro },
  textoVazio: { margin: 0, fontSize: 14.5, color: "#6B7280", maxWidth: 360, lineHeight: 1.5 },
  botao: {
    marginTop: 18,
    padding: "13px 28px",
    border: "none",
    borderRadius: 26,
    background: CORES.azulBotao,
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  },
  graficos: { display: "grid", gap: 18 },
  cartaoGrafico: {
    background: "#FFFFFF",
    border: "1px solid #EEEEEE",
    borderRadius: 20,
    padding: "20px 22px 14px",
  },
  tituloGrafico: { margin: 0, fontSize: 16, fontWeight: 700, color: CORES.textoEscuro },
  subGrafico: { margin: "4px 0 12px", fontSize: 12.5, color: "#9CA3AF" },
  semGrafico: { margin: "30px 0 34px", fontSize: 14, color: "#6B7280", textAlign: "center" },
  legenda: { display: "flex", flexWrap: "wrap", gap: "8px 18px", margin: "16px 4px 0" },
  itemLegenda: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12.5,
    color: "#6B7280",
    textTransform: "capitalize",
  },
  ponto: { display: "inline-block", width: 8, height: 8, borderRadius: "50%", flexShrink: 0 },
  secao: { margin: "34px 0 14px", fontSize: 20, fontWeight: 700, color: CORES.textoEscuro },
  lista: { display: "grid", gap: 14 },
  cartao: {
    background: "#FFFFFF",
    border: "1px solid #EEEEEE",
    borderRadius: 18,
    padding: "16px 18px",
  },
  data: { margin: "0 0 12px", fontSize: 12.5, color: "#9CA3AF" },
  linha: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 8,
  },
  rotulo: { fontSize: 14, color: "#6B7280", fontWeight: 500 },
  pilula: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    padding: "5px 12px",
    borderRadius: 20,
    fontSize: 12.5,
    fontWeight: 700,
    textTransform: "capitalize",
  },
  aviso: {
    margin: "26px 4px 0",
    fontSize: 12.5,
    fontStyle: "italic",
    color: "#9CA3AF",
    lineHeight: 1.55,
  },
};
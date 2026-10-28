import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icone from "../../components/Icone";
import useLargura from "../../hooks/useLargura";
import { CORES, FUNDO_CSS } from "../../tema";
import logo from "../../assets/arsm-logo-branco.png";

const API_URL = "http://localhost:5000";

const CORES_RISCO = {
  "mínimo": "#4CAF7D",
  "leve": "#8BC34A",
  "moderado": CORES.coral,
  "moderadamente severo": "#E8743B",
  "severo": "#D64545",
};

const ORDEM_PHQ9 = ["mínimo", "leve", "moderado", "moderadamente severo", "severo"];
const ORDEM_GAD7 = ["mínimo", "leve", "moderado", "severo"];
const ORDEM_IDADE = ["13-17", "18-24", "25-34", "35-44", "45+"];

function numero(n) {
  return String(n).replace(".", ",");
}

function percentagem(parte, total) {
  if (!total) return 0;
  return Math.round((parte / total) * 100);
}

function Indicador({ icone, rotulo, valor, sub, destaque }) {
  return (
    <div style={{ ...styles.indicador, ...(destaque ? styles.indicadorDestaque : {}) }}>
      <div style={styles.linhaIndicador}>
        <span
          style={{
            ...styles.circuloIndicador,
            background: destaque ? "#FDECEC" : CORES.azul + "25",
          }}
        >
          <Icone nome={icone} tamanho={20} cor={destaque ? "#D64545" : CORES.textoEscuro} />
        </span>
        <span style={styles.rotuloIndicador}>{rotulo}</span>
      </div>
      <p style={{ ...styles.valorIndicador, color: destaque ? "#D64545" : CORES.textoEscuro }}>
        {valor}
      </p>
      {sub && <p style={styles.subIndicador}>{sub}</p>}
    </div>
  );
}

function CartaoBarras({ titulo, subtitulo, itens, total, corDe }) {
  return (
    <section style={styles.cartao}>
      <h2 style={styles.tituloCartao}>{titulo}</h2>
      <p style={styles.subCartao}>{subtitulo}</p>

      {itens.map((item) => {
        const pct = percentagem(item.valor, total);
        return (
          <div key={item.nome} style={styles.linhaBarra}>
            <span style={styles.nomeBarra}>{item.nome}</span>
            <div style={styles.pista}>
              <div
                style={{
                  ...styles.preenchida,
                  width: `${pct}%`,
                  background: corDe(item.nome),
                }}
              />
            </div>
            <span style={styles.valorBarra}>
              {item.valor} <span style={styles.pct}>({pct}%)</span>
            </span>
          </div>
        );
      })}
    </section>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const largo = useLargura() >= 900;
  const [dados, setDados] = useState(null);
  const [estado, setEstado] = useState("a-carregar");
  const [atualizadoA, setAtualizadoA] = useState("");

  const carregar = useCallback(async () => {
    setEstado("a-carregar");
    try {
      const resposta = await fetch(`${API_URL}/api/admin/estatisticas`, {
        credentials: "include",
      });

      if (resposta.status === 401) {
        navigate("/admin");
        return;
      }
      if (!resposta.ok) throw new Error("resposta inválida");

      setDados(await resposta.json());
      setAtualizadoA(
        new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" })
      );
      setEstado("pronto");
    } catch (e) {
      console.error(e);
      setEstado("erro");
    }
  }, [navigate]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  async function sair() {
    try {
      await fetch(`${API_URL}/api/admin/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.error(e);
    }
    navigate("/admin");
  }

  const total = dados ? dados.total_avaliacoes : 0;

  const itensIdade = dados
    ? Object.entries(dados.distribuicao_faixa_etaria || {})
        .map(([nome, valor]) => ({ nome, valor }))
        .sort((a, b) => {
          const ia = ORDEM_IDADE.indexOf(a.nome);
          const ib = ORDEM_IDADE.indexOf(b.nome);
          return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
        })
    : [];

  return (
    <div style={styles.pagina}>
      <header style={{ ...styles.topo, padding: largo ? "14px 40px" : "12px 16px" }}>
        <div style={styles.interiorTopo}>
          <div style={styles.marca}>
            <img src={logo} alt="ARSM" style={{ width: largo ? 130 : 104, height: "auto" }} />
            <span style={styles.etiquetaAdmin}>Painel de administração</span>
          </div>
          <div style={styles.acoes}>
            <button style={styles.botaoTopo} onClick={carregar}>
              Atualizar
            </button>
            <button style={styles.botaoTopo} onClick={sair}>
              Sair
            </button>
          </div>
        </div>
      </header>

      <main style={{ ...styles.principal, padding: largo ? "36px 32px 56px" : "22px 16px 40px" }}>
        <div style={styles.nota}>
          <Icone nome="escudo" tamanho={18} cor="#5B4B9A" />
          <span>
            Dados agregados e anónimos. Não é possível ver respostas
            individuais nem identificar utilizadores.
            {atualizadoA && ` Atualizado às ${atualizadoA}.`}
          </span>
        </div>

        {estado === "a-carregar" && !dados && (
          <p style={styles.mensagem}>A carregar as estatísticas...</p>
        )}

        {estado === "erro" && (
          <div style={styles.erro} role="alert">
            <Icone nome="alerta" tamanho={22} cor="#D64545" />
            <div>
              <strong>Não foi possível carregar as estatísticas.</strong>
              <p style={{ margin: "4px 0 10px", fontSize: 14, color: "#6B7280" }}>
                Confirma que o servidor está ligado e tenta outra vez.
              </p>
              <button style={styles.botaoErro} onClick={carregar}>
                Tentar outra vez
              </button>
            </div>
          </div>
        )}

        {dados && (
          <>
            <div style={styles.indicadores}>
              <Indicador icone="utilizador" rotulo="Utilizadores" valor={dados.total_utilizadores} />
              <Indicador icone="lista" rotulo="Avaliações" valor={dados.total_avaliacoes} />
              <Indicador
                icone="alerta"
                rotulo="Risco urgente"
                valor={dados.total_risco_urgente}
                sub={`${percentagem(dados.total_risco_urgente, total)}% das avaliações`}
                destaque={dados.total_risco_urgente > 0}
              />
              <Indicador
                icone="relogio"
                rotulo="Média PHQ-9"
                valor={`${numero(dados.media_pontuacao_phq9)} / 27`}
                sub="Depressão"
              />
              <Indicador
                icone="relogio"
                rotulo="Média GAD-7"
                valor={`${numero(dados.media_pontuacao_gad7)} / 21`}
                sub="Ansiedade"
              />
            </div>

            {total === 0 ? (
              <p style={styles.mensagem}>
                Ainda não há avaliações registadas. Os gráficos aparecem assim
                que existirem dados.
              </p>
            ) : (
              <div style={{ ...styles.graficos, gridTemplateColumns: largo ? "1fr 1fr" : "1fr" }}>
                <CartaoBarras
                  titulo="Depressão (PHQ-9)"
                  subtitulo="Distribuição por nível de risco"
                  itens={ORDEM_PHQ9.map((nome) => ({
                    nome,
                    valor: dados.distribuicao_risco_phq9[nome] || 0,
                  }))}
                  total={total}
                  corDe={(nome) => CORES_RISCO[nome]}
                />
                <CartaoBarras
                  titulo="Ansiedade (GAD-7)"
                  subtitulo="Distribuição por nível de risco"
                  itens={ORDEM_GAD7.map((nome) => ({
                    nome,
                    valor: dados.distribuicao_risco_gad7[nome] || 0,
                  }))}
                  total={total}
                  corDe={(nome) => CORES_RISCO[nome]}
                />
              </div>
            )}

            {itensIdade.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <CartaoBarras
                  titulo="Faixa etária"
                  subtitulo="Utilizadores por faixa etária"
                  itens={itensIdade}
                  total={dados.total_utilizadores}
                  corDe={() => CORES.azul}
                />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

const styles = {
  pagina: { minHeight: "100dvh", background: "#FAFAF8" },
  topo: { background: FUNDO_CSS },
  interiorTopo: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 10,
  },
  marca: { display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" },
  etiquetaAdmin: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: 600,
    background: "rgba(255,255,255,0.22)",
    padding: "6px 14px",
    borderRadius: 16,
  },
  acoes: { display: "flex", gap: 8 },
  botaoTopo: {
    padding: "8px 18px",
    border: "1.5px solid rgba(255,255,255,0.8)",
    borderRadius: 20,
    background: "transparent",
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
  principal: { maxWidth: 1100, margin: "0 auto" },
  nota: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    background: CORES.lilas + "25",
    borderRadius: 14,
    padding: "12px 16px",
    fontSize: 13.5,
    lineHeight: 1.5,
    color: CORES.textoEscuro,
    marginBottom: 24,
  },
  mensagem: { textAlign: "center", color: "#6B7280", margin: "40px 0", fontSize: 15 },
  erro: {
    display: "flex",
    gap: 14,
    alignItems: "flex-start",
    background: "#FDECEC",
    border: "1px solid #F2C4C4",
    borderRadius: 16,
    padding: 18,
    color: "#3A3A3A",
  },
  botaoErro: {
    padding: "9px 20px",
    border: "none",
    borderRadius: 20,
    background: CORES.azulBotao,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
  },
  indicadores: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
    gap: 14,
    marginBottom: 20,
  },
  indicador: {
    background: "#FFFFFF",
    border: "1px solid #EEEEEE",
    borderRadius: 18,
    padding: "18px 20px",
  },
  indicadorDestaque: { border: "2px solid #D64545" },
  linhaIndicador: { display: "flex", alignItems: "center", gap: 10 },
  circuloIndicador: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  rotuloIndicador: { fontSize: 13.5, color: "#6B7280", fontWeight: 600 },
  valorIndicador: { margin: "12px 0 0", fontSize: 30, fontWeight: 700 },
  subIndicador: { margin: "2px 0 0", fontSize: 12.5, color: "#9CA3AF" },
  graficos: { display: "grid", gap: 20 },
  cartao: {
    background: "#FFFFFF",
    border: "1px solid #EEEEEE",
    borderRadius: 20,
    padding: "22px 24px",
  },
  tituloCartao: { margin: 0, fontSize: 17, fontWeight: 700, color: CORES.textoEscuro },
  subCartao: { margin: "4px 0 18px", fontSize: 13, color: "#9CA3AF" },
  linhaBarra: { display: "flex", alignItems: "center", gap: 12, marginBottom: 12 },
  nomeBarra: {
    width: 150,
    fontSize: 13,
    color: CORES.textoEscuro,
    textTransform: "capitalize",
    flexShrink: 0,
  },
  pista: { flex: 1, height: 14, background: "#F0F0F0", borderRadius: 7, overflow: "hidden" },
  preenchida: { height: "100%", borderRadius: 7, transition: "width 0.4s" },
  valorBarra: {
    width: 74,
    fontSize: 13,
    fontWeight: 700,
    color: CORES.textoEscuro,
    textAlign: "right",
    flexShrink: 0,
  },
  pct: { fontWeight: 400, color: "#9CA3AF" },
};
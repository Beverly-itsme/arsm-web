import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

const NIVEL = {
  "mínimo": 0,
  "leve": 1,
  "moderado": 2,
  "moderadamente severo": 3,
  "severo": 4,
};

const RECURSOS = [
  "Fala com alguém em quem confies sobre como te tens sentido.",
  "Considera procurar apoio junto dos serviços de saúde mental da tua zona.",
  "Cuidar do sono, alimentação e exercício físico pode ajudar no teu bem-estar geral.",
  "Podes repetir a avaliação daqui a duas semanas para acompanhares a evolução.",
];

function orientacao(nivel) {
  if (nivel >= 3) {
    return {
      titulo: "Os teus resultados indicam sinais mais intensos",
      texto:
        "Recomendamos que procures um profissional de saúde para uma avaliação, e que não fiques sozinho(a) com isto. Falar com alguém de confiança também pode ajudar já hoje.",
      destaque: true,
    };
  }
  if (nivel === 2) {
    return {
      titulo: "Os teus resultados indicam sinais moderados",
      texto:
        "Pode ser uma boa altura para falares com alguém de confiança ou com um profissional de saúde sobre como tens estado.",
      destaque: true,
    };
  }
  return {
    titulo: "Neste momento há poucos sinais",
    texto:
      "Continua a cuidar de ti. Se te sentires pior nas próximas semanas, repete a avaliação ou fala com alguém de confiança.",
    destaque: false,
  };
}

function formatarData(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function CartaoResultado({ rotulo, escala, pontuacao, maximo, categoria }) {
  const cor = CORES_RISCO[categoria] || "#6B7280";
  return (
    <div style={{ ...styles.cartaoResultado, borderColor: cor }}>
      <p style={styles.rotulo}>{rotulo}</p>
      <p style={styles.escala}>{escala}</p>
      <p style={styles.pontuacao}>
        {pontuacao}
        <span style={styles.maximo}>/{maximo}</span>
      </p>
      <span style={{ ...styles.pilula, background: cor + "20", color: cor }}>{categoria}</span>
    </div>
  );
}

export default function Resultado() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const largo = useLargura() >= 900;

  const [dados, setDados] = useState(state || null);
  const [estado, setEstado] = useState(state ? "pronto" : "a-carregar");

  useEffect(() => {
    if (state) return;
    let cancelado = false;

    async function carregarUltimo() {
      const uuid = localStorage.getItem("arsm_uuid");
      if (!uuid) {
        setEstado("vazio");
        return;
      }
      try {
        const resposta = await fetch(`${API_URL}/api/utilizador/${uuid}/historico`);
        if (!resposta.ok) throw new Error("resposta inválida");
        const lista = await resposta.json();
        if (cancelado) return;
        if (lista.length === 0) {
          setEstado("vazio");
        } else {
          setDados(lista[lista.length - 1]);
          setEstado("pronto");
        }
      } catch (e) {
        console.error(e);
        if (!cancelado) setEstado("vazio");
      }
    }

    carregarUltimo();
    return () => {
      cancelado = true;
    };
  }, [state]);

  if (estado === "a-carregar") {
    return (
      <PaginaInterna largura={640}>
        <p style={{ textAlign: "center", color: "#6B7280", margin: "60px 0" }}>A carregar...</p>
      </PaginaInterna>
    );
  }

  if (estado === "vazio" || !dados) {
    return (
      <PaginaInterna largura={640}>
        <TituloGradiente as="h1" style={{ fontSize: 30, fontWeight: 700 }}>
          Ainda não há resultado
        </TituloGradiente>
        <p style={{ fontSize: 15, color: "#6B7280", margin: "16px 0 24px" }}>
          Faz primeiro a avaliação para veres o teu resultado.
        </p>
        <button style={styles.botao} onClick={() => navigate("/phq9")}>
          Fazer a avaliação
        </button>
      </PaginaInterna>
    );
  }

  const {
    pontuacao_phq9,
    pontuacao_gad7,
    categoria_risco_phq9,
    categoria_risco_gad7,
    risco_urgente,
    data_hora,
  } = dados;

  const nivelMaisAlto = Math.max(
    NIVEL[categoria_risco_phq9] ?? 0,
    NIVEL[categoria_risco_gad7] ?? 0
  );
  const guia = orientacao(nivelMaisAlto);

  return (
    <PaginaInterna largura={820}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <TituloGradiente as="h1" style={{ fontSize: largo ? 38 : 28, fontWeight: 700 }}>
          O teu resultado
        </TituloGradiente>
        {data_hora && <p style={styles.dataAvaliacao}>Avaliação de {formatarData(data_hora)}</p>}
      </div>

      {risco_urgente && (
        <div style={styles.urgente} role="alert">
          <div style={styles.linhaUrgenteTitulo}>
            <Icone nome="alerta" tamanho={20} cor="#D64545" />
            <strong style={{ color: "#D64545", fontSize: 15 }}>Importante</strong>
          </div>
          <p style={styles.textoUrgente}>
            Notámos que mencionaste ter tido pensamentos de fazer mal a ti
            mesmo(a). Não estás sozinho(a), e existe ajuda disponível. Por
            favor, fala com alguém de confiança ou procura apoio profissional
            o mais rápido possível.
          </p>
          <button style={styles.botaoUrgente} onClick={() => navigate("/apoio")}>
            Ver onde pedir apoio
          </button>
        </div>
      )}

      <div style={styles.linhaResultados}>
        <CartaoResultado
          rotulo="Depressão"
          escala="PHQ-9"
          pontuacao={pontuacao_phq9}
          maximo={27}
          categoria={categoria_risco_phq9}
        />
        <CartaoResultado
          rotulo="Ansiedade"
          escala="GAD-7"
          pontuacao={pontuacao_gad7}
          maximo={21}
          categoria={categoria_risco_gad7}
        />
      </div>

      <div
        style={{
          ...styles.guia,
          ...(guia.destaque ? styles.guiaDestaque : {}),
        }}
      >
        <div style={styles.linhaGuiaTitulo}>
          <Icone nome="coracao" tamanho={20} cor={guia.destaque ? "#FFFFFF" : "#5B4B9A"} />
          <strong style={{ fontSize: 16, color: guia.destaque ? "#FFFFFF" : CORES.textoEscuro }}>
            {guia.titulo}
          </strong>
        </div>
        <p style={{ ...styles.textoGuia, color: guia.destaque ? "#FFFFFF" : CORES.textoEscuro }}>
          {guia.texto}
        </p>
        {guia.destaque && (
          <button style={styles.botaoGuia} onClick={() => navigate("/apoio")}>
            Ver onde pedir apoio
            <Icone nome="seta" tamanho={18} cor="#5B4B9A" />
          </button>
        )}
      </div>

      <div style={styles.recursos}>
        <h2 style={styles.subtitulo}>O que podes fazer agora</h2>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {RECURSOS.map((r) => (
            <li key={r} style={styles.itemRecurso}>
              <span style={styles.bolinha} />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      <button style={styles.linkApoio} onClick={() => navigate("/apoio")}>
        <Icone nome="ajuda" tamanho={18} cor="#5B4B9A" />
        Ver onde pedir apoio
      </button>

      <div style={styles.avisoLegal}>
        <Icone nome="informacao" tamanho={16} cor="#9CA3AF" />
        <p style={{ margin: 0 }}>
          Este resultado é apenas uma indicação de rastreio, não um
          diagnóstico. Só um profissional de saúde pode fazer uma avaliação
          clínica completa.
        </p>
      </div>

      <div style={{ ...styles.botoes, flexDirection: largo ? "row" : "column" }}>
        <button style={styles.botaoSecundario} onClick={() => navigate("/historico")}>
          Ver o meu histórico
        </button>
        <button style={{ ...styles.botao, flex: 1 }} onClick={() => navigate("/inicio")}>
          Concluir
        </button>
      </div>
    </PaginaInterna>
  );
}

const styles = {
  dataAvaliacao: { margin: "8px 0 0", fontSize: 14, color: "#6B7280" },
  urgente: {
    background: "#FDECEC",
    border: "1px solid #F2C4C4",
    borderRadius: 16,
    padding: 18,
    marginBottom: 22,
  },
  linhaUrgenteTitulo: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 },
  textoUrgente: { margin: 0, fontSize: 14, lineHeight: 1.6, color: "#3A3A3A" },
  botaoUrgente: {
    marginTop: 14,
    padding: "10px 20px",
    border: "none",
    borderRadius: 22,
    background: "#8190D2",
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
  },
  linhaResultados: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
    marginBottom: 22,
  },
  cartaoResultado: {
    background: "#FFFFFF",
    border: "2px solid",
    borderRadius: 20,
    padding: "22px 12px",
    textAlign: "center",
  },
  rotulo: { margin: 0, fontSize: 14, fontWeight: 600, color: CORES.textoEscuro },
  escala: { margin: "2px 0 12px", fontSize: 12, color: "#9CA3AF" },
  pontuacao: { margin: 0, fontSize: 38, fontWeight: 700, color: CORES.textoEscuro },
  maximo: { fontSize: 16, fontWeight: 400, color: "#9CA3AF" },
  pilula: {
    display: "inline-block",
    marginTop: 12,
    padding: "5px 14px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 700,
    textTransform: "capitalize",
  },
  guia: {
    background: CORES.lilas + "25",
    borderRadius: 20,
    padding: "22px 24px",
    marginBottom: 14,
  },
  guiaDestaque: {
    background: "linear-gradient(180deg, #9A8BD6, #8190D2)",
  },
  linhaGuiaTitulo: { display: "flex", alignItems: "center", gap: 10, marginBottom: 8 },
  textoGuia: { margin: 0, fontSize: 15, lineHeight: 1.65 },
  botaoGuia: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    marginTop: 16,
    padding: "12px 24px",
    border: "none",
    borderRadius: 26,
    background: "#FFFFFF",
    color: "#5B4B9A",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
  },
  recursos: {
    background: "#FFFFFF",
    border: "1px solid #EEEEEE",
    borderRadius: 18,
    padding: "20px 22px",
    marginBottom: 10,
  },
  subtitulo: { margin: "0 0 14px", fontSize: 17, fontWeight: 700, color: CORES.textoEscuro },
  itemRecurso: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    margin: "10px 0",
    fontSize: 14.5,
    lineHeight: 1.55,
    color: CORES.textoEscuro,
  },
  bolinha: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: CORES.azul,
    marginTop: 8,
    flexShrink: 0,
  },
  linkApoio: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%",
    padding: "14px 0",
    marginBottom: 6,
    background: "none",
    border: "none",
    color: "#5B4B9A",
    fontSize: 15,
    fontWeight: 700,
    textDecoration: "underline",
    cursor: "pointer",
  },
  avisoLegal: {
    display: "flex",
    gap: 8,
    alignItems: "flex-start",
    margin: "6px 4px 26px",
    fontSize: 12.5,
    lineHeight: 1.55,
    fontStyle: "italic",
    color: "#9CA3AF",
  },
  botoes: { display: "flex", gap: 12 },
  botao: {
    width: "100%",
    padding: 16,
    border: "none",
    borderRadius: 30,
    background: CORES.azulBotao,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
  },
  botaoSecundario: {
    flex: 1,
    padding: 16,
    border: `2px solid ${CORES.azulBotao}`,
    borderRadius: 30,
    background: "#FFFFFF",
    color: CORES.azulBotao,
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
  },
};
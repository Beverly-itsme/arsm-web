import { useLocation, useNavigate } from "react-router-dom";

const CORES_RISCO = {
  "mínimo": "#4CAF7D",
  "leve": "#8BC34A",
  "moderado": "#F5A623",
  "moderadamente severo": "#E8743B",
  "severo": "#D64545",
};

const RECURSOS_PADRAO = [
  "Fala com alguém em quem confies sobre como te tens sentido.",
  "Considera procurar apoio junto dos serviços de saúde mental da tua zona.",
  "Cuidar do sono, alimentação e exercício físico pode ajudar no teu bem-estar geral.",
];

export default function Resultado() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <div style={styles.container}>
        <p>Nenhum resultado encontrado. Volta a fazer a avaliação.</p>
      </div>
    );
  }

  const {
    pontuacao_phq9,
    pontuacao_gad7,
    categoria_risco_phq9,
    categoria_risco_gad7,
    risco_urgente,
  } = state;

  const corPHQ9 = CORES_RISCO[categoria_risco_phq9] || "#6B7280";
  const corGAD7 = CORES_RISCO[categoria_risco_gad7] || "#6B7280";

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.titulo}>O teu resultado</h1>

        {risco_urgente && (
          <div style={styles.avisoUrgente}>
            <p style={styles.tituloUrgente}>Importante</p>
            <p style={styles.textoUrgente}>
              Notámos que mencionaste ter tido pensamentos de fazer mal a
              ti mesmo(a). Não estás sozinho(a), e existe ajuda disponível.
              Por favor, fala com alguém de confiança ou procura apoio
              profissional o mais rápido possível.
            </p>
          </div>
        )}

        <div style={{ ...styles.cartaoResultado, borderColor: corPHQ9 }}>
          <p style={styles.rotulo}>Depressão (PHQ-9)</p>
          <p style={styles.pontuacao}>{pontuacao_phq9} / 27</p>
          <p style={{ ...styles.categoria, color: corPHQ9 }}>{categoria_risco_phq9}</p>
        </div>

        <div style={{ ...styles.cartaoResultado, borderColor: corGAD7 }}>
          <p style={styles.rotulo}>Ansiedade (GAD-7)</p>
          <p style={styles.pontuacao}>{pontuacao_gad7} / 21</p>
          <p style={{ ...styles.categoria, color: corGAD7 }}>{categoria_risco_gad7}</p>
        </div>

        <h2 style={styles.subtitulo}>O que podes fazer agora</h2>
        {RECURSOS_PADRAO.map((recurso, i) => (
          <p key={i} style={styles.recurso}>• {recurso}</p>
        ))}

        <p style={styles.aviso}>
          Este resultado é apenas uma indicação de rastreio, não um
          diagnóstico. Só um profissional de saúde pode fazer uma avaliação
          clínica completa.
        </p>

        <button style={styles.botao} onClick={() => navigate("/")}>
          Concluir
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#F5F7FA",
    fontFamily: "system-ui, sans-serif",
    padding: "32px 24px",
  },
  card: { maxWidth: "520px", width: "100%" },
  titulo: { fontSize: "28px", fontWeight: "bold", color: "#1A1A2E", textAlign: "center", marginBottom: "24px" },
  avisoUrgente: {
    backgroundColor: "#FDECEC",
    border: "1px solid #D64545",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "20px",
  },
  tituloUrgente: { fontWeight: "bold", color: "#D64545", marginBottom: "6px", fontSize: "16px" },
  textoUrgente: { color: "#3A3A3A", fontSize: "14px", lineHeight: "1.5" },
  cartaoResultado: {
    border: "2px solid",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "16px",
    textAlign: "center",
    backgroundColor: "#FFFFFF",
  },
  rotulo: { fontSize: "14px", color: "#6B7280", marginBottom: "8px" },
  pontuacao: { fontSize: "32px", fontWeight: "bold", color: "#1A1A2E", margin: 0 },
  categoria: { fontSize: "18px", fontWeight: "600", marginTop: "4px", textTransform: "capitalize" },
  subtitulo: { fontSize: "18px", fontWeight: "600", color: "#1A1A2E", marginTop: "12px", marginBottom: "12px" },
  recurso: { fontSize: "15px", color: "#3A3A3A", marginBottom: "8px", lineHeight: "1.5" },
  aviso: { fontSize: "13px", color: "#6B7280", marginTop: "20px", marginBottom: "24px", fontStyle: "italic", lineHeight: "1.4" },
  botao: {
    backgroundColor: "#4A6FA5",
    color: "#FFFFFF",
    border: "none",
    width: "100%",
    padding: "16px",
    borderRadius: "12px",
    fontSize: "17px",
    fontWeight: "600",
    cursor: "pointer",
  },
};
import { useNavigate } from "react-router-dom";

export default function Termos() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.titulo}>Antes de começares</h1>

        <p style={styles.texto}>
          Esta aplicação ajuda-te a fazer uma autoavaliação de sinais de
          depressão e ansiedade, com base em questionários usados
          internacionalmente.
        </p>

        <p style={styles.texto}>
          Não pedimos o teu nome, número de telefone ou email. As tuas
          respostas são guardadas de forma anónima, apenas para fins de
          investigação académica.
        </p>

        <p style={styles.texto}>
          Esta aplicação não substitui uma avaliação feita por um
          profissional de saúde. É apenas uma ferramenta de rastreio.
        </p>

        <button style={styles.botao} onClick={() => navigate("/idade")}>
          Concordo e quero continuar
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F7FA",
    fontFamily: "system-ui, sans-serif",
    padding: "24px",
  },
  card: {
    maxWidth: "480px",
    width: "100%",
  },
  titulo: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1A1A2E",
    textAlign: "center",
    marginBottom: "24px",
  },
  texto: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#3A3A3A",
    marginBottom: "16px",
  },
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
    marginTop: "16px",
  },
};
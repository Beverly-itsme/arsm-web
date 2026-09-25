import { useNavigate } from "react-router-dom";

export default function BoasVindas() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <p style={styles.emoji}>🌱</p>
        <h1 style={styles.titulo}>Bem-vindo(a) ao ARSM</h1>
        <p style={styles.subtitulo}>
          Um espaço privado e acolhedor para cuidares da tua saúde mental,
          ao teu ritmo.
        </p>

        <button style={styles.botao} onClick={() => navigate("/termos")}>
          Começar
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
    backgroundColor: "#E8EEF7",
    fontFamily: "system-ui, sans-serif",
    padding: "24px",
  },
  card: {
    maxWidth: "420px",
    textAlign: "center",
  },
  emoji: { fontSize: "64px", marginBottom: "16px" },
  titulo: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#1A1A2E",
    marginBottom: "12px",
  },
  subtitulo: {
    fontSize: "17px",
    color: "#3A3A3A",
    lineHeight: "1.5",
    marginBottom: "40px",
  },
  botao: {
    backgroundColor: "#4A6FA5",
    color: "#FFFFFF",
    border: "none",
    padding: "16px 48px",
    borderRadius: "12px",
    fontSize: "17px",
    fontWeight: "600",
    cursor: "pointer",
  },
};
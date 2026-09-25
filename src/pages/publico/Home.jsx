import { useNavigate } from "react-router-dom";
import NavTabs from "../../components/NavTabs";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.conteudo}>
        <NavTabs />

        <div style={styles.centro}>
          <p style={styles.emoji}>📝</p>
          <h1 style={styles.titulo}>Pronto para começar?</h1>
          <p style={styles.texto}>
            A avaliação tem 16 perguntas simples e demora cerca de 3 a 5
            minutos. As tuas respostas são sempre anónimas.
          </p>

          <button style={styles.botao} onClick={() => navigate("/phq9")}>
            Iniciar avaliação
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#F5F7FA",
    fontFamily: "system-ui, sans-serif",
    padding: "32px 24px",
  },
  conteudo: { maxWidth: "600px", margin: "0 auto" },
  centro: { textAlign: "center", marginTop: "60px" },
  emoji: { fontSize: "56px", marginBottom: "16px" },
  titulo: { fontSize: "26px", fontWeight: "bold", color: "#1A1A2E", marginBottom: "12px" },
  texto: { fontSize: "15px", color: "#6B7280", lineHeight: "1.6", marginBottom: "32px" },
  botao: {
    backgroundColor: "#4A6FA5",
    color: "#FFFFFF",
    border: "none",
    padding: "16px 40px",
    borderRadius: "12px",
    fontSize: "17px",
    fontWeight: "600",
    cursor: "pointer",
  },
};
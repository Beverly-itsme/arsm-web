import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const API_URL = "http://localhost:5000";
const FAIXAS = ["13-17", "18-24", "25-34", "35-44", "45+"];

export default function Idade() {
  const navigate = useNavigate();
  const [selecionada, setSelecionada] = useState(null);
  const [aCarregar, setACarregar] = useState(false);

  async function continuar() {
    if (!selecionada) return;
    setACarregar(true);

    try {
      let uuid = localStorage.getItem("arsm_uuid");
      if (!uuid) {
        uuid = uuidv4();
        localStorage.setItem("arsm_uuid", uuid);
      }

      await fetch(`${API_URL}/api/utilizador`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uuid, faixa_etaria: selecionada }),
      });

      navigate("/inicio");
    } catch (erro) {
      alert("Não foi possível ligar ao servidor. Verifica a tua ligação.");
      console.error(erro);
    } finally {
      setACarregar(false);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.titulo}>Qual é a tua faixa etária?</h1>

        {FAIXAS.map((faixa) => (
          <div
            key={faixa}
            onClick={() => setSelecionada(faixa)}
            style={{
              ...styles.opcao,
              ...(selecionada === faixa ? styles.opcaoSelecionada : {}),
            }}
          >
            {faixa} anos
          </div>
        ))}

        <button
          style={{
            ...styles.botao,
            ...(!selecionada ? styles.botaoDesativado : {}),
          }}
          onClick={continuar}
          disabled={!selecionada || aCarregar}
        >
          {aCarregar ? "A processar..." : "Continuar"}
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
  card: { maxWidth: "420px", width: "100%" },
  titulo: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#1A1A2E",
    textAlign: "center",
    marginBottom: "32px",
  },
  opcao: {
    border: "2px solid #D0D5DD",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "12px",
    textAlign: "center",
    cursor: "pointer",
    color: "#3A3A3A",
  },
  opcaoSelecionada: {
    borderColor: "#4A6FA5",
    backgroundColor: "#E8EEF7",
    color: "#4A6FA5",
    fontWeight: "600",
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
    marginTop: "24px",
  },
  botaoDesativado: {
    backgroundColor: "#B0B8C4",
    cursor: "not-allowed",
  },
};
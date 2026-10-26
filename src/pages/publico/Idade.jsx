import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import CartaoCentrado from "../../components/CartaoCentrado";
import TituloGradiente from "../../components/TituloGradiente";
import { CORES } from "../../tema";

const API_URL = "http://localhost:5000";
const FAIXAS = ["13-17", "18-24", "25-34", "35-44", "45+"];

export default function Idade() {
  const navigate = useNavigate();
  const [selecionada, setSelecionada] = useState(null);
  const [aCarregar, setACarregar] = useState(false);
  const [erro, setErro] = useState("");

  async function continuar() {
    if (!selecionada) return;
    setACarregar(true);
    setErro("");

    try {
      let uuid = localStorage.getItem("arsm_uuid");
      if (!uuid) {
        uuid = uuidv4();
        localStorage.setItem("arsm_uuid", uuid);
      }

      const resposta = await fetch(`${API_URL}/api/utilizador`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uuid, faixa_etaria: selecionada }),
      });

      if (!resposta.ok) throw new Error("resposta inválida");
      navigate("/inicio");
    } catch (e) {
      console.error(e);
      setErro("Não foi possível ligar ao servidor. Verifica a tua ligação e tenta outra vez.");
      setACarregar(false);
    }
  }

  return (
    <CartaoCentrado>
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <TituloGradiente as="h1" style={{ fontSize: 28, fontWeight: 700 }}>
          Qual é a tua faixa etária?
        </TituloGradiente>
      </div>
      <p style={styles.subtitulo}>
        Usamos esta informação apenas para estatísticas anónimas.
      </p>

      <div role="radiogroup" aria-label="Faixa etária">
        {FAIXAS.map((faixa) => {
          const ativa = selecionada === faixa;
          return (
            <button
              key={faixa}
              role="radio"
              aria-checked={ativa}
              onClick={() => setSelecionada(faixa)}
              style={{ ...styles.opcao, ...(ativa ? styles.opcaoAtiva : {}) }}
            >
              {faixa} anos
            </button>
          );
        })}
      </div>

      {erro !== "" && <p style={styles.erro}>{erro}</p>}

      <button
        onClick={continuar}
        disabled={!selecionada || aCarregar}
        style={{
          ...styles.botao,
          ...(!selecionada || aCarregar ? styles.botaoDesativado : {}),
        }}
      >
        {aCarregar ? "A processar..." : "Continuar"}
      </button>

      <button style={styles.voltar} onClick={() => navigate("/termos")}>
        Voltar
      </button>
    </CartaoCentrado>
  );
}

const styles = {
  subtitulo: {
    margin: "0 0 24px",
    textAlign: "center",
    fontSize: 14,
    color: "#6B7280",
  },
  opcao: {
    display: "block",
    width: "100%",
    marginBottom: 12,
    padding: "15px",
    border: "2px solid #E5E7EB",
    borderRadius: 16,
    background: "#FFFFFF",
    color: CORES.textoEscuro,
    fontSize: 16,
    cursor: "pointer",
  },
  opcaoAtiva: {
    borderColor: CORES.azul,
    background: CORES.azul + "1A",
    color: CORES.azulBotao,
    fontWeight: 700,
  },
  erro: {
    margin: "4px 0 12px",
    textAlign: "center",
    fontSize: 13,
    color: "#D64545",
  },
  botao: {
    width: "100%",
    marginTop: 12,
    padding: "16px",
    border: "none",
    borderRadius: 30,
    background: CORES.azulBotao,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
  },
  botaoDesativado: { background: "#C4CCD6", cursor: "not-allowed" },
  voltar: {
    display: "block",
    margin: "14px auto 0",
    background: "none",
    border: "none",
    color: "#6B7280",
    fontSize: 14,
    cursor: "pointer",
    textDecoration: "underline",
  },
};
import { useEffect, useState } from "react";
import NavTabs from "../../components/NavTabs";

const API_URL = "http://localhost:5000";

const CORES_RISCO = {
  "mínimo": "#4CAF7D",
  "leve": "#8BC34A",
  "moderado": "#F5A623",
  "moderadamente severo": "#E8743B",
  "severo": "#D64545",
};

export default function Historico() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [aCarregar, setACarregar] = useState(true);

  useEffect(() => {
    carregarHistorico();
  }, []);

  async function carregarHistorico() {
    setACarregar(true);
    try {
      const uuid = localStorage.getItem("arsm_uuid");
      if (!uuid) {
        setAvaliacoes([]);
        return;
      }
      const resposta = await fetch(`${API_URL}/api/utilizador/${uuid}/historico`);
      const dados = await resposta.json();
      setAvaliacoes(dados.reverse());
    } catch (erro) {
      console.error(erro);
    } finally {
      setACarregar(false);
    }
  }

  function formatarData(dataISO) {
    const data = new Date(dataISO);
    return data.toLocaleDateString("pt-PT", { day: "2-digit", month: "2-digit", year: "numeric" });
  }

  return (
    <div style={styles.container}>
      <div style={styles.conteudo}>
        <NavTabs />
        <h1 style={styles.titulo}>O teu histórico</h1>

        {aCarregar && <p style={styles.mensagem}>A carregar...</p>}

        {!aCarregar && avaliacoes.length === 0 && (
          <div style={styles.vazio}>
            <p style={styles.tituloVazio}>Ainda sem avaliações</p>
            <p style={styles.textoVazio}>
              Quando fizeres a tua primeira avaliação, ela vai aparecer aqui.
            </p>
          </div>
        )}

        {avaliacoes.map((item) => (
          <div key={item.id} style={styles.cartao}>
            <p style={styles.data}>{formatarData(item.data_hora)}</p>
            <div style={styles.linha}>
              <div style={styles.metade}>
                <p style={styles.rotulo}>Depressão</p>
                <p style={{ ...styles.valor, color: CORES_RISCO[item.categoria_risco_phq9] }}>
                  {item.pontuacao_phq9}/27 · {item.categoria_risco_phq9}
                </p>
              </div>
              <div style={styles.metade}>
                <p style={styles.rotulo}>Ansiedade</p>
                <p style={{ ...styles.valor, color: CORES_RISCO[item.categoria_risco_gad7] }}>
                  {item.pontuacao_gad7}/21 · {item.categoria_risco_gad7}
                </p>
              </div>
            </div>
          </div>
        ))}
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
  titulo: { fontSize: "24px", fontWeight: "bold", color: "#1A1A2E", marginBottom: "20px" },
  mensagem: { textAlign: "center", color: "#6B7280" },
  vazio: { textAlign: "center", marginTop: "40px" },
  tituloVazio: { fontSize: "18px", fontWeight: "600", color: "#1A1A2E", marginBottom: "8px" },
  textoVazio: { fontSize: "14px", color: "#6B7280" },
  cartao: {
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "12px",
    border: "1px solid #E5E7EB",
  },
  data: { fontSize: "13px", color: "#9CA3AF", marginBottom: "8px" },
  linha: { display: "flex", gap: "16px" },
  metade: { flex: 1 },
  rotulo: { fontSize: "13px", color: "#6B7280", marginBottom: "2px" },
  valor: { fontSize: "14px", fontWeight: "600" },
};
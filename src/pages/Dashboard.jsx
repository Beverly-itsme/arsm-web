import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

const CORES_RISCO = {
  "mínimo": "#4CAF7D",
  "leve": "#8BC34A",
  "moderado": "#F5A623",
  "moderadamente severo": "#E8743B",
  "severo": "#D64545",
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState("");
  const [aCarregar, setACarregar] = useState(true);

  useEffect(() => {
    carregarEstatisticas();
  }, []);

  async function carregarEstatisticas() {
    try {
      const resposta = await fetch(`${API_URL}/api/admin/estatisticas`, {
        credentials: "include",
      });

      if (resposta.status === 401) {
        navigate("/"); // não autenticado -> volta ao login
        return;
      }

      const json = await resposta.json();
      setDados(json);
    } catch (err) {
      setErro("Não foi possível carregar as estatísticas.");
      console.error(err);
    } finally {
      setACarregar(false);
    }
  }

  async function handleLogout() {
    await fetch(`${API_URL}/api/admin/logout`, {
      method: "POST",
      credentials: "include",
    });
    navigate("/");
  }

  if (aCarregar) return <div style={styles.container}><p>A carregar...</p></div>;
  if (erro) return <div style={styles.container}><p>{erro}</p></div>;
  if (!dados) return null;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.titulo}>Dashboard ARSM</h1>
        <button onClick={handleLogout} style={styles.botaoSair}>Sair</button>
      </div>

      <div style={styles.grelhaCartoes}>
        <Cartao titulo="Total de Utilizadores" valor={dados.total_utilizadores} />
        <Cartao titulo="Total de Avaliações" valor={dados.total_avaliacoes} />
        <Cartao
          titulo="Casos de Risco Urgente"
          valor={dados.total_risco_urgente}
          destaque
        />
      </div>

      <div style={styles.grelhaCartoes}>
        <Cartao titulo="Média PHQ-9 (Depressão)" valor={`${dados.media_pontuacao_phq9} / 27`} />
        <Cartao titulo="Média GAD-7 (Ansiedade)" valor={`${dados.media_pontuacao_gad7} / 21`} />
      </div>

      <div style={styles.secao}>
        <h2 style={styles.subtitulo}>Distribuição de Risco — Depressão (PHQ-9)</h2>
        <BarraDistribuicao dados={dados.distribuicao_risco_phq9} />
      </div>

      <div style={styles.secao}>
        <h2 style={styles.subtitulo}>Distribuição de Risco — Ansiedade (GAD-7)</h2>
        <BarraDistribuicao dados={dados.distribuicao_risco_gad7} />
      </div>

      <div style={styles.secao}>
        <h2 style={styles.subtitulo}>Distribuição por Faixa Etária</h2>
        <BarraDistribuicao dados={dados.distribuicao_faixa_etaria} cor="#4A6FA5" />
      </div>
    </div>
  );
}

function Cartao({ titulo, valor, destaque }) {
  return (
    <div style={{ ...styles.cartao, ...(destaque ? styles.cartaoDestaque : {}) }}>
      <p style={styles.cartaoTitulo}>{titulo}</p>
      <p style={{ ...styles.cartaoValor, ...(destaque ? { color: "#D64545" } : {}) }}>
        {valor}
      </p>
    </div>
  );
}

function BarraDistribuicao({ dados, cor }) {
  const total = Object.values(dados).reduce((soma, v) => soma + v, 0) || 1;

  return (
    <div>
      {Object.entries(dados).map(([categoria, valor]) => (
        <div key={categoria} style={styles.linhaBarra}>
          <span style={styles.rotuloBarra}>{categoria}</span>
          <div style={styles.barraFundo}>
            <div
              style={{
                ...styles.barraPreenchida,
                width: `${(valor / total) * 100}%`,
                backgroundColor: cor || CORES_RISCO[categoria] || "#9CA3AF",
              }}
            />
          </div>
          <span style={styles.valorBarra}>{valor}</span>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#F5F7FA",
    fontFamily: "system-ui, sans-serif",
    padding: "32px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  titulo: { fontSize: "26px", fontWeight: "bold", color: "#1A1A2E" },
  botaoSair: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #D0D5DD",
    borderRadius: "8px",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "14px",
  },
  grelhaCartoes: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  cartao: {
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  cartaoDestaque: {
    border: "2px solid #D64545",
  },
  cartaoTitulo: { fontSize: "13px", color: "#6B7280", marginBottom: "8px" },
  cartaoValor: { fontSize: "28px", fontWeight: "bold", color: "#1A1A2E" },
  secao: {
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  subtitulo: { fontSize: "16px", fontWeight: "600", color: "#1A1A2E", marginBottom: "16px" },
  linhaBarra: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    gap: "12px",
  },
  rotuloBarra: { width: "160px", fontSize: "13px", color: "#3A3A3A", textTransform: "capitalize" },
  barraFundo: {
    flex: 1,
    height: "20px",
    backgroundColor: "#F0F0F0",
    borderRadius: "10px",
    overflow: "hidden",
  },
  barraPreenchida: {
    height: "100%",
    borderRadius: "10px",
    transition: "width 0.3s",
  },
  valorBarra: { width: "24px", fontSize: "13px", fontWeight: "600", textAlign: "right" },
};
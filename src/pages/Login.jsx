import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [aCarregar, setACarregar] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setACarregar(true);

    try {
      const resposta = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // importante: envia/recebe o cookie de sessão
        body: JSON.stringify({ username, password }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.erro || "Erro ao fazer login.");
        setACarregar(false);
        return;
      }

      navigate("/dashboard");
    } catch (err) {
      setErro("Não foi possível ligar ao servidor.");
      console.error(err);
      setACarregar(false);
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h1 style={styles.titulo}>ARSM — Admin</h1>
        <p style={styles.subtitulo}>Área de administração</p>

        <input
          type="text"
          placeholder="Utilizador"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Palavra-passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        {erro && <p style={styles.erro}>{erro}</p>}

        <button type="submit" style={styles.botao} disabled={aCarregar}>
          {aCarregar ? "A entrar..." : "Entrar"}
        </button>
      </form>
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
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    width: "320px",
    display: "flex",
    flexDirection: "column",
  },
  titulo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#1A1A2E",
    marginBottom: "4px",
    textAlign: "center",
  },
  subtitulo: {
    fontSize: "14px",
    color: "#6B7280",
    textAlign: "center",
    marginBottom: "24px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #D0D5DD",
    marginBottom: "12px",
    fontSize: "15px",
  },
  erro: {
    color: "#D64545",
    fontSize: "13px",
    marginBottom: "12px",
    textAlign: "center",
  },
  botao: {
    backgroundColor: "#4A6FA5",
    color: "#FFFFFF",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "8px",
  },
};
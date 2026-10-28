import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagina from "../../components/Pagina";
import { CORES } from "../../tema";
import logo from "../../assets/arsm-logo-branco.png";

const API_URL = "http://localhost:5000";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mostrar, setMostrar] = useState(false);
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
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.erro || "Erro ao fazer login.");
        setACarregar(false);
        return;
      }

      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setErro("Não foi possível ligar ao servidor.");
      setACarregar(false);
    }
  }

  return (
    <Pagina>
      <div style={styles.centro}>
        <img src={logo} alt="ARSM" style={styles.logo} />

        <form onSubmit={handleSubmit} style={styles.cartao}>
          <h1 style={styles.titulo}>Área de administração</h1>
          <p style={styles.subtitulo}>Acesso reservado à investigadora.</p>

          <label htmlFor="utilizador" style={styles.rotulo}>
            Utilizador
          </label>
          <input
            id="utilizador"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />

          <label htmlFor="palavra-passe" style={styles.rotulo}>
            Palavra-passe
          </label>
          <div style={styles.campoSenha}>
            <input
              id="palavra-passe"
              type={mostrar ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ ...styles.input, margin: 0, paddingRight: 84 }}
              required
            />
            <button
              type="button"
              onClick={() => setMostrar((m) => !m)}
              style={styles.mostrar}
              aria-label={mostrar ? "Ocultar palavra-passe" : "Mostrar palavra-passe"}
            >
              {mostrar ? "Ocultar" : "Mostrar"}
            </button>
          </div>

          {erro !== "" && (
            <p style={styles.erro} role="alert">
              {erro}
            </p>
          )}

          <button type="submit" style={styles.botao} disabled={aCarregar}>
            {aCarregar ? "A entrar..." : "Entrar"}
          </button>
        </form>
      </div>
    </Pagina>
  );
}

const styles = {
  centro: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    padding: "32px 20px",
  },
  logo: { width: 150, height: "auto" },
  cartao: {
    width: "100%",
    maxWidth: 400,
    background: "#FFFFFF",
    borderRadius: 24,
    padding: "34px 30px",
    boxShadow: "0 20px 50px rgba(58, 69, 96, 0.22)",
    display: "flex",
    flexDirection: "column",
  },
  titulo: {
    margin: 0,
    fontSize: 22,
    fontWeight: 700,
    color: CORES.textoEscuro,
    textAlign: "center",
  },
  subtitulo: {
    margin: "6px 0 24px",
    fontSize: 13.5,
    color: "#6B7280",
    textAlign: "center",
  },
  rotulo: {
    fontSize: 13,
    fontWeight: 600,
    color: CORES.textoEscuro,
    marginBottom: 6,
  },
  input: {
    width: "100%",
    padding: "13px 14px",
    border: "1.5px solid #D0D5DD",
    borderRadius: 12,
    fontSize: 15,
    color: CORES.textoEscuro,
    background: "#FFFFFF",
    marginBottom: 16,
    outline: "none",
  },
  campoSenha: { position: "relative", marginBottom: 16 },
  mostrar: {
    position: "absolute",
    right: 8,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: CORES.azulBotao,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    padding: "6px 8px",
  },
  erro: {
    margin: "0 0 14px",
    fontSize: 13,
    color: "#D64545",
    textAlign: "center",
  },
  botao: {
    padding: 15,
    border: "none",
    borderRadius: 28,
    background: CORES.azulBotao,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
  },
};
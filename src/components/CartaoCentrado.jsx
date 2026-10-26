import { useNavigate } from "react-router-dom";
import Pagina from "./Pagina";
import Manchas from "./Manchas";
import useLargura from "../hooks/useLargura";
import logo from "../assets/arsm-logo-branco.png";
import laco from "../assets/laco.webp";

export default function CartaoCentrado({ children, largura = 520 }) {
  const navigate = useNavigate();
  const largo = useLargura() >= 900;

  return (
    <Pagina>
      <Manchas />

      <div
        style={{
          ...styles.conteudo,
          padding: largo ? "28px 56px 40px" : "16px 20px 32px",
        }}
      >
        <header style={styles.topo}>
          <button
            onClick={() => navigate("/")}
            style={styles.botaoLogo}
            aria-label="Voltar ao início"
          >
            <img src={logo} alt="ARSM" style={{ width: largo ? 150 : 120, height: "auto" }} />
          </button>
          <img
            src={laco}
            alt="Laço turquesa e roxo, símbolo de prevenção do suicídio"
            style={{ width: largo ? 44 : 36, height: "auto" }}
          />
        </header>

        <main style={styles.centro}>
          <div
            style={{
              ...styles.cartao,
              maxWidth: largura,
              padding: largo ? "40px 44px" : "28px 22px",
            }}
          >
            {children}
          </div>
        </main>
      </div>
    </Pagina>
  );
}

const styles = {
  conteudo: {
    position: "relative",
    zIndex: 1,
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  topo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  botaoLogo: {
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    lineHeight: 0,
  },
  centro: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 0",
  },
  cartao: {
    width: "100%",
    background: "#FFFFFF",
    borderRadius: 28,
    boxShadow: "0 20px 50px rgba(58, 69, 96, 0.22)",
  },
};
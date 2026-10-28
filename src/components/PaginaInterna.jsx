import CabecalhoSite from "./CabecalhoSite";
import useLargura from "../hooks/useLargura";

export default function PaginaInterna({ children, largura = 1000 }) {
  const largo = useLargura() >= 900;

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "#FAFAF8",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CabecalhoSite />

      <main
        style={{
          width: "100%",
          maxWidth: largura,
          margin: "0 auto",
          flex: 1,
          padding: largo ? "40px 32px 56px" : "24px 18px 40px",
        }}
      >
        {children}
      </main>

      <footer style={styles.rodape}>
         O rastreio
        não substitui a avaliação de um profissional de saúde.
      </footer>
    </div>
  );
}

const styles = {
  rodape: {
    textAlign: "center",
    fontSize: 12,
    color: "#9CA3AF",
    lineHeight: 1.5,
    padding: "20px 24px 28px",
  },
};
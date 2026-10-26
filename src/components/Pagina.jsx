import { FUNDO_CSS } from "../tema";

export default function Pagina({ children, fundo = FUNDO_CSS, style }) {
  return (
    <div
      style={{
        minHeight: "100dvh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        background: fundo,
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
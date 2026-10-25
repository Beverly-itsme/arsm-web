import { TEXTO_GRADIENTE_CSS } from "../tema";

export default function TituloGradiente({ children, as: Etiqueta = "h1", style }) {
  return (
    <Etiqueta
      style={{
        background: TEXTO_GRADIENTE_CSS,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
        display: "inline-block",
        margin: 0,
        ...style,
      }}
    >
      {children}
    </Etiqueta>
  );
}
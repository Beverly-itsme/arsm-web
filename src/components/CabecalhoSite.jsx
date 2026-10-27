import { NavLink } from "react-router-dom";
import useLargura from "../hooks/useLargura";
import { FUNDO_CSS } from "../tema";
import logo from "../assets/arsm-logo-branco.png";
import laco from "../assets/laco.webp";

const LINKS = [
  { para: "/inicio", texto: "Início" },
  { para: "/historico", texto: "Histórico" },
  { para: "/educacao", texto: "Saúde Mental" },
  { para: "/apoio", texto: "Apoio" },
];

export default function CabecalhoSite() {
  const largo = useLargura() >= 900;

  const navegacao = (
    <nav aria-label="Principal" style={styles.nav}>
      {LINKS.map((l) => (
        <NavLink
          key={l.para}
          to={l.para}
          style={({ isActive }) => ({ ...styles.link, ...(isActive ? styles.linkAtivo : {}) })}
        >
          {l.texto}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <header style={{ background: FUNDO_CSS, padding: largo ? "14px 40px" : "12px 16px" }}>
      <div style={styles.interior}>
        <NavLink to="/" aria-label="Página inicial" style={{ lineHeight: 0 }}>
          <img src={logo} alt="ARSM" style={{ width: largo ? 140 : 112, height: "auto" }} />
        </NavLink>

        {largo && navegacao}

        <img
          src={laco}
          alt="Laço turquesa e roxo, símbolo de prevenção do suicídio"
          style={{ width: largo ? 34 : 28, height: "auto" }}
        />

        {!largo && <div style={{ width: "100%" }}>{navegacao}</div>}
      </div>
    </header>
  );
}

const styles = {
  interior: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 10,
  },
  nav: { display: "flex", gap: 6, overflowX: "auto" },
  link: {
    color: "#FFFFFF",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 600,
    padding: "8px 16px",
    borderRadius: 20,
    whiteSpace: "nowrap",
    opacity: 0.9,
  },
  linkAtivo: { background: "rgba(255,255,255,0.24)", opacity: 1 },
};
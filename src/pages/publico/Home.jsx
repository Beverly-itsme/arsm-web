import { useNavigate } from "react-router-dom";
import PaginaInterna from "../../components/PaginaInterna";
import TituloGradiente from "../../components/TituloGradiente";
import Icone from "../../components/Icone";
import useLargura from "../../hooks/useLargura";
import { CORES, FUNDO_CSS } from "../../tema";

const INFO = [
  { icone: "relogio", texto: "3-5 minutos" },
  { icone: "lista", texto: "16 perguntas" },
  { icone: "escudo", texto: "Anónimo" },
];

const ATALHOS = [
  {
    titulo: "Aprender",
    texto: "Artigos sobre depressão, ansiedade e sono",
    icone: "lampada",
    cor: CORES.azul,
    para: "/educacao",
  },
  {
    titulo: "Histórico",
    texto: "Revê as tuas avaliações anteriores",
    icone: "relogio",
    cor: CORES.lilas,
    para: "/historico",
  },
  {
    titulo: "Apoio",
    texto: "Com quem falar e onde pedir ajuda",
    icone: "ajuda",
    cor: CORES.coral,
    para: "/apoio",
  },
];

function saudacao() {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 19) return "Boa tarde";
  return "Boa noite";
}

function Atalho({ titulo, texto, icone, cor, para }) {
  const navigate = useNavigate();
  return (
    <button className="cartao-ligacao" onClick={() => navigate(para)} style={styles.atalho}>
      <span style={{ ...styles.circulo, background: cor + "35" }}>
        <Icone nome={icone} tamanho={22} cor={CORES.textoEscuro} />
      </span>
      <span style={styles.blocoTexto}>
        <span style={styles.tituloAtalho}>{titulo}</span>
        <span style={styles.textoAtalho}>{texto}</span>
      </span>
      <Icone nome="chevron" tamanho={20} cor="#9CA3AF" />
    </button>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const largo = useLargura() >= 900;

  return (
    <PaginaInterna>
      <div style={styles.cabecalho}>
        <TituloGradiente as="h1" style={{ fontSize: largo ? 42 : 32, fontWeight: 700 }}>
          {saudacao()}
        </TituloGradiente>
        <p style={styles.subtitulo}>Como te sentes hoje?</p>
      </div>

      <div style={{ ...styles.grelha, gridTemplateColumns: largo ? "1.5fr 1fr" : "1fr" }}>
        <section style={{ ...styles.rastreio, padding: largo ? "40px 40px" : "28px 24px" }}>
          <p style={styles.etiqueta}>RASTREIO</p>
          <h2 style={styles.tituloRastreio}>Rastreio de saúde mental</h2>
          <p style={styles.textoRastreio}>
            Um momento tranquilo para perceberes como tens estado em relação
            à depressão e à ansiedade, de forma simples e privada.
          </p>

          <div style={styles.chips}>
            {INFO.map((item) => (
              <span key={item.texto} style={styles.chip}>
                <Icone nome={item.icone} tamanho={15} cor="#FFFFFF" />
                {item.texto}
              </span>
            ))}
          </div>

          <button style={styles.botao} onClick={() => navigate("/phq9")}>
            INICIAR AVALIAÇÃO
            <Icone nome="seta" tamanho={18} cor="#5B4B9A" />
          </button>
        </section>

        <div style={styles.coluna}>
          {ATALHOS.map((a) => (
            <Atalho key={a.titulo} {...a} />
          ))}
        </div>
      </div>
    </PaginaInterna>
  );
}

const styles = {
  cabecalho: { margin: "0 0 26px" },
  subtitulo: { margin: "6px 0 0", fontSize: 16, color: "#6B7280" },
  grelha: { display: "grid", gap: 20 },
  rastreio: {
    background: FUNDO_CSS,
    borderRadius: 28,
    color: "#FFFFFF",
  },
  etiqueta: {
    margin: 0,
    fontSize: 12,
    letterSpacing: "0.2em",
    fontWeight: 700,
    opacity: 0.85,
  },
  tituloRastreio: {
    margin: "8px 0 0",
    fontSize: "clamp(24px, 3vw, 32px)",
    fontWeight: 700,
  },
  textoRastreio: {
    margin: "12px 0 0",
    fontSize: 16,
    lineHeight: 1.6,
    maxWidth: 520,
  },
  chips: { display: "flex", flexWrap: "wrap", gap: 10, marginTop: 22 },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "rgba(255,255,255,0.22)",
    padding: "7px 14px",
    borderRadius: 16,
    fontSize: 13,
    fontWeight: 600,
  },
  botao: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    marginTop: 28,
    padding: "15px 30px",
    border: "none",
    borderRadius: 30,
    background: "#FFFFFF",
    color: "#5B4B9A",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.1em",
    cursor: "pointer",
  },
  coluna: { display: "flex", flexDirection: "column", gap: 14 },
  atalho: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    width: "100%",
    padding: "18px 20px",
    background: "#FFFFFF",
    border: "1px solid #EEEEEE",
    borderRadius: 20,
    cursor: "pointer",
    font: "inherit",
  },
  circulo: {
    width: 46,
    height: 46,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  blocoTexto: { flex: 1, textAlign: "left" },
  tituloAtalho: { display: "block", fontSize: 16, fontWeight: 700, color: CORES.textoEscuro },
  textoAtalho: { display: "block", fontSize: 13, color: "#6B7280", marginTop: 2, lineHeight: 1.4 },
};
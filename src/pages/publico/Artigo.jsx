import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PaginaInterna from "../../components/PaginaInterna";
import Icone from "../../components/Icone";
import useLargura from "../../hooks/useLargura";
import { CORES } from "../../tema";
import { ARTIGOS } from "../../constants/artigos";

function Paragrafos({ texto }) {
  return texto.split("\n\n").map((bloco, i) => (
    <p key={i} style={styles.paragrafo}>
      {bloco.split("\n").map((linha, j) => {
        const m = linha.match(/^(Mito:|Facto:)\s*(.*)$/);
        return (
          <span key={j} style={{ display: "block", marginTop: j > 0 ? 4 : 0 }}>
            {m ? (
              <>
                <strong>{m[1]}</strong> {m[2]}
              </>
            ) : (
              linha
            )}
          </span>
        );
      })}
    </p>
  ));
}

export default function Artigo() {
  const { id } = useParams();
  const largo = useLargura() >= 900;
  const indice = ARTIGOS.findIndex((a) => a.id === id);
  const artigo = ARTIGOS[indice];

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  if (!artigo) {
    return (
      <PaginaInterna largura={720}>
        <h1 style={{ fontSize: 28, color: CORES.textoEscuro }}>Artigo não encontrado</h1>
        <p style={{ color: "#6B7280", margin: "12px 0 20px" }}>
          Esse artigo não existe ou foi movido.
        </p>
        <Link to="/educacao" style={styles.voltar}>
          <Icone nome="voltar" tamanho={18} cor="#4A6FA5" />
          Ver todos os artigos
        </Link>
      </PaginaInterna>
    );
  }

  const seguinte = ARTIGOS[(indice + 1) % ARTIGOS.length];

  return (
    <PaginaInterna largura={880}>
      <Link to="/educacao" style={styles.voltar}>
        <Icone nome="voltar" tamanho={18} cor="#4A6FA5" />
        Todos os artigos
      </Link>

      <header
        style={{
          ...styles.cabecalho,
          background: artigo.cor + "22",
          flexDirection: largo ? "row" : "column",
          textAlign: largo ? "left" : "center",
          padding: largo ? "32px 40px" : "24px 20px",
        }}
      >
        <img
          src={artigo.imagem}
          alt=""
          style={{ ...styles.imagem, width: largo ? 240 : 200, height: largo ? 240 : 200 }}
        />
        <div>
          <h1 style={styles.titulo}>{artigo.titulo}</h1>
          <p style={styles.resumo}>{artigo.resumo}</p>
        </div>
      </header>

      <article style={styles.corpo}>
        <Paragrafos texto={artigo.conteudo} />

        <aside style={{ ...styles.facto, borderColor: artigo.cor }}>
          <div style={styles.linhaFacto}>
            <Icone nome="lampada" tamanho={20} cor={CORES.textoEscuro} />
            <strong style={styles.tituloFacto}>Facto interessante</strong>
          </div>
          <p style={styles.textoFacto}>{artigo.facto}</p>
          <p style={styles.fonte}>{artigo.fonte}</p>
        </aside>

        <Link to={`/educacao/${seguinte.id}`} className="cartao-ligacao" style={styles.seguinte}>
          <span>
            <span style={styles.etiquetaSeguinte}>Ler a seguir</span>
            <span style={styles.tituloSeguinte}>{seguinte.titulo}</span>
          </span>
          <Icone nome="seta" tamanho={20} cor="#4A6FA5" />
        </Link>
      </article>
    </PaginaInterna>
  );
}

const styles = {
  voltar: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
    color: "#4A6FA5",
    fontSize: 15,
    fontWeight: 600,
    textDecoration: "none",
  },
  cabecalho: {
    display: "flex",
    alignItems: "center",
    gap: 32,
    borderRadius: 28,
  },
  imagem: { objectFit: "contain", flexShrink: 0 },
  titulo: {
    margin: 0,
    fontSize: "clamp(26px, 3.4vw, 38px)",
    lineHeight: 1.2,
    fontWeight: 700,
    color: CORES.textoEscuro,
  },
  resumo: { margin: "10px 0 0", fontSize: 16, color: "#5B6478", lineHeight: 1.5 },
  corpo: { maxWidth: 720, margin: "32px auto 0" },
  paragrafo: {
    margin: "0 0 18px",
    fontSize: 17,
    lineHeight: 1.75,
    color: CORES.textoEscuro,
  },
  facto: {
    marginTop: 30,
    padding: "20px 22px",
    border: "2px solid",
    borderRadius: 18,
    background: "#FFFFFF",
  },
  linhaFacto: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 },
  tituloFacto: { fontSize: 15, color: CORES.textoEscuro },
  textoFacto: { margin: 0, fontSize: 16, lineHeight: 1.65, color: CORES.textoEscuro },
  fonte: { margin: "10px 0 0", fontSize: 12.5, fontStyle: "italic", color: "#9CA3AF" },
  seguinte: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    marginTop: 30,
    padding: "18px 22px",
    background: "#FFFFFF",
    border: "1px solid #EEEEEE",
    borderRadius: 18,
    textDecoration: "none",
  },
  etiquetaSeguinte: {
    display: "block",
    fontSize: 12,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#9CA3AF",
    fontWeight: 700,
  },
  tituloSeguinte: {
    display: "block",
    marginTop: 4,
    fontSize: 17,
    fontWeight: 700,
    color: CORES.textoEscuro,
  },
};
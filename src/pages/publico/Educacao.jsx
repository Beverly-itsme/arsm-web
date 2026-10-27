import { Link } from "react-router-dom";
import PaginaInterna from "../../components/PaginaInterna";
import TituloGradiente from "../../components/TituloGradiente";
import useLargura from "../../hooks/useLargura";
import { CORES } from "../../tema";
import { ARTIGOS } from "../../constants/artigos";

export default function Educacao() {
  const largura = useLargura();
  const colunas = largura >= 1000 ? 3 : largura >= 640 ? 2 : 1;

  return (
    <PaginaInterna>
      <TituloGradiente as="h1" style={{ fontSize: largura >= 900 ? 40 : 30, fontWeight: 700 }}>
        Saúde Mental
      </TituloGradiente>
      <p style={styles.subtitulo}>Informação simples para te ajudar a entender melhor.</p>

      <div style={{ ...styles.grelha, gridTemplateColumns: `repeat(${colunas}, 1fr)` }}>
        {ARTIGOS.map((a) => (
          <Link
            key={a.id}
            to={`/educacao/${a.id}`}
            className="cartao-ligacao"
            style={{ ...styles.cartao, background: a.cor + "25" }}
          >
            <div style={styles.zonaImagem}>
              <img src={a.imagem} alt="" style={styles.imagem} />
            </div>
            <div style={styles.rodape}>
              <p style={styles.tituloCartao}>{a.titulo}</p>
              <p style={styles.resumo}>{a.resumo}</p>
            </div>
          </Link>
        ))}
      </div>
    </PaginaInterna>
  );
}

const styles = {
  subtitulo: { margin: "8px 0 28px", fontSize: 16, color: "#6B7280" },
  grelha: { display: "grid", gap: 20 },
  cartao: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 22,
    overflow: "hidden",
    textDecoration: "none",
    border: "1px solid #EEEEEE",
  },
  zonaImagem: { padding: "22px 20px 8px" },
  imagem: { display: "block", width: "100%", height: 190, objectFit: "contain" },
  rodape: { background: "#FFFFFF", padding: "16px 18px 18px", flex: 1 },
  tituloCartao: { margin: 0, fontSize: 16, fontWeight: 700, color: CORES.textoEscuro },
  resumo: { margin: "5px 0 0", fontSize: 13.5, color: "#6B7280", lineHeight: 1.45 },
};
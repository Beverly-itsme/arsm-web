import PaginaInterna from "../../components/PaginaInterna";
import TituloGradiente from "../../components/TituloGradiente";
import Icone from "../../components/Icone";
import useLargura from "../../hooks/useLargura";
import { CORES, FUNDO_CSS } from "../../tema";
import { CONTACTOS } from "../../constants/contactos";

const COM_QUEM_FALAR = [
  "Uma pessoa de confiança: família, amigo, colega, professor ou líder religioso.",
  "A unidade de saúde mais próxima: pergunta por apoio em saúde mental.",
  "Um profissional de saúde ou de psicologia, se tiveres acesso.",
];

const COMO_COMECAR = [
  "Tenho-me sentido mal ultimamente e gostava de falar contigo.",
  "Preciso de ajuda e não sei bem por onde começar.",
  "Podes ouvir-me? Não precisas de resolver nada, só ouvir.",
];

export default function Apoio() {
  const largo = useLargura() >= 900;

  return (
    <PaginaInterna>
      <TituloGradiente as="h1" style={{ fontSize: largo ? 40 : 30, fontWeight: 700 }}>
        Se precisas de ajuda
      </TituloGradiente>

      <div style={styles.destaque}>
        <Icone nome="coracao" tamanho={28} cor="#FFFFFF" />
        <p style={styles.textoDestaque}>
          Não há vergonha em pedir ajuda. Toda a gente precisa de apoio em
          algum momento, e pedir ajuda é um sinal de cuidado contigo.
        </p>
      </div>

      <div style={{ ...styles.grelha, gridTemplateColumns: largo ? "1fr 1fr" : "1fr" }}>
        <section>
          <h2 style={styles.secao}>Se estás em perigo agora</h2>
          <div style={styles.urgente}>
            <p style={styles.textoUrgente}>
              Se estás a pensar em fazer mal a ti mesmo(a), não fiques
              sozinho(a). Fala já com alguém que esteja perto de ti, ou
              dirige-te à unidade de saúde ou ao hospital mais próximo e diz
              que precisas de ajuda.
            </p>
          </div>

          {CONTACTOS.length > 0 && (
            <>
              <h2 style={styles.secao}>Contactos</h2>
              {CONTACTOS.map((c) => (
                <div key={c.nome} style={styles.cartao}>
                  <p style={styles.nomeContacto}>{c.nome}</p>
                  <p style={styles.descricaoContacto}>{c.descricao}</p>
                  {c.telefone && (
                    <a href={`tel:${c.telefone}`} style={styles.botaoLigar}>
                      <Icone nome="telefone" tamanho={18} cor="#FFFFFF" />
                      Ligar {c.telefone}
                    </a>
                  )}
                </div>
              ))}
            </>
          )}
        </section>

        <section>
          <h2 style={styles.secao}>Com quem falar</h2>
          <div style={styles.cartao}>
            <ul style={styles.lista}>
              {COM_QUEM_FALAR.map((texto) => (
                <li key={texto} style={styles.itemLista}>
                  <span style={styles.bolinha} />
                  <span>{texto}</span>
                </li>
              ))}
            </ul>
          </div>

          <h2 style={styles.secao}>Como começar a conversa</h2>
          {COMO_COMECAR.map((frase) => (
            <div key={frase} style={styles.frase}>
              “{frase}”
            </div>
          ))}
        </section>
      </div>
    </PaginaInterna>
  );
}

const styles = {
  destaque: {
    display: "flex",
    alignItems: "flex-start",
    gap: 14,
    background: FUNDO_CSS,
    borderRadius: 22,
    padding: "22px 26px",
    margin: "22px 0 8px",
  },
  textoDestaque: { margin: 0, color: "#FFFFFF", fontSize: 16, lineHeight: 1.55 },
  grelha: { display: "grid", gap: "0 36px" },
  secao: {
    margin: "26px 0 12px",
    fontSize: 18,
    fontWeight: 700,
    color: CORES.textoEscuro,
  },
  urgente: {
    background: "#FDECEC",
    border: "1px solid #F2C4C4",
    borderRadius: 16,
    padding: 18,
  },
  textoUrgente: { margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "#3A3A3A" },
  cartao: {
    background: "#FFFFFF",
    border: "1px solid #EEEEEE",
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
  },
  nomeContacto: { margin: 0, fontSize: 15, fontWeight: 700, color: CORES.textoEscuro },
  descricaoContacto: { margin: "4px 0 0", fontSize: 13.5, color: "#6B7280", lineHeight: 1.5 },
  botaoLigar: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
    padding: "11px 20px",
    borderRadius: 24,
    background: CORES.azulBotao,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: 700,
    textDecoration: "none",
  },
  lista: { listStyle: "none", margin: 0, padding: 0 },
  itemLista: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    margin: "6px 0",
    fontSize: 14.5,
    lineHeight: 1.55,
    color: CORES.textoEscuro,
  },
  bolinha: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: CORES.azul,
    marginTop: 8,
    flexShrink: 0,
  },
  frase: {
    background: CORES.lilas + "25",
    borderRadius: 14,
    padding: "14px 16px",
    marginBottom: 10,
    fontSize: 14.5,
    lineHeight: 1.5,
    fontStyle: "italic",
    color: CORES.textoEscuro,
  },
};
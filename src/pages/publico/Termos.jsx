import { useNavigate } from "react-router-dom";
import CartaoCentrado from "../../components/CartaoCentrado";
import TituloGradiente from "../../components/TituloGradiente";
import Icone from "../../components/Icone";
import { CORES } from "../../tema";

const PONTOS = [
  { icone: "cadeado", texto: "As tuas respostas ao rastreio são anónimas", cor: CORES.azul },
  { icone: "utilizador", texto: "Não pedimos o teu nome, contacto nem registo", cor: CORES.lilas },
  { icone: "conversa", texto: "Não substituímos um profissional de saúde", cor: CORES.verde },
  { icone: "verificado", texto: "Podes parar quando quiseres", cor: CORES.coral },
];

export default function Termos() {
  const navigate = useNavigate();

  return (
    <CartaoCentrado>
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <TituloGradiente as="h1" style={{ fontSize: 28, fontWeight: 700 }}>
          Antes de começares
        </TituloGradiente>
      </div>

      <ul style={styles.lista}>
        {PONTOS.map((ponto) => (
          <li key={ponto.texto} style={styles.linha}>
            <span style={{ ...styles.circulo, background: ponto.cor + "26" }}>
              <Icone nome={ponto.icone} tamanho={22} cor={ponto.cor} />
            </span>
            <span style={styles.texto}>{ponto.texto}</span>
          </li>
        ))}
      </ul>

      <button style={styles.botao} onClick={() => navigate("/idade")}>
        Concordo e quero continuar
      </button>

      <button style={styles.voltar} onClick={() => navigate("/")}>
        Voltar
      </button>
    </CartaoCentrado>
  );
}

const styles = {
  lista: { listStyle: "none", margin: 0, padding: 0 },
  linha: { display: "flex", alignItems: "center", gap: 14, marginBottom: 20 },
  circulo: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  texto: { fontSize: 16, lineHeight: 1.4, color: CORES.textoEscuro },
  botao: {
    width: "100%",
    marginTop: 12,
    padding: "16px",
    border: "none",
    borderRadius: 30,
    background: CORES.azulBotao,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
  },
  voltar: {
    display: "block",
    margin: "14px auto 0",
    background: "none",
    border: "none",
    color: "#6B7280",
    fontSize: 14,
    cursor: "pointer",
    textDecoration: "underline",
  },
};
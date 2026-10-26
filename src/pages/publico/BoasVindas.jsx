import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagina from "../../components/Pagina";
import Manchas from "../../components/Manchas";
import useLargura from "../../hooks/useLargura";
import { FRASES } from "../../constants/frases";
import { CORES } from "../../tema";
import logo from "../../assets/arsm-logo-branco.png";
import laco from "../../assets/laco.webp";

const CHAVE_ULTIMA_FRASE = "arsm_ultima_frase";
const GARANTIAS = ["Anónimo", "3-5 minutos", "Sem registo"];

function escolherFrase() {
  let ultimo = -1;
  try {
    const guardado = localStorage.getItem(CHAVE_ULTIMA_FRASE);
    if (guardado !== null) ultimo = parseInt(guardado, 10);
  } catch {
    /* sem acesso ao armazenamento */
  }

  let novo = Math.floor(Math.random() * FRASES.length);
  if (FRASES.length > 1 && novo === ultimo) {
    novo = (novo + 1) % FRASES.length;
  }

  try {
    localStorage.setItem(CHAVE_ULTIMA_FRASE, String(novo));
  } catch {
    /* sem acesso ao armazenamento */
  }
  return novo;
}

function BotaoComecar({ aoClicar, centrado }) {
  return (
    <button
      onClick={aoClicar}
      style={{ ...styles.botao, ...(centrado ? styles.botaoCentrado : {}) }}
    >
      <span style={styles.textoBotao}>COMEÇAR</span>
      <span style={styles.setaCirculo}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </button>
  );
}

function Verificacao() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12.5l3 3 5-6" />
    </svg>
  );
}

export default function BoasVindas() {
  const navigate = useNavigate();
  const largo = useLargura() >= 900;
  const [indice, setIndice] = useState(null);

  useEffect(() => {
    setIndice(escolherFrase());
  }, []);

  const frase = FRASES[indice ?? 0];
  const irParaTermos = () => navigate("/termos");

  return (
    <Pagina>
      <Manchas />

      <div
        style={{
          ...styles.conteudo,
          padding: largo ? "32px 56px 36px" : "20px 24px 32px",
        }}
      >
        <header style={styles.topo}>
          <img
            src={logo}
            alt="ARSM"
            style={{ width: largo ? 170 : 130, height: "auto", marginLeft: -4 }}
          />
          <img
            src={laco}
            alt="Laço turquesa e roxo, símbolo de prevenção do suicídio"
            style={{ width: largo ? 50 : 40, height: "auto" }}
          />
        </header>

        <main style={{ ...styles.meio, opacity: indice === null ? 0 : 1 }}>
          <div style={{ maxWidth: largo ? 620 : "none" }}>
            <h1
              style={{
                ...styles.titulo,
                fontSize: largo ? "clamp(48px, 5.4vw, 84px)" : "clamp(32px, 8.5vw, 46px)",
              }}
            >
              {frase.linhas.map((linha, i) => (
                <span key={i} style={{ display: "block" }}>
                  {linha}
                </span>
              ))}
            </h1>

            <p
              style={{
                ...styles.descricao,
                fontSize: largo ? 19 : 15,
                maxWidth: largo ? 440 : 230,
              }}
            >
              {frase.descricao}
            </p>

            {largo && (
              <>
                <div style={{ marginTop: 36 }}>
                  <BotaoComecar aoClicar={irParaTermos} />
                </div>
                <ul style={styles.garantias}>
                  {GARANTIAS.map((g) => (
                    <li key={g} style={styles.garantia}>
                      <Verificacao />
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </main>

        {!largo && <BotaoComecar centrado aoClicar={irParaTermos} />}

        {largo && (
          <footer style={styles.rodape}>
            Projeto académico da Universidade Católica de Moçambique. O
            rastreio não substitui a avaliação de um profissional de saúde.
          </footer>
        )}
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
  meio: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    transition: "opacity 0.3s",
  },
  titulo: {
    margin: 0,
    color: "#FFFFFF",
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontWeight: 400,
    lineHeight: 1.25,
    letterSpacing: "0.06em",
  },
  descricao: {
    margin: "20px 0 0",
    color: "#FFFFFF",
    lineHeight: 1.5,
  },
  botao: {
    width: 260,
    height: 52,
    border: "none",
    borderRadius: 26,
    background: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 7px 0 28px",
    cursor: "pointer",
  },
  botaoCentrado: {
    alignSelf: "center",
    width: "68%",
    maxWidth: 300,
  },
  textoBotao: {
    color: "#5B4B9A",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.1em",
  },
  setaCirculo: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: CORES.coral,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  garantias: {
    listStyle: "none",
    margin: "34px 0 0",
    padding: 0,
    display: "flex",
    flexWrap: "wrap",
    gap: "14px 28px",
  },
  garantia: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "#FFFFFF",
    fontSize: 14,
  },
  rodape: {
    maxWidth: 480,
    color: "#FFFFFF",
    fontSize: 12.5,
    lineHeight: 1.5,
    opacity: 0.85,
    marginTop: 24,
  },
};
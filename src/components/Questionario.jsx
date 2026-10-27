import { useEffect } from "react";
import Pagina from "./Pagina";
import useLargura from "../hooks/useLargura";
import { CORES } from "../tema";

const OPCOES = [
  { valor: 0, texto: "Nunca" },
  { valor: 1, texto: "Vários dias" },
  { valor: 2, texto: "Mais de metade dos dias" },
  { valor: 3, texto: "Quase todos os dias" },
];

function misturar(hex, alfa) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const m = (c) => Math.round(255 + (c - 255) * alfa);
  return `rgb(${m(r)}, ${m(g)}, ${m(b)})`;
}

export default function Questionario({
  titulo,
  perguntas,
  imagens,
  fundos,
  indice,
  respostas,
  onSelecionar,
  onAvancar,
  onVoltar,
  onSair,
  textoFinal,
  aEnviar = false,
  erro = "",
}) {
  const largo = useLargura() >= 900;
  const total = perguntas.length;
  const cor = fundos[indice % fundos.length];
  const respostaAtual = respostas[indice];
  const ultima = indice === total - 1;
  const bloqueado = respostaAtual === -1 || aEnviar;
  const percentagem = ((indice + 1) / total) * 100;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [indice]);

  return (
    <Pagina fundo={misturar(cor, 0.1)} style={{ transition: "background 0.4s" }}>
      <div
        style={{
          ...styles.conteudo,
          padding: largo ? "28px 56px 40px" : "16px 16px 28px",
        }}
      >
        <div style={styles.topo}>
          <span style={styles.etiqueta}>{titulo}</span>
          <div
            style={styles.barra}
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={total}
            aria-valuenow={indice + 1}
          >
            <div
              style={{
                ...styles.barraPreenchida,
                width: `${percentagem}%`,
                background: cor,
              }}
            />
          </div>
          {!aEnviar && (
            <button style={styles.sair} onClick={onSair} aria-label="Sair da avaliação">
              ✕ Sair
            </button>
          )}
        </div>

        <main style={styles.centro}>
          <div
            style={{
              ...styles.cartao,
              maxWidth: largo ? 980 : 520,
              flexDirection: largo ? "row" : "column",
            }}
          >
            <div
              style={{
                ...styles.painelImagem,
                background: cor + "22",
                width: largo ? 340 : "auto",
                padding: largo ? 32 : "20px 20px 8px",
              }}
            >
              <img
                src={imagens[indice]}
                alt=""
                style={{
                  width: "100%",
                  maxWidth: 280,
                  height: largo ? 260 : 140,
                  objectFit: "contain",
                }}
              />
            </div>

            <div style={{ ...styles.painelPergunta, padding: largo ? "40px 44px" : "20px 22px 28px" }}>
              <p style={styles.progresso}>
                Pergunta {indice + 1} de {total}
              </p>
              <p style={styles.subtitulo}>
                Nas últimas 2 semanas, com que frequência foi incomodado(a) por:
              </p>
              <h2 style={styles.pergunta}>{perguntas[indice]}</h2>

              <div role="radiogroup" aria-label="Frequência">
                {OPCOES.map((opcao) => {
                  const ativa = respostaAtual === opcao.valor;
                  return (
                    <button
                      key={opcao.valor}
                      role="radio"
                      aria-checked={ativa}
                      onClick={() => onSelecionar(opcao.valor)}
                      style={{
                        ...styles.opcao,
                        ...(ativa
                          ? { borderColor: cor, background: cor + "26", fontWeight: 700 }
                          : {}),
                      }}
                    >
                      {opcao.texto}
                    </button>
                  );
                })}
              </div>

              {erro !== "" && (
                <p style={styles.erro} role="alert">
                  {erro}
                </p>
              )}

              <div style={styles.navegacao}>
                {indice > 0 && !aEnviar && (
                  <button style={styles.botaoVoltar} onClick={onVoltar}>
                    Voltar
                  </button>
                )}
                <button
                  style={{ ...styles.botao, ...(bloqueado ? styles.botaoDesativado : {}) }}
                  onClick={onAvancar}
                  disabled={bloqueado}
                >
                  {aEnviar ? "A processar..." : ultima ? textoFinal : "Seguinte"}
                </button>
              </div>
            </div>
          </div>
        </main>
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
    alignItems: "center",
    gap: 16,
    width: "100%",
    maxWidth: 980,
    margin: "0 auto",
  },
  etiqueta: {
    fontSize: 13,
    fontWeight: 700,
    color: CORES.textoEscuro,
    letterSpacing: "0.04em",
    whiteSpace: "nowrap",
  },
  barra: {
    flex: 1,
    height: 8,
    background: "#FFFFFF",
    borderRadius: 4,
    overflow: "hidden",
  },
  barraPreenchida: {
    height: "100%",
    borderRadius: 4,
    transition: "width 0.3s, background 0.3s",
  },
  sair: {
    background: "none",
    border: "none",
    color: "#6B7280",
    fontSize: 14,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  centro: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 0",
  },
  cartao: {
    width: "100%",
    display: "flex",
    background: "#FFFFFF",
    borderRadius: 28,
    boxShadow: "0 20px 50px rgba(58, 69, 96, 0.14)",
    overflow: "hidden",
  },
  painelImagem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  painelPergunta: { flex: 1 },
  progresso: { margin: 0, fontSize: 13, color: "#9CA3AF" },
  subtitulo: { margin: "6px 0 0", fontSize: 14, color: "#6B7280" },
  pergunta: {
    margin: "10px 0 24px",
    fontSize: "clamp(20px, 2.2vw, 26px)",
    lineHeight: 1.3,
    fontWeight: 700,
    color: CORES.textoEscuro,
  },
  opcao: {
    display: "block",
    width: "100%",
    marginBottom: 10,
    padding: "14px 16px",
    border: "2px solid #E5E7EB",
    borderRadius: 14,
    background: "#FFFFFF",
    color: CORES.textoEscuro,
    fontSize: 15,
    textAlign: "left",
    cursor: "pointer",
  },
  erro: { margin: "6px 0 0", fontSize: 13, color: "#D64545" },
  navegacao: { display: "flex", alignItems: "center", gap: 12, marginTop: 22 },
  botaoVoltar: {
    background: "none",
    border: "none",
    color: "#6B7280",
    fontSize: 15,
    cursor: "pointer",
    padding: "14px 8px",
  },
  botao: {
    flex: 1,
    padding: "15px",
    border: "none",
    borderRadius: 30,
    background: CORES.azulBotao,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
  },
  botaoDesativado: { background: "#C4CCD6", cursor: "not-allowed" },
};
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { guardarRespostasPHQ9 } from "../../store/avaliacaoStore";

const PERGUNTAS = [
  "Pouco interesse ou prazer em fazer as coisas",
  "Sentir-se em baixo, deprimido(a) ou sem esperança",
  "Dificuldade em adormecer, manter o sono, ou dormir demais",
  "Sentir-se cansado(a) ou com pouca energia",
  "Falta de apetite ou comer em excesso",
  "Sentir-se mal consigo mesmo(a) — ou que é um fracasso, ou que desiludiu a sua família ou a si mesmo(a)",
  "Dificuldade em concentrar-se em coisas como ler o jornal ou ver televisão",
  "Lentidão a mexer-se ou a falar, a ponto de poder ter sido notado — ou o oposto, estar tão agitado(a) que se tem mexido muito mais do que o costume",
  "Pensamentos de que seria melhor estar morto(a), ou de fazer mal a si mesmo(a) de alguma forma",
];

const OPCOES = [
  { valor: 0, texto: "Nunca" },
  { valor: 1, texto: "Vários dias" },
  { valor: 2, texto: "Mais de metade dos dias" },
  { valor: 3, texto: "Quase todos os dias" },
];

export default function PHQ9() {
  const navigate = useNavigate();
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState(new Array(9).fill(-1));

  const respostaAtual = respostas[indice];
  const ultimaPergunta = indice === PERGUNTAS.length - 1;

  function selecionar(valor) {
    const novas = [...respostas];
    novas[indice] = valor;
    setRespostas(novas);
  }

  function avancar() {
    if (respostaAtual === -1) return;
    if (ultimaPergunta) {
      guardarRespostasPHQ9(respostas);
      navigate("/gad7");
    } else {
      setIndice(indice + 1);
    }
  }

  function voltar() {
    if (indice > 0) setIndice(indice - 1);
  }

  function sair() {
    if (window.confirm("Sair da avaliação? As tuas respostas até agora serão perdidas.")) {
      navigate("/");
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.topo}>
          <span onClick={sair} style={styles.botaoSair}>✕ Sair</span>
        </div>

        <p style={styles.progresso}>Pergunta {indice + 1} de {PERGUNTAS.length}</p>
        <p style={styles.subtitulo}>
          Nas últimas 2 semanas, com que frequência foi incomodado(a) por:
        </p>
        <h2 style={styles.pergunta}>{PERGUNTAS[indice]}</h2>

        {OPCOES.map((opcao) => (
          <div
            key={opcao.valor}
            onClick={() => selecionar(opcao.valor)}
            style={{
              ...styles.opcao,
              ...(respostaAtual === opcao.valor ? styles.opcaoSelecionada : {}),
            }}
          >
            {opcao.texto}
          </div>
        ))}

        <div style={styles.navegacao}>
          {indice > 0 && (
            <button style={styles.botaoVoltar} onClick={voltar}>Voltar</button>
          )}
          <button
            style={{
              ...styles.botao,
              ...(respostaAtual === -1 ? styles.botaoDesativado : {}),
            }}
            onClick={avancar}
            disabled={respostaAtual === -1}
          >
            {ultimaPergunta ? "Continuar" : "Seguinte"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F7FA",
    fontFamily: "system-ui, sans-serif",
    padding: "24px",
  },
  card: { maxWidth: "500px", width: "100%" },
  topo: { display: "flex", justifyContent: "flex-end", marginBottom: "8px" },
  botaoSair: { color: "#6B7280", fontSize: "14px", cursor: "pointer" },
  progresso: { fontSize: "14px", color: "#6B7280", textAlign: "center", marginBottom: "8px" },
  subtitulo: { fontSize: "15px", color: "#6B7280", textAlign: "center", marginBottom: "12px" },
  pergunta: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#1A1A2E",
    textAlign: "center",
    marginBottom: "28px",
  },
  opcao: {
    border: "2px solid #D0D5DD",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "12px",
    textAlign: "center",
    cursor: "pointer",
    color: "#3A3A3A",
  },
  opcaoSelecionada: {
    borderColor: "#4A6FA5",
    backgroundColor: "#E8EEF7",
    color: "#4A6FA5",
    fontWeight: "600",
  },
  navegacao: { display: "flex", justifyContent: "space-between", marginTop: "24px", gap: "12px" },
  botaoVoltar: {
    background: "none",
    border: "none",
    color: "#6B7280",
    fontSize: "16px",
    cursor: "pointer",
    padding: "16px 20px",
  },
  botao: {
    backgroundColor: "#4A6FA5",
    color: "#FFFFFF",
    border: "none",
    flex: 1,
    padding: "16px",
    borderRadius: "12px",
    fontSize: "17px",
    fontWeight: "600",
    cursor: "pointer",
  },
  botaoDesativado: { backgroundColor: "#B0B8C4", cursor: "not-allowed" },
};
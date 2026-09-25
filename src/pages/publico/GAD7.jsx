import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { obterRespostasPHQ9, guardarRespostasGAD7 } from "../../store/avaliacaoStore";

const API_URL = "http://localhost:5000";

const PERGUNTAS = [
  "Sentir-se nervoso(a), ansioso(a) ou muito tenso(a)",
  "Não conseguir parar ou controlar a preocupação",
  "Preocupar-se demasiado com coisas diferentes",
  "Dificuldade em relaxar",
  "Estar tão inquieto(a) que é difícil ficar parado(a)",
  "Ficar facilmente irritado(a) ou irritável",
  "Sentir medo, como se algo terrível fosse acontecer",
];

const OPCOES = [
  { valor: 0, texto: "Nunca" },
  { valor: 1, texto: "Vários dias" },
  { valor: 2, texto: "Mais de metade dos dias" },
  { valor: 3, texto: "Quase todos os dias" },
];

export default function GAD7() {
  const navigate = useNavigate();
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState(new Array(7).fill(-1));
  const [aEnviar, setAEnviar] = useState(false);

  const respostaAtual = respostas[indice];
  const ultimaPergunta = indice === PERGUNTAS.length - 1;

  function selecionar(valor) {
    const novas = [...respostas];
    novas[indice] = valor;
    setRespostas(novas);
  }

  async function avancar() {
    if (respostaAtual === -1) return;

    if (!ultimaPergunta) {
      setIndice(indice + 1);
      return;
    }

    guardarRespostasGAD7(respostas);
    setAEnviar(true);

    try {
      const uuid = localStorage.getItem("arsm_uuid");
      const respostasPHQ9 = obterRespostasPHQ9();

      const resposta = await fetch(`${API_URL}/api/avaliacao`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uuid,
          respostas_phq9: respostasPHQ9,
          respostas_gad7: respostas,
        }),
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        alert(resultado.erro || "Ocorreu um erro ao processar a avaliação.");
        setAEnviar(false);
        return;
      }

      navigate("/resultado", { state: resultado });
    } catch (erro) {
      alert("Não foi possível ligar ao servidor. Verifica a tua ligação.");
      console.error(erro);
      setAEnviar(false);
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
          {!aEnviar && <span onClick={sair} style={styles.botaoSair}>✕ Sair</span>}
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
          {indice > 0 && !aEnviar && (
            <button style={styles.botaoVoltar} onClick={voltar}>Voltar</button>
          )}
          <button
            style={{
              ...styles.botao,
              ...((respostaAtual === -1 || aEnviar) ? styles.botaoDesativado : {}),
            }}
            onClick={avancar}
            disabled={respostaAtual === -1 || aEnviar}
          >
            {aEnviar ? "A processar..." : ultimaPergunta ? "Ver resultado" : "Seguinte"}
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
  topo: { display: "flex", justifyContent: "flex-end", marginBottom: "8px", minHeight: "20px" },
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
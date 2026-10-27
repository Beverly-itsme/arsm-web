import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Questionario from "../../components/Questionario";
import { obterRespostasPHQ9, guardarRespostasGAD7 } from "../../store/avaliacaoStore";
import { IMAGENS_GAD7 } from "../../constants/imagensQuestionario";
import { CORES } from "../../tema";

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

const FUNDOS = [CORES.coral, CORES.pessego, CORES.lilas, CORES.azul, CORES.verde];

export default function GAD7() {
  const navigate = useNavigate();
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState(new Array(PERGUNTAS.length).fill(-1));
  const [aEnviar, setAEnviar] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("arsm_uuid")) {
      navigate("/idade", { replace: true });
    } else if (obterRespostasPHQ9().length !== 9) {
      navigate("/phq9", { replace: true });
    }
  }, [navigate]);

  function selecionar(valor) {
    const novas = [...respostas];
    novas[indice] = valor;
    setRespostas(novas);
    setErro("");
  }

  async function avancar() {
    if (respostas[indice] === -1 || aEnviar) return;

    if (indice < PERGUNTAS.length - 1) {
      setIndice(indice + 1);
      return;
    }

    guardarRespostasGAD7(respostas);
    setAEnviar(true);
    setErro("");

    try {
      const resposta = await fetch(`${API_URL}/api/avaliacao`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uuid: localStorage.getItem("arsm_uuid"),
          respostas_phq9: obterRespostasPHQ9(),
          respostas_gad7: respostas,
        }),
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        setErro(resultado.erro || "Ocorreu um erro ao processar a avaliação.");
        setAEnviar(false);
        return;
      }

      navigate("/resultado", { state: resultado });
    } catch (e) {
      console.error(e);
      setErro("Não foi possível ligar ao servidor. Verifica a tua ligação e tenta outra vez.");
      setAEnviar(false);
    }
  }

  function voltar() {
    if (indice > 0) setIndice(indice - 1);
  }

  function sair() {
    if (window.confirm("Sair da avaliação? As tuas respostas até agora serão perdidas.")) {
      navigate("/inicio");
    }
  }

  return (
    <Questionario
      titulo="Ansiedade · GAD-7"
      perguntas={PERGUNTAS}
      imagens={IMAGENS_GAD7}
      fundos={FUNDOS}
      indice={indice}
      respostas={respostas}
      onSelecionar={selecionar}
      onAvancar={avancar}
      onVoltar={voltar}
      onSair={sair}
      textoFinal="Ver resultado"
      aEnviar={aEnviar}
      erro={erro}
    />
  );
}
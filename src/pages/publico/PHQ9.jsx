import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Questionario from "../../components/Questionario";
import { guardarRespostasPHQ9 } from "../../store/avaliacaoStore";
import { IMAGENS_PHQ9 } from "../../constants/imagensQuestionario";
import { CORES } from "../../tema";

const PERGUNTAS = [
  "Pouco interesse ou prazer em fazer as coisas",
  "Sentir-se em baixo, deprimido(a) ou sem esperança",
  "Dificuldade em adormecer, manter o sono, ou dormir demais",
  "Sentir-se cansado(a) ou com pouca energia",
  "Falta de apetite ou comer em excesso",
  "Sentir-se mal consigo mesmo(a) ou que é um fracasso, ou que desiludiu a sua família ou a si mesmo(a)",
  "Dificuldade em concentrar-se em coisas como ler o jornal ou ver televisão",
  "Lentidão a mexer-se ou a falar, a ponto de poder ter sido notado ou o oposto, estar tão agitado(a) que se tem mexido muito mais do que o costume",
  "Pensamentos de que seria melhor estar morto(a), ou de fazer mal a si mesmo(a) de alguma forma",
];

const FUNDOS = [CORES.azul, CORES.lilas, CORES.pessego, CORES.verde, CORES.coral];

export default function PHQ9() {
  const navigate = useNavigate();
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState(new Array(PERGUNTAS.length).fill(-1));

  function selecionar(valor) {
    const novas = [...respostas];
    novas[indice] = valor;
    setRespostas(novas);
  }

  function avancar() {
    if (respostas[indice] === -1) return;
    if (indice === PERGUNTAS.length - 1) {
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
      navigate("/inicio");
    }
  }

  return (
    <Questionario
      titulo="Depressão · PHQ-9"
      perguntas={PERGUNTAS}
      imagens={IMAGENS_PHQ9}
      fundos={FUNDOS}
      indice={indice}
      respostas={respostas}
      onSelecionar={selecionar}
      onAvancar={avancar}
      onVoltar={voltar}
      onSair={sair}
      textoFinal="Continuar"
    />
  );
}
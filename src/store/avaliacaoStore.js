export function guardarRespostasPHQ9(respostas) {
  sessionStorage.setItem("arsm_phq9", JSON.stringify(respostas));
}

export function obterRespostasPHQ9() {
  const dados = sessionStorage.getItem("arsm_phq9");
  return dados ? JSON.parse(dados) : [];
}

export function guardarRespostasGAD7(respostas) {
  sessionStorage.setItem("arsm_gad7", JSON.stringify(respostas));
}

export function obterRespostasGAD7() {
  const dados = sessionStorage.getItem("arsm_gad7");
  return dados ? JSON.parse(dados) : [];
}
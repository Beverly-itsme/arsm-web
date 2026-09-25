import NavTabs from "../../components/NavTabs";

export default function Educacao() {
  return (
    <div style={styles.container}>
      <div style={styles.conteudo}>
        <NavTabs />

        <h1 style={styles.titulo}>Saúde Mental: o que precisas de saber</h1>

        <h2 style={styles.secaoTitulo}>O que é depressão?</h2>
        <p style={styles.texto}>
          A depressão é uma condição comum caracterizada por tristeza
          persistente ou perda de interesse em atividades que antes davam
          prazer, durante um período prolongado. Não é o mesmo que estar
          simplesmente triste por um dia — é algo que afeta o dia a dia de
          forma contínua.
        </p>

        <h2 style={styles.secaoTitulo}>O que é ansiedade?</h2>
        <p style={styles.texto}>
          A ansiedade envolve sentimentos intensos e persistentes de
          preocupação ou medo, muitas vezes acompanhados de sintomas físicos
          como tensão muscular ou dificuldade em relaxar. Uma certa
          ansiedade é normal — torna-se preocupante quando é excessiva e
          difícil de controlar.
        </p>

        <h2 style={styles.secaoTitulo}>Sinais a que prestar atenção</h2>
        <p style={styles.texto}>
          • Mudanças no sono ou apetite<br />
          • Perda de interesse em coisas que antes gostavas<br />
          • Dificuldade em concentrar-te<br />
          • Sentir-te cansado(a) sem razão aparente<br />
          • Preocupação que não consegues controlar<br />
          • Isolamento de amigos e família
        </p>

        <h2 style={styles.secaoTitulo}>Mitos vs. Factos</h2>
        <p style={styles.texto}>
          <b>Mito:</b> "Depressão é só fraqueza, basta ter força de vontade."<br />
          <b>Facto:</b> A depressão é uma condição real, tal como qualquer
          outro problema de saúde, e não uma questão de fraqueza pessoal.
          <br /><br />
          <b>Mito:</b> "Só se procura ajuda quando a situação é muito grave."<br />
          <b>Facto:</b> Procurar apoio precocemente pode prevenir que os
          sintomas se agravem.
        </p>

        <h2 style={styles.secaoTitulo}>O que podes fazer</h2>
        <p style={styles.texto}>
          • Fala com alguém em quem confies<br />
          • Mantém rotinas de sono e alimentação<br />
          • Procura apoio profissional se os sintomas persistirem<br />
          • Não hesites em fazer esta autoavaliação sempre que sentires necessidade
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#F5F7FA",
    fontFamily: "system-ui, sans-serif",
    padding: "32px 24px",
  },
  conteudo: { maxWidth: "600px", margin: "0 auto" },
  titulo: { fontSize: "24px", fontWeight: "bold", color: "#1A1A2E", marginBottom: "8px" },
  secaoTitulo: { fontSize: "18px", fontWeight: "600", color: "#1A1A2E", marginTop: "20px", marginBottom: "10px" },
  texto: { fontSize: "15px", color: "#3A3A3A", lineHeight: "1.6" },
};
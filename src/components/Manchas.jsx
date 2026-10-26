import useLargura from "../hooks/useLargura";
import { CORES } from "../tema";

const FORMA_A =
  "M-30,-40 C-6,-52 30,-48 44,-24 C56,-2 40,14 46,32 C50,52 22,58 4,52 C-18,46 -26,60 -42,48 C-60,34 -56,6 -52,-12 C-48,-28 -42,-34 -30,-40 Z";
const FORMA_B =
  "M-20,-50 C10,-60 44,-48 50,-18 C56,10 34,30 20,44 C8,56 -16,54 -30,40 C-44,26 -34,10 -46,-4 C-58,-18 -42,-42 -20,-50 Z";
const FORMA_C =
  "M-10,-48 C8,-44 14,-60 36,-50 C58,-40 56,-10 50,8 C44,28 54,46 30,54 C8,62 -10,48 -28,52 C-50,56 -58,30 -50,10 C-44,-4 -58,-14 -46,-30 C-38,-42 -24,-52 -10,-48 Z";

const ANEIS = [CORES.verde, "#A9CBF2", "#DCD3F5", "#FFFFFF"];

function transformar(d, cx, cy, escala, rotGraus) {
  const rad = (rotGraus * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  return d.replace(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g, (_, xs, ys) => {
    const x = parseFloat(xs) * escala;
    const y = parseFloat(ys) * escala;
    return `${(x * cos - y * sin + cx).toFixed(1)},${(x * sin + y * cos + cy).toFixed(1)}`;
  });
}

function Mancha({ d, cx, cy, escala, rot, cor, passo, traco }) {
  const raio = 50 * escala;
  return (
    <g>
      <path d={transformar(d, cx, cy, escala, rot)} fill={cor} />
      {ANEIS.map((corAnel, i) => (
        <path
          key={i}
          d={transformar(d, cx, cy, escala * (1 + ((i + 1) * passo) / raio), rot)}
          fill="none"
          stroke={corAnel}
          strokeWidth={traco}
        />
      ))}
    </g>
  );
}

function Quadro({ viewBox, alinhamento, children }) {
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio={alinhamento}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      {children}
    </svg>
  );
}

export default function Manchas() {
  const largo = useLargura() >= 900;

  if (largo) {
    return (
      <Quadro viewBox="0 0 1440 900" alinhamento="xMaxYMid slice">
        <Mancha d={FORMA_B} cx={1330} cy={170} escala={2} rot={15} cor={CORES.pessego} passo={11} traco={2.2} />
        <Mancha d={FORMA_C} cx={1020} cy={520} escala={3.3} rot={-8} cor={CORES.coral} passo={11} traco={2.2} />
        <Mancha d={FORMA_A} cx={760} cy={100} escala={1} rot={-10} cor={CORES.coral} passo={11} traco={2.2} />
        <Mancha d={FORMA_B} cx={720} cy={880} escala={1.2} rot={25} cor={CORES.pessego} passo={11} traco={2.2} />
      </Quadro>
    );
  }

  return (
    <Quadro viewBox="0 0 300 640" alinhamento="xMidYMid slice">
      <Mancha d={FORMA_A} cx={34} cy={118} escala={0.8} rot={-10} cor={CORES.coral} passo={6} traco={1.6} />
      <Mancha d={FORMA_B} cx={262} cy={140} escala={1} rot={15} cor={CORES.pessego} passo={6} traco={1.6} />
      <Mancha d={FORMA_C} cx={230} cy={346} escala={1.28} rot={-8} cor={CORES.coral} passo={6} traco={1.6} />
    </Quadro>
  );
}
import { useEffect, useState } from "react";

export default function useLargura() {
  const [largura, setLargura] = useState(
    typeof window === "undefined" ? 1200 : window.innerWidth
  );

  useEffect(() => {
    const aoRedimensionar = () => setLargura(window.innerWidth);
    window.addEventListener("resize", aoRedimensionar);
    return () => window.removeEventListener("resize", aoRedimensionar);
  }, []);

  return largura;
}
import { useNavigate, useLocation } from "react-router-dom";

const ABAS = [
  { path: "/inicio", label: "Teste" },
  { path: "/historico", label: "Histórico" },
  { path: "/educacao", label: "Saúde Mental" },
];

export default function NavTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={styles.container}>
      {ABAS.map((aba) => (
        <div
          key={aba.path}
          onClick={() => navigate(aba.path)}
          style={{
            ...styles.aba,
            ...(location.pathname === aba.path ? styles.abaAtiva : {}),
          }}
        >
          {aba.label}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "32px",
    borderBottom: "1px solid #E5E7EB",
    paddingBottom: "0",
  },
  aba: {
    padding: "12px 24px",
    cursor: "pointer",
    color: "#6B7280",
    fontSize: "15px",
    fontWeight: "500",
    borderBottom: "3px solid transparent",
  },
  abaAtiva: {
    color: "#4A6FA5",
    fontWeight: "600",
    borderBottom: "3px solid #4A6FA5",
  },
};
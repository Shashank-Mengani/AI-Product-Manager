export default function PivotButton({ onPivot, loading }) {
    return (
      <button
        style={styles.btn}
        onClick={onPivot}
        disabled={loading}
      >
        {loading ? "Pivoting..." : "🔄 Pivot Idea (Make it More Unique)"}
      </button>
    )
  }
  
  const styles = {
    btn: {
      marginTop: "20px",
      width: "100%",
      padding: "12px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
      background: "#222",
      color: "white"
    }
  }
  
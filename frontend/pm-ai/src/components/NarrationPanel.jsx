export default function NarrationPanel({ data }) {
    if (!data?.narration) {
      return null
    }
  
    return (
      <div style={styles.card}>
        <h2>📄 Natural Language Document Generation</h2>
  
        <div style={styles.text}>
          {data.narration}
        </div>
      </div>
    )
  }
  
  const styles = {
    card: {
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      marginTop: "20px",
      background: "#fff"
    },
    text: {
      whiteSpace: "pre-wrap",
      lineHeight: "1.7",
      fontSize: "15px",
      color: "#222"
    }
  }
  
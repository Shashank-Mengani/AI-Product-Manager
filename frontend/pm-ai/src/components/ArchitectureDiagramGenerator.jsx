import { useState } from "react"
import { generateArchitecture } from "../services/architectureApi"

export default function ArchitectureDiagramGenerator({ data }) {
  const [loading, setLoading] = useState(false)
  const [output, setOutput] = useState("")

  const handleGenerate = async () => {
    try {
      setLoading(true)
      setOutput("")

      const res = await generateArchitecture(data)

      setOutput(res.architecture || "No architecture generated.")
    } catch (err) {
      console.error(err)
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.card}>
      <h2>🏗 Architecture Diagram Generator</h2>
      <p style={{ color: "gray" }}>
        Generates system design + Mermaid diagram using backend AI.
      </p>

      <button style={styles.btn} onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Architecture"}
      </button>

      {output && <pre style={styles.pre}>{output}</pre>}
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
  btn: {
    marginTop: "10px",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "none",
    background: "black",
    color: "white",
    cursor: "pointer"
  },
  pre: {
    marginTop: "15px",
    background: "#f9f9f9",
    padding: "15px",
    borderRadius: "10px",
    whiteSpace: "pre-wrap",
    lineHeight: "1.7",
    fontSize: "14px",
    overflowX: "auto"
  }
}

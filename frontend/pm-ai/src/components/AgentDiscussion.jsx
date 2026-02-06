

import { useEffect, useRef } from "react"

export default function AgentDiscussion({ logs }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [logs])

  if (!logs || logs.length === 0) {
    return (
      <div style={styles.card}>
        <h2>💬 Agent Discussion</h2>
        <p>No logs yet...</p>
      </div>
    )
  }

  return (
    <div style={styles.card}>
      <h2>💬 Agent Discussion</h2>

      <div style={styles.logBox}>
        {logs.map((log, idx) => (
          <div key={idx} style={styles.logItem}>
            <b style={styles.agent}>{log.agent}:</b>{" "}
            <span>{log.message}</span>
          </div>
        ))}
        
        <div ref={bottomRef}></div>
      </div>
    </div>
  )
}

const styles = {
  card: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    marginBottom: "20px",
    background: "#fff"
  },

  logBox: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    background: "#f9f9f9",
    maxHeight: "250px",
    overflowY: "auto",
    fontSize: "14px",
    lineHeight: "1.6"
  },

  logItem: {
    marginBottom: "8px"
  },

  agent: {
    color: "#000"
  }
}




import { useState, useEffect } from "react"
import { useTambo } from "@tambo-ai/react"

export default function AIAssistantPanel({ onClose, projectName, setProjectName }) {
  const tambo = useTambo()

  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const messages = tambo.thread?.messages || []

  const quickActions = [
    {
      label: "Generate PRD",
      prompt: `Generate a complete PRD for my project "${projectName}" with clear headings.`
    },
    {
      label: "Improve Pitch",
      prompt: `Improve my pitch script for "${projectName}" in a hackathon-winning way.`
    },
    {
      label: "Suggest Unique Features",
      prompt: `Suggest 5 unique features that make "${projectName}" stand out in a hackathon.`
    },
    {
      label: "Generate Demo Script",
      prompt: `Generate a demo walkthrough script with presenter notes for "${projectName}".`
    }
  ]

  const handleSend = async (customText) => {
    const prompt = customText || input
    if (!prompt.trim()) return

    setLoading(true)
    setInput("")

    try {
      await tambo.sendThreadMessage(prompt, { stream: true })
  
    } catch (err) {
      console.error("Assistant Error:", err)
      alert("Assistant failed. Check console.")
    } finally {
      setLoading(false)
    }
  }

  const renderContent = (content) => {
    if (!content) return ""

    if (typeof content === "string") return content

    if (Array.isArray(content)) {
      return content
        .map((c) => (typeof c === "string" ? c : c?.text || JSON.stringify(c)))
        .join(" ")
    }

    if (typeof content === "object") {
      return content.text || JSON.stringify(content)
    }

    return String(content)
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.panel}>
        <div style={styles.header}>
          <h2 style={styles.title}>🤖 AI Assistant</h2>
          <button style={styles.closeBtn} onClick={onClose}>
            ✖
          </button>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>📌 Project Name</h3>
          <input
            style={styles.inputBox}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter project name..."
          />
        </div>

        {/* Quick Actions */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>⚡ Quick Actions</h3>

          <div style={styles.quickActions}>
            {quickActions.map((q, idx) => (
              <button
                key={idx}
                style={styles.quickBtn}
                onClick={() => handleSend(q.prompt)}
                disabled={loading}
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>
        <div style={styles.chatBox}>
          {messages.length === 0 && (
            <p style={{ fontSize: "14px", color: "#555" }}>
              Start chatting with your AI assistant...
            </p>
          )}

          {messages.map((m, idx) => (
            <div
              key={idx}
              style={{
                ...styles.msg,
                background: m.role === "user" ? "#dbeafe" : "#f1f5f9",
                alignSelf: m.role === "user" ? "flex-end" : "flex-start"
              }}
            >
              <b>{m.role === "user" ? "You" : "AI"}:</b>{" "}
              {renderContent(m.content)}
            </div>
          ))}

          {loading && (
            <p style={{ fontSize: "13px", color: "#555" }}>
              ⏳ Generating response...
            </p>
          )}
        </div>

        <div style={styles.bottom}>
          <input
            style={styles.chatInput}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
          />
          <button
            style={styles.sendBtn}
            onClick={() => handleSend()}
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    right: 0,
    height: "100vh",
    width: "400px",
    background: "#fff",
    borderLeft: "2px solid #ddd",
    zIndex: 9999,
    boxShadow: "-4px 0px 10px rgba(0,0,0,0.15)"
  },

  panel: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "15px"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px"
  },

  title: {
    margin: 0,
    fontSize: "20px"
  },

  closeBtn: {
    background: "#111",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  section: {
    marginTop: "15px"
  },

  sectionTitle: {
    marginBottom: "8px",
    fontSize: "15px"
  },

  inputBox: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },

  quickActions: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  quickBtn: {
    padding: "12px",
    borderRadius: "8px",
    border: "2px solid black",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    background: "black",
    color: "white",
    textAlign: "left"
  },

  chatBox: {
    flex: 1,
    overflowY: "auto",
    marginTop: "15px",
    borderTop: "1px solid #ddd",
    paddingTop: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  msg: {
    padding: "10px",
    borderRadius: "10px",
    maxWidth: "90%",
    fontSize: "14px",
    lineHeight: "1.5"
  },

  bottom: {
    display: "flex",
    gap: "10px",
    marginTop: "10px"
  },

  chatInput: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },

  sendBtn: {
    background: "#111",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  }
}

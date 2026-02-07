
import { useState, useRef, useEffect } from "react"

import AgentDiscussion from "../components/AgentDiscussion"
import RoadmapBoard from "../components/RoadmapBoard"
import MVPFeatures from "../components/MVPFeatures"
import TechStack from "../components/TechStack"
import CriticReview from "../components/CriticReview"
import PitchPanel from "../components/PitchPanel"
import PivotButton from "../components/PivotButton"
import NarrationPanel from "../components/NarrationPanel"

import AIAssistantPanel from "../components/AIAssistantPanel"
import ArchitectureDiagramGenerator from "../components/ArchitectureDiagramGenerator"
import BugFixAssistant from "../components/BugFixAssistant"

export default function Dashboard({
  data,
  onPivot,
  pivotLoading,
  project,
  setProject
}) {
  const [assistantOpen, setAssistantOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const [bugFixOpen, setBugFixOpen] = useState(false)
  const [codeReviewOpen, setCodeReviewOpen] = useState(false)

  const [modalVisible, setModalVisible] = useState(false)

  const overviewRef = useRef(null)
  const roadmapRef = useRef(null)
  const mvpRef = useRef(null)
  const techRef = useRef(null)
  const criticRef = useRef(null)
  const pitchRef = useRef(null)

  const scrollToSection = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setBugFixOpen(false)
        setCodeReviewOpen(false)
      }
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  useEffect(() => {
    if (bugFixOpen || codeReviewOpen) {
      setTimeout(() => setModalVisible(true), 50)
    } else {
      setModalVisible(false)
    }
  }, [bugFixOpen, codeReviewOpen])

  const menuItems = [
    { label: "Overview", icon: "📌", ref: overviewRef },
    { label: "Roadmap", icon: "🗺", ref: roadmapRef },
    { label: "MVP Plan", icon: "🚀", ref: mvpRef },
    { label: "Tech Stack", icon: "🛠", ref: techRef },
    { label: "Critic Review", icon: "⚠", ref: criticRef },
    { label: "Pitch Script", icon: "🎤", ref: pitchRef },
    { label: "Bug Fix Assistant", icon: "🐞", action: "bugfix" },
  ]

  if (!data) return null

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.sidebar,
          width: sidebarOpen ? "240px" : "80px"
        }}
      >

        <button
          style={styles.toggleBtn}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>

        <div style={{ marginTop: "10px" }}>
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              style={styles.menuBtn}
              title={item.label}
              onClick={() => {
                if (item.ref) {
                  scrollToSection(item.ref)
                } else if (item.action === "bugfix") {
                  setBugFixOpen(true)
                } else if (item.action === "review") {
                  setCodeReviewOpen(true)
                }
              }}
            >
              <span style={styles.icon}>{item.icon}</span>
              {sidebarOpen && <span style={styles.label}>{item.label}</span>}
            </button>
          ))}
        </div>

        <button
          style={styles.assistantBtn}
          onClick={() => setAssistantOpen(true)}
        >
          <span style={styles.icon}>🤖</span>
          {sidebarOpen && <span style={styles.label}>AI Assistant</span>}
        </button>
      </div>

      <div
        style={{
          ...styles.main,
          marginLeft: sidebarOpen ? "260px" : "100px",
          marginRight: assistantOpen ? "420px" : "0px"
        }}
      >

        <div style={styles.topBar}>
          <h2 style={{ margin: 0 }}>📌 {project.name}</h2>

          <button style={styles.openBtn} onClick={() => setAssistantOpen(true)}>
            Open Assistant
          </button>
        </div>

        <div ref={overviewRef}>
          <NarrationPanel data={data} />
          <AgentDiscussion logs={data.logs} />
        </div>

        <PivotButton onPivot={onPivot} loading={pivotLoading} />

        <ArchitectureDiagramGenerator data={data} />

        <div ref={roadmapRef}>
          <RoadmapBoard data={data} />
        </div>

        <div ref={mvpRef}>
          <MVPFeatures data={data} />
        </div>

        <div ref={techRef}>
          <TechStack data={data} />
        </div>

        <div ref={criticRef}>
          <CriticReview data={data} />
        </div>

        <div ref={pitchRef}>
          <PitchPanel data={data} />
        </div>
      </div>

      {assistantOpen && (
        <AIAssistantPanel
          onClose={() => setAssistantOpen(false)}
          project={project}
          setProject={setProject}
          data={data}
        />
      )}

      {bugFixOpen && (
        <div
          style={{
            ...styles.modalOverlay,
            opacity: modalVisible ? 1 : 0
          }}
          onClick={() => setBugFixOpen(false)}
        >
          <div
            style={{
              ...styles.modalBox,
              transform: modalVisible ? "scale(1)" : "scale(0.85)",
              opacity: modalVisible ? 1 : 0
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <h2 style={{ margin: 0 }}>🐞 Bug Fix Assistant</h2>
              <button
                style={styles.closeBtn}
                onClick={() => setBugFixOpen(false)}
              >
                ✖
              </button>
            </div>

            <BugFixAssistant />
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    width: "100%"
  },

  sidebar: {
    height: "100vh",
    background: "#fff",
    borderRight: "2px solid #ddd",
    padding: "15px",
    position: "fixed",
    left: 0,
    top: 0,
    transition: "0.3s",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: 100
  },

  toggleBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "black",
    color: "white",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold"
  },

  menuBtn: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    background: "black",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textAlign: "left"
  },

  assistantBtn: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "10px",
    border: "none",
    background: "black",
    color: "white",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textAlign: "left"
  },

  icon: {
    fontSize: "18px",
    minWidth: "25px"
  },

  label: {
    fontSize: "15px"
  },

  main: {
    flex: 1,
    padding: "20px",
    maxWidth: "1000px",
    transition: "0.3s"
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    background: "#fff"
  },

  openBtn: {
    padding: "10px 15px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "black",
    color: "white",
    fontWeight: "bold",
    fontSize: "14px"
  },

  // MODAL
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 200,
    transition: "0.3s"
  },

  modalBox: {
    width: "90%",
    maxWidth: "850px",
    maxHeight: "90vh",
    overflowY: "auto",
    background: "black",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
    transition: "0.3s ease-in-out"
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px"
  },

  closeBtn: {
    border: "none",
    background: "transparent",
    fontSize: "20px",
    cursor: "pointer",
    fontWeight: "bold"
  }
}

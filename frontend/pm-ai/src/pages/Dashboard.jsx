
import { useState, useRef } from "react"

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

export default function Dashboard({ data, onPivot, pivotLoading }) {
  const [assistantOpen, setAssistantOpen] = useState(false)
  const [projectName, setProjectName] = useState("Hackathon Project")
  const [sidebarOpen, setSidebarOpen] = useState(true)

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

  const menuItems = [
    { label: "Overview", icon: "📌", ref: overviewRef },
    { label: "Roadmap", icon: "🗺", ref: roadmapRef },
    { label: "MVP Plan", icon: "🚀", ref: mvpRef },
    { label: "Tech Stack", icon: "🛠", ref: techRef },
    { label: "Critic Review", icon: "⚠", ref: criticRef },
    { label: "Pitch Script", icon: "🎤", ref: pitchRef }
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
              onClick={() => scrollToSection(item.ref)}
            >
              <span style={styles.icon}>{item.icon}</span>
              {sidebarOpen && <span style={styles.label}>{item.label}</span>}
            </button>
          ))}
        </div>


        <button
          style={styles.assistantBtn}
          title="AI Assistant"
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
          <input
            style={styles.projectInput}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

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
          projectName={projectName}
          setProjectName={setProjectName}
        />
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
    justifyContent: "space-between"
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

  projectInput: {
    fontSize: "18px",
    fontWeight: "700",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    width: "70%"
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
  }
}




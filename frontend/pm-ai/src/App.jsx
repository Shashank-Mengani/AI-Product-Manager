
import { useState } from "react"
import Navbar from "./components/Navbar"
import Loader from "./components/Loader"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import { streamPMFlow, pivotIdea } from "./services/api"

export default function App() {
  const [loading, setLoading] = useState(false)
  const [pivotLoading, setPivotLoading] = useState(false)
  const [data, setData] = useState(null)

  const [project, setProject] = useState({
    name: "Hackathon Project",
    tagline: "AI-powered hackathon product manager",
    problem: "",
    users: "",
    value: ""
  })

  const handleSubmit = async (idea) => {
    setLoading(true)
    setData({ logs: [] })

    let logs = []
    let partialData = {}

    streamPMFlow(
      idea,
      (log) => {
        logs.push(log)
        setData((prev) => ({
          ...(prev || {}),
          ...partialData,
          logs: [...logs]
        }))
      },
      (result) => {
        partialData[result.key] = result.data
        setData((prev) => ({
          ...(prev || {}),
          ...partialData,
          logs: [...logs]
        }))
      },
      (finalData) => {
        setData((prev) => ({
          ...(prev || {}),
          ...finalData,
          logs: [...logs]
        }))
        setLoading(false)
      },
      () => {
        alert("Streaming failed")
        setLoading(false)
      }
    )
  }

  const handlePivot = async () => {
    try {
      setPivotLoading(true)

      const res = await pivotIdea(data)
      const pivotedMVP = res.pivotedMVP

      setData((prev) => ({
        ...prev,
        finalMVP: pivotedMVP,
        logs: [
          ...(prev.logs || []),
          { agent: "User", message: "Requested pivot for uniqueness 🔄" },
          { agent: "Constraint Agent", message: "Pivoted MVP generated ✅" }
        ]
      }))
    } catch (err) {
      alert("Pivot failed")
      console.log(err)
    } finally {
      setPivotLoading(false)
    }
  }

  return (
    <div>
      {/* ✅ Navbar can edit project */}
      <Navbar project={project} setProject={setProject} />

      {loading ? (
        <Loader />
      ) : data ? (
        <Dashboard
          data={data}
          onPivot={handlePivot}
          pivotLoading={pivotLoading}
          project={project}
          setProject={setProject}
        />
      ) : (
        <Home onSubmit={handleSubmit} />
      )}
    </div>
  )
}

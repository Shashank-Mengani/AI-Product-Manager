import { ideaAgent } from "../agents/ideaAgent.js"
import { marketAgent } from "../agents/marketAgent.js"
import { featureAgent } from "../agents/featureAgent.js"
import { techAgent } from "../agents/techAgent.js"
import { constraintAgent } from "../agents/constraintAgent.js"
import { criticAgent } from "../agents/criticAgent.js"
import { pitchAgent } from "../agents/pitchAgent.js"
import { narratorAgent } from "../agents/narratorAgent.js"

import { runAgent } from "../services/aiCall.js"
import { safeJSONParse } from "../utils/parseAgentOutput.js"

export async function runPMFlowStream(userIdea, sendEvent) {
  const logs = []

  const pushLog = (agent, message) => {
    const log = { agent, message }
    logs.push(log)
    sendEvent("log", log)
  }

  // Send initial log
  pushLog("User", userIdea)

  // IDEA ANALYSIS
  pushLog("Idea Analyzer", "Analyzing problem statement...")
  const ideaRes = await runAgent(ideaAgent, userIdea)
  const ideaAnalysis = safeJSONParse(ideaRes) || {}
  sendEvent("result", { key: "ideaAnalysis", data: ideaAnalysis })
  pushLog("Idea Analyzer", "Problem statement extracted ✅")

  // MARKET
  pushLog("Market Agent", "Generating personas + market gap...")
  const marketRes = await runAgent(marketAgent, JSON.stringify(ideaAnalysis))
  const marketAnalysis = safeJSONParse(marketRes) || {}
  sendEvent("result", { key: "marketAnalysis", data: marketAnalysis })
  pushLog("Market Agent", "Market analysis complete ✅")

  // FEATURES
  pushLog("Feature Agent", "Building MVP roadmap...")
  const featureRes = await runAgent(
    featureAgent,
    JSON.stringify({ ideaAnalysis, marketAnalysis })
  )
  const features = safeJSONParse(featureRes) || {}
  sendEvent("result", { key: "features", data: features })
  pushLog("Feature Agent", "Feature roadmap ready ✅")

  // TECH STACK
  pushLog("Tech Advisor", "Recommending architecture...")
  const techRes = await runAgent(techAgent, JSON.stringify({ ideaAnalysis, features }))
  const techStack = safeJSONParse(techRes) || {}
  sendEvent("result", { key: "techStack", data: techStack })
  pushLog("Tech Advisor", "Tech stack finalized 🛠")

  // CONSTRAINT CUT
  pushLog("Constraint Agent", "Cutting scope for hackathon...")
  const constraintRes = await runAgent(
    constraintAgent,
    JSON.stringify({ features, techStack })
  )
  const finalMVP = safeJSONParse(constraintRes) || {}
  sendEvent("result", { key: "finalMVP", data: finalMVP })
  pushLog("Constraint Agent", "Final MVP locked 🔥")

  // CRITIC
  pushLog("Critic Agent", "Simulating judge review...")
  const criticRes = await runAgent(criticAgent, JSON.stringify({ ideaAnalysis, finalMVP }))
  const criticReview = safeJSONParse(criticRes) || {}
  sendEvent("result", { key: "criticReview", data: criticReview })
  pushLog("Critic Agent", "Judge feedback generated ⚠")

  // PITCH
  pushLog("Pitch Agent", "Generating pitch script...")
  const pitchRes = await runAgent(
    pitchAgent,
    JSON.stringify({ ideaAnalysis, finalMVP, techStack })
  )

  // IMPORTANT FIX: if parse fails, fallback to raw string
  const pitch = safeJSONParse(pitchRes) || pitchRes

  sendEvent("result", { key: "pitch", data: pitch })
  pushLog("Pitch Agent", "Pitch ready 🎤")

  // NARRATION (Natural Language)
  pushLog("Narrator Agent", "Converting structured plan into natural language document...")
  const narrationRes = await runAgent(
    narratorAgent,
    JSON.stringify({
      ideaAnalysis,
      marketAnalysis,
      features,
      techStack,
      finalMVP,
      criticReview,
      pitch
    })
  )

  const narration = narrationRes
  sendEvent("result", { key: "narration", data: narration })
  pushLog("Narrator Agent", "Product document ready 📄")

  // FINAL EVENT
  sendEvent("final", {
    logs,
    ideaAnalysis,
    marketAnalysis,
    features,
    techStack,
    finalMVP,
    criticReview,
    pitch,
    narration
  })
}

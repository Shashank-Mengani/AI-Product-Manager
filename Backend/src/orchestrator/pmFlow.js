import { ideaAgent } from "../agents/ideaAgent.js"
import { marketAgent } from "../agents/marketAgent.js"
import { featureAgent } from "../agents/featureAgent.js"
import { techAgent } from "../agents/techAgent.js"
import { constraintAgent } from "../agents/constraintAgent.js"
import { criticAgent } from "../agents/criticAgent.js"
import { pitchAgent } from "../agents/pitchAgent.js"
import { narratorAgent } from "../agents/narratorAgent.js"

import { safeJSONParse } from "../utils/parseAgentOutput.js"
import { runAgent } from "../services/aiCall.js"

export async function runPMFlow(userIdea) {
  const logs = []

  logs.push({ agent: "User", message: userIdea })

  // 1. Idea Analysis
  logs.push({ agent: "Idea Analyzer", message: "Analyzing problem statement..." })
  const ideaRes = await runAgent(ideaAgent, userIdea)
  const ideaAnalysis = safeJSONParse(ideaRes)
  logs.push({ agent: "Idea Analyzer", message: "Problem statement extracted ✅" })

  // 2. Market Research
  logs.push({ agent: "Market Agent", message: "Finding user personas + market gap..." })
  const marketRes = await runAgent(marketAgent, JSON.stringify(ideaAnalysis))
  const marketAnalysis = safeJSONParse(marketRes)
  logs.push({ agent: "Market Agent", message: "Personas generated ✅" })

  // 3. Feature Prioritization
  logs.push({ agent: "Feature Agent", message: "Creating Must-Have / Nice-to-Have features..." })
  const featureRes = await runAgent(
    featureAgent,
    JSON.stringify({ ideaAnalysis, marketAnalysis })
  )
  const features = safeJSONParse(featureRes)
  logs.push({ agent: "Feature Agent", message: "Feature roadmap built ✅" })

  // 4. Tech Recommendation
  logs.push({ agent: "Tech Advisor", message: "Recommending best tech stack..." })
  const techRes = await runAgent(
    techAgent,
    JSON.stringify({ ideaAnalysis, features })
  )
  const techStack = safeJSONParse(techRes)
  logs.push({ agent: "Tech Advisor", message: "Architecture ready ✅" })

  // 5. Constraint Check
  logs.push({ agent: "Constraint Agent", message: "Cutting scope for hackathon feasibility..." })
  const constraintRes = await runAgent(
    constraintAgent,
    JSON.stringify({ features, techStack })
  )
  const finalMVP = safeJSONParse(constraintRes)
  logs.push({ agent: "Constraint Agent", message: "Final MVP locked 🔥" })

  // 6. Critic Review
  logs.push({ agent: "Critic Agent", message: "Simulating judge review..." })
  const criticRes = await runAgent(
    criticAgent,
    JSON.stringify({ ideaAnalysis, finalMVP })
  )
  const criticReview = safeJSONParse(criticRes)
  logs.push({ agent: "Critic Agent", message: "Weak points found + improvements ready ⚠" })

  // 7. Pitch Generator
  logs.push({ agent: "Pitch Agent", message: "Preparing pitch script..." })
  
  const pitchRes = await runAgent(
    pitchAgent,
    JSON.stringify({ ideaAnalysis, finalMVP, techStack })
  )
  const pitch = pitchRes
  logs.push({ agent: "Pitch Agent", message: "Pitch ready 🎤" })

  logs.push({ agent: "Narrator Agent", message: "Converting JSON plan into readable product document..." })
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
  logs.push({ agent: "Narrator Agent", message: "Natural language document ready 📄" })

  return {
    logs,
    ideaAnalysis,
    marketAnalysis,
    features,
    techStack,
    finalMVP,
    criticReview,
    pitch,
    narration
  }
}

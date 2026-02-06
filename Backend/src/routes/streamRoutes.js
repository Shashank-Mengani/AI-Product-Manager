import express from "express"
import { streamPMFlow } from "../controllers/streamController.js"

const router = express.Router()

router.get("/pm-stream", streamPMFlow)

export default router
import express from "express"
import { generateArchitecture } from "../controllers/architectureController.js"

const router = express.Router()

router.post("/generate", generateArchitecture)

export default router

import express from "express"
import { analyzeIdea } from "../controllers/pmController.js"
import { pivotIdea } from "../controllers/pivotController.js";

const router = express.Router()

router.post("/analyze", analyzeIdea);
router.post("/pivot", pivotIdea)

export default router;

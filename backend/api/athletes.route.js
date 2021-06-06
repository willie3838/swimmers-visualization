import express from "express"
import AthletesCtrl from "./athletes.controller.js"

const router = express.Router()

router.route("/").get(AthletesCtrl.apiGetAthlete)
router.route("/eventAndName").get(AthletesCtrl.apiGetHistory)
router.route("/allAthletes").get(AthletesCtrl.apiFindAllAthletes)

export default router
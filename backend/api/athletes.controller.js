import AthletesDAO from "../dao/athletesDAO.js"

export default class AthletesController{
    static async apiGetAthlete(req, res, next){
        
        let filters = {}

        if(req.query.name){
            filters.name = req.query.name
        }
        const eventInformation = await AthletesDAO.getAthlete(filters)

        let response = {
            events: eventInformation
        }
        res.json(response)
    }

    static async apiGetHistory(req, res, next){
        
        let filters = {}

        if(req.query.eventAndName){
            filters.eventAndName = req.query.eventAndName
        }


        const eventInformation = await AthletesDAO.getHistory(filters)

        let response = {
            events: eventInformation
        }
        res.json(response)
    }

    static async apiFindAllAthletes(req, res, next){
        const allAthletes = await AthletesDAO.findAllAthletes()
        let response = {
            athletes: allAthletes
        }
        res.json(response)
    }
}
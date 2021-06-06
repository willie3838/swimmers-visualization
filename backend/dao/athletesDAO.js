let athletes

export default class AthletesDAO {
    static async injectDB(conn){
        if(athletes){
            return
        }
        try{
            athletes = await conn.db(process.env.NS)
        }
        catch(e){
            console.error(`Unable to establish a collection handle in athletesDAO: ${e}`)
        }
    }

    static async getAthlete(filters){
        let query
        if(filters){
            if("name" in filters){
                query = { name: { $eq: filters["name"] }}
                console.log(filters["name"])
            }
        }

        try{
            const eventInformation = await athletes.collection("event_data").find(query).toArray()
            return eventInformation
        }
        catch(e){
            console.error('Athlete does not exist')
        }
        
    }

    static async getHistory(filters){
        let query
        if(filters){
            if("eventAndName" in filters){
                let temp = filters["eventAndName"].split(" ")
                let event = temp[0] + " " + temp[1]
                let name = temp[temp.length-2] + " " + temp[temp.length-1]

                query = { event: { $eq: event }, name: {$eq: name}}
                console.log(filters["eventAndName"])
            }
        }

        try{
            const eventInformation = await athletes.collection("history_data").find(query).toArray()
            return eventInformation
        }
        catch(e){
            console.error('history not working')
        }
        
    }

    static async findAllAthletes(){
        try{
            const allAthletes = await athletes.collection("athlete_data").find("").toArray()
            console.log(allAthletes)
            return allAthletes
        }
        catch(e){
            console.error('find all not working')
        }
    }
}
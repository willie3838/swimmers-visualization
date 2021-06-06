import http from "../http-common";

class AthleteDataService {
    find(query, by = "name"){
        return http.get(`?${by}=${query}`);
    }
    getHistory(query, by = "eventAndName"){
        return http.get(`eventAndName?${by}=${query}`)
    }
    findAllAthletes(){
        return http.get('allAthletes');
    }
}

export default new AthleteDataService;
import React, { useState, useEffect, useContext } from "react";
import logo from "../assets/logo.png";
import Table from "./Table";
import Graphs from "./Graphs";
import AthleteNA from "./AthleteNA";
import LoadingScreen from "./LoadingScreen";
import { Link } from "react-router-dom";
import AthleteDataService from "../services/athlete.js";
import GlobalState from "../contexts/GlobalState.js";

const Athlete = () => {

  const insightRef = React.createRef();
  const eventRef = React.createRef();

  const [showTable, setShowTable] = useState(false);
  const [athlete, setAthlete] = useContext(GlobalState);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(true);
  const [bestStroke, setBestStroke] = useState("");
  const [bestEvent, setBestEvent] = useState("");
  const [bestStyle, setBestStyle] = useState("");
  const [strokePoints, setStrokePoints] = useState([]);

    
  useEffect(() => {
    AthleteDataService.find(athlete, "name")
    .then(response => {
      console.log(response.data.events)
      if(response.data.events.length !== 0 && athlete!==""){
        setError(false);
        setEvents(response.data.events)
        swimmerSummary(response.data.events)
        setStrokePoints(strokeDistribution(response.data.events))

      }
    })
    .catch(e => {
      console.log(e);
    });
    setTimeout(() => setLoading(false), 700)

  },[])

  function strokeDistribution(data){
    let pointsAndEvents = {}
    let stroke = "";

    data.forEach(element => {
           if(!Number.isNaN(Number(element["points"])) && !element["event_name"].includes("Medley")){
              if(element["event_name"].includes("Butterfly")){
                stroke = "Butterfly"
              }
              if(element["event_name"].includes("Backstroke")){
                stroke = "Backstroke"
              }
              if(element["event_name"].includes("Breaststroke")){
                stroke = "Breaststroke"
              }
              if(element["event_name"].includes("Freestyle")){
                stroke = "Freestyle"
              }
             
              if(pointsAndEvents[stroke] !== undefined){
                pointsAndEvents[stroke]["points"] = pointsAndEvents[stroke]["points"] + Number(element["points"]);
                pointsAndEvents[stroke]["count"] = pointsAndEvents[stroke]["count"] + 1
              }
              else{
                pointsAndEvents[stroke] = {}
                pointsAndEvents[stroke]["points"] = Number(element["points"]);
                pointsAndEvents[stroke]["count"] = 1
              }
             
              
           }
           
    });

    return [pointsAndEvents["Butterfly"]["points"] / pointsAndEvents["Butterfly"]["count"], 
            pointsAndEvents["Backstroke"]["points"] / pointsAndEvents["Backstroke"]["count"],
            pointsAndEvents["Breaststroke"]["points"] / pointsAndEvents["Breaststroke"]["count"],
            pointsAndEvents["Freestyle"]["points"] / pointsAndEvents["Freestyle"]["count"]]

    
  }

  function swimmerSummary(data){
    let points = []
    let eventName = []

    data.forEach(element => {
           points.push(Number(element["points"]))
           eventName.push(element["event_name"])
    });
    
    let max = 0;
    let index = 0;

    for(let i = 0; i < points.length; i++){
      if(!Number.isNaN(Number(points[i])) && points[i] > max){
        max = points[i];
        index = i;
      }
    }
    
    setBestEvent(eventName[index]);

    let style = eventName[index].split(" ")[0].replace("m","");
    
    if(Number(style) <= 200) setBestStyle("Sprinter");
    else if(Number(style) >= 400) setBestStyle("Distance");

    if(eventName[index].includes("Freestyle")) setBestStroke("Freestyle");
    else if(eventName[index].includes("Backstroke")) setBestStroke("Backstroke");
    else if(eventName[index].includes("Breaststroke")) setBestStroke("Breaststroke");
    else if(eventName[index].includes("Butterfly")) setBestStroke("Butterfly");
  }

  function changePage(event) {
    let button = event.target;

    if(button === insightRef.current && !button.classList.contains('bg-red-800')){
        insightRef.current.classList.add('bg-red-800');
        eventRef.current.classList.remove('bg-red-800');
        setShowTable(false);
    }
    if(button === eventRef.current && !button.classList.contains('bg-red-800')){
        eventRef.current.classList.add('bg-red-800');
        insightRef.current.classList.remove('bg-red-800');
        setShowTable(true);
    }
  }

  return (
    <>
    {loading === false ? (
    <div class="w-full h-full">
      <Link to="/">
        <img src={logo} class="w-12 h-12 mt-2" />
      </Link>

      <div class={`${error ? 'block' : 'hidden'}`}>
        <AthleteNA/>
      </div>

      <div class={`${error ? 'hidden' : 'block'}`}>
       
        <div class="flex">
          {/* replace with athlete name later */}
          <div class="flex-auto pr-96">
            <h1 class="text-gray-200 text-4xl font-medium mt-7">{athlete}</h1>
            <h2 class="text-gray-400 text-xl font-medium mt-5">Summary</h2>

            <div class="flex flex-row mt-4">
              <div
                class="w-24 mr-4 rounded-xl text-gray-200 text-center font-bold bg-red-700 flex-auto py-0.5 
              transition duration-500 ease-in-out hover:bg-red-800"
              >
               {bestStroke}
              </div>
              <div
                class="w-24 mr-4 rounded-xl text-gray-200 text-center font-bold bg-blue-700 flex-auto py-0.5
              transition duration-500 ease-in-out hover:bg-blue-800"
              >
                {bestStyle}
              </div>
              <div
                class="w-24 rounded-xl text-gray-200 text-center font-bold bg-green-700 flex-auto py-0.5 px-0.5
              transition duration-500 ease-in-out hover:bg-green-800"
              >
                {bestEvent}
              </div>
            </div>
          </div>

          <div class="flex-auto">
            <div class="ml-96">
              <div class="">
                <hr class="inline-block w-32 border-t-2 border-red-700 pb-1" />
                <p class="inline text-gray-200 font-bold ml-3">Best Stroke</p>
              </div>

              <div class="mt-5">
                <hr class="inline-block w-32 border-t-2 border-blue-700 pb-1" />
                <p class="inline text-gray-200 font-bold ml-3">Swimming Style</p>
              </div>

              <div class="mt-5">
                <hr class="inline-block w-32 border-t-2 border-green-700 pb-1" />
                <p class="inline text-gray-200 font-bold ml-3">Best Event</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-11">
          <button ref={insightRef} id="page" onClick={changePage.bind(this)} class="transition duration-500 ease-in-out focus:outline-none text-white border border-red-800 bg-red-800 px-12 py-1">
            Insights
          </button>
          <button ref={eventRef} id="page" onClick={changePage.bind(this)} class="transition duration-500 ease-in-out focus:outline-none text-white border border-red-800 px-12 py-1">
            Events
          </button>
        </div>

        <div class="border-t border-red-800 pt-7 h-96">
          { showTable ? <Table data={events}/> : <Graphs strokeDistribution={strokePoints}/>}
        </div>
      </div>
    </div>
    ) : (
      <LoadingScreen/>
    )}
    </>
  );
};

export default Athlete;

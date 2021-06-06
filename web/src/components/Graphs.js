import React, { PureComponent, useEffect, useState, useContext } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import AthleteDataService from "../services/athlete.js";
import GlobalState from "../contexts/GlobalState.js";
import { data } from 'autoprefixer';

const Graphs = (props) => {

  const [athlete, setAthlete] = useContext(GlobalState);
  const [event, setEvent] = useState("100m Freestyle");
  const [allEvents, setAllEvents] = useState(JSON.parse(localStorage.getItem("allEvents")) || []);
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem("history")) || []);
  const [testing, setTest] = useState("hello");
  const [singleEventData, setSingleEventData] = useState([]);
  const selectRef = React.createRef();

  useEffect(() => {
  
    AthleteDataService.getHistory(event+" "+athlete, "eventAndName")
    .then(response => {
      if(response.data.events.length){
        setHistory(response.data.events["0"])
        localStorage.setItem("history", JSON.stringify(response.data.events["0"]))
      }
    })
    .catch(e => {
      console.log(e);
    });

    AthleteDataService.getHistory("", "eventAndName")
    .then(response => {
      if(response.data.events.length){
        filterEventsByAthlete(response.data.events)
      }
    })
    .catch(e => {
      console.log(e);
    });

  },[event])

  useEffect(() => {

    if(history["dates"]){    
      let test = [];
  
      for(let i = 0; i < history["dates"].length; i++){     
        let date = new Date(history["dates"][i])
        history["dates"][i] = date.getFullYear()+ "-" + String(Number(date.getMonth())+1) + "-" + date.getDate()  
        test.push(history["dates"][i])
      }

      const sortByDate = arr => {
        const sorter = (a, b) => {
          return new Date(a) - new Date(b)
        };
        arr.sort(sorter);
      }

      sortByDate(test);

      if(typeof history["time"][0] !== 'number'){
        convertToMinutes();
      }
      
      let temp =[]
      for(let i = 0; i < history["time"].length; i++){        
          temp.push({
            "name": test[i],
            "time":history["time"][history["dates"].indexOf(test[i])],
          })
      }  
      setSingleEventData(temp)
      console.log(Math.ceil(temp.length/100))
    }
      
    
  }, [history])

  function filterEventsByAthlete(array){
    let temp = []
    for(let i = 0; i < array.length; i++){
      if(array[i]["name"] == athlete){
        temp.push(array[i]["event"])
      }
    }
    setAllEvents(temp)
    localStorage.setItem("allEvents", JSON.stringify(temp))
  }

  function convertToMinutes(){
    for(let i = 0; i < history["time"].length; i++){
      if(history["time"][i].includes(":")){
        let time = history["time"][i].split(":")
        let minute = Number(time[0])
        let second = (Number(time[1])/60).toFixed(2)
        history["time"][i] = Number(minute+Number(second))
      }
      else{
        history["time"][i] = Number((Number(history["time"][i])/60).toFixed(2))
      }
    }
  }

  function optionSelect(e){
    console.log("Event selected " + e.target.value)
    setEvent(e.target.value)
  }

  const strokeDistribution = [
    {
      stroke: 'Freestyle',
      A: props.strokeDistribution[3],
      maximumPoints: 1000,
    },
    {
      stroke: 'Butterfly',
      A: props.strokeDistribution[0],
      maximumPoints: 1000,
    },
    {
      stroke: 'Breaststroke',
      A: props.strokeDistribution[2],
      maximumPoints: 1000,
    },
    {
      stroke: 'Backstroke',
      A: props.strokeDistribution[1],
      maximumPoints: 1000,
    },

  ];

  

  const stackedData = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  
    return (
      <div class="h-screen w-full">

        <div class="h-full w-full flex">

          <div class="h-full w-full text-center">
            <h1 class="text-white text-xl">Stroke Distribution</h1>
            <ResponsiveContainer class="flex-1" width="100%" height="50%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={strokeDistribution}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="stroke" tick={{fill: 'white'}} />
                  <Radar dataKey="A" stroke="#991B1B" fill="#991B1B" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
          </div>
           
          <div class = "h-full w-full">

            <div class="text-center">
              <h1 class="text-white text-xl inline">Event History</h1>

              <select onChange={optionSelect} ref={selectRef} class="ml-5 text-black p-2 focus:outline-none">
                {
                  [...Array(allEvents.length)].map((e,i) => 
                    <option key={i}>{allEvents[i]}</option>
                  )                
                }
              </select>

            </div>
            
            <ResponsiveContainer width="100%" height="50%">
                <AreaChart
                  width={500}
                  height={500}
                  data={singleEventData}
                  margin={{
                    top: 10,
                    right: 70,
                    left: 0,
                    bottom: 50,
                  }}
                >
                  <XAxis  dataKey="name" interval={Math.ceil(singleEventData.length/25)} angle={40} tick={{fill: 'white'}} minTickGap={-200} dx={35} dy={5}/>
                  <YAxis tick={{fill: 'white'}}/>
                  <Tooltip />
                  <Area type="monotone" dataKey="time" stroke="#991B1B" fill="#991B1B" fillOpacity={0.3}/>
                </AreaChart>
              </ResponsiveContainer>
          </div>
           
        </div>
{/*        
        <div class="h-full w-full mt-36 flex">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={500}
                height={400}
                data={stackedData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
              </AreaChart>
          </ResponsiveContainer>
        </div>
       */}
      </div>
    );
}

export default Graphs

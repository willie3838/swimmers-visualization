import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import LoadingScreen from "./LoadingScreen";
import AthleteDataService from "../services/athlete.js";
import { Link } from "react-router-dom";
import GlobalState from "../contexts/GlobalState.js";

const Home = () => {
  const searchRef = React.createRef();
  const [athlete, setAthlete] = useContext(GlobalState);
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [allAthletes, setAllAthletes] = useState([]);
  const [searchSuggestions, setAllSearchSuggestions]  = useState([]);

  useEffect(() => {
    AthleteDataService.findAllAthletes()
    .then(response => {
      let temp = []
      response.data.athletes.forEach((element) => {
        temp.push(element['name'].toLowerCase())
      });
      setAllAthletes(temp) 
      setAllSearchSuggestions(temp.slice(0,5))     
    })
    .catch(e => {
      console.log(e);
    });

    setTimeout(() => setLoading(false), 700)
  },[])

  function onHandleChange(e){
    console.log(e.target.value)
    let temp = allAthletes.filter(element => element.indexOf(e.target.value.toLowerCase()) > -1);
    if(temp.length > 5){
      temp = temp.slice(0,5)
    }
    console.log(allAthletes)
    console.log(temp)
    setAllSearchSuggestions(temp)
  }

  function getAthlete(query){
    localStorage.clear()
    setAthlete(query);
    localStorage.setItem("athlete", query)
  }

  return (
    <>
    {loading === false ? (
    <div>
      <div class="flex justify-center mt-64 hover:ring-4">
        <img
          src={logo}
          class="h-52 w-52
                  transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100 transform"
          alt="Mallards Swim Team Logo"
        />
      </div>

      <div class="flex justify-center">
        <h1 class="text-gray-200 text-2xl">Mallards Swim Team Database</h1>
      </div>

      <div class="flex justify-center mt-7 ml-6">
        <input
          type="text"
          ref={searchRef}
          onFocus={() => setShowSearch(true)}
          onBlur={() => setShowSearch(false)}
          onChange={onHandleChange.bind(this)}
          class={`${showSearch ? 'shadow z-10 rounded-xl border-0 p-3 w-96 h-14 focus:outline-none transition duration-200 ease-in-out' : 
          'shadow z-10 rounded-full border-0 p-3 w-96 h-14 focus:outline-none transition duration-200 ease-in-out'}`}
          placeholder="Search athlete.."
        />
        <Link
          class="relative right-10 top-4 z-20 material-icons
            transition duration-500 ease-in-out hover:-translate-y-0.5 hover:scale-100 hover:text-blue-500 transform
            focus:text-blue-500"
          to='/athlete'
          onClick={() => getAthlete(searchRef.current.value)}
        >
          search
        </Link>

      </div>

      <div class={`${showSearch ? 'flex justify-center' : 'hidden'}`}>
        <ul class="relative -top-5 z-0 bg-white w-96 text-center rounded-xl">
          
             {
              [...Array(searchSuggestions.length)].map((e,i) =>
               
                <li key = {i} class="first:mt-5 last:rounded-xl border-b border-black py-1 transition duration-200 ease-in-out hover:bg-gray-100">{
                  searchSuggestions[i].split(" ")[0].substring(0,1).toUpperCase() + searchSuggestions[i].split(" ")[0].substring(1,) + " " + searchSuggestions[i].split(" ")[1].substring(0,1).toUpperCase() + searchSuggestions[i].split(" ")[1].substring(1,)
                }</li>
              )   
              //[...Array(searchSuggestions.length)].map((e,i) => {
                //   // if(i < 5){
                //   console.log("testing" + searchSuggestions[i]);
                //   <li key = {i} class="rounded-xl border-b border-black py-1 transition duration-200 ease-in-out hover:bg-gray-100">{searchSuggestions[i]}</li>
    
                //   //   let temp = searchSuggestions[i].split(" ");
                //   //   let element = temp[0].substring(0,1).toUpperCase() + temp[0].substring(1,) + " " + temp[1].substring(0,1).toUpperCase() + temp[1].substring(1,)
            
                //   //   if(i === 0){
                //   //     <li key = {i} class="mt-5 border-b border-black py-1 transition duration-200 ease-in-out hover:bg-gray-100">{element}</li>
                //   //   }
                //   //   else if(i === 4){
                //   //     <li key = {i} class="rounded-xl border-b border-black py-1 transition duration-200 ease-in-out hover:bg-gray-100">{element}</li>
                //   //   }
                //   //   else{
                //   //     <li key = {i} class="border-b border-black py-1 transition duration-200 ease-in-out hover:bg-gray-100">{element}</li>
                //   //   }
                //   // }
                // })  
                           
            }
          
  
              
        </ul>
      </div>
     

    </div>
    ) : (
      <LoadingScreen/>
    )}
    </>
  );
};

export default Home;

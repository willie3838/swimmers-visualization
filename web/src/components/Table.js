import React from 'react'


const Table = (props) => {
    let events = []
    let course = []
    let time = []
    let points = []
    let date = []
    let city = []
    let meet = []

    

    props.data.forEach(element => {
       events.push(element["event_name"]);
       course.push(element["course"]);
       time.push(element["time"]);
       points.push(element["points"]);
       date.push(element["date"]);
       city.push(element["city"]);
       meet.push(element["meet"]);       
    });

  
    return (
        <div>
           <table class="table-fixed mx-auto mb-12">
               <thead class="w-full border-b-4 border-red-800">
                   <tr class="w-full">
                       <th class="w-96 text-left text-gray-200 font-normal pl-3 transition duration-200 ease-in-out hover:bg-red-800">Event</th>
                       <th class="w-28 text-center text-gray-200 font-normal transition duration-200 ease-in-out hover:bg-red-800">Course</th>
                       <th class="w-28 text-center text-gray-200 font-normal transition duration-200 ease-in-out hover:bg-red-800">Time</th>
                       <th class="w-28 text-center text-gray-200 font-normal transition duration-200 ease-in-out hover:bg-red-800">Points</th>
                       <th class="w-48 text-left text-gray-200 font-normal pl-3 transition duration-200 ease-in-out hover:bg-red-800">Date</th>
                       <th class="w-48 text-left text-gray-200 font-normal pl-3 transition duration-200 ease-in-out hover:bg-red-800">City</th>
                       <th class="w-96 text-left text-gray-200 font-normal pl-3 transition duration-200 ease-in-out hover:bg-red-800">Meet</th>
                   </tr>
               </thead>
               <tbody>
                   {
                       [...Array(events.length)].map((e,i) => 
                       <tr class="text-gray-200 text-mdtransition duration-200 ease-in-out hover:bg-red-800" key={i}>
                        <td class="pl-3 ">{events[i]}</td>
                        <td class="text-center py-2">{course[i]}</td>
                        <td class="text-center">{time[i]}</td>
                        <td class="text-center">{points[i]}</td>
                        <td class="pl-3">{date[i]}</td>
                        <td class="pl-3">{city[i]}</td>
                        <td class="pl-3">{meet[i]}</td>
                       </tr>)
                   }
               </tbody>
           </table> 
        </div>
    )
}

export default Table

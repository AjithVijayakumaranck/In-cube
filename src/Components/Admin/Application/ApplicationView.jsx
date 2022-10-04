import axios from 'axios';
import React, { useEffect, useState } from 'react'

function ApplicationModal(props) {

    const [applicationlist ,  setApplication] = useState([])


    useEffect( () => {
        const fetchData = ()=>{
            console.log(props.seat,"hello goole");
         console.log();
         axios.post('http://localhost:4000/auth/applicationlist').then((response)=>{
         setApplication([response.data])
         })
       
        //  console.log(applicationlist,'hello 000');
        }
        fetchData()
         },[])
return(
   sad
)
}

export default ApplicationModal
import React,{useEffect} from 'react'
import Login from '../../../Pages/Login'
import BookingModal from './bookingModal'
import { useState } from 'react'
import Axios from 'axios'
// import {countc1,countr1,countr2} from "../rows"


function Booking() {
  const [modelOpen,setmodel]=useState(false)
  const [applicationlist ,  setApplication] = useState([])
  const [booking,setSeatNumber] = useState('')
  const [seat,setRow] = useState({
    countc1:[],
    countr1:[],
    countr2:[]
  })
  

  const bookingHandler = (seatNumber)=>{
    setSeatNumber(seatNumber)
    setmodel(true)
  
  }
  useEffect( () => {
    const fetchData = ()=>{
     console.log();

     Axios.post('http://localhost:4000/auth/applicationlist').then((response)=>{
     console.log(response.data,"hello dataa");
     setApplication([response.data])
     })
     Axios.post('http://localhost:4000/auth/fetchrow').then((data)=>{
      console.log(data.data.countr1,"hello amazon");
      // console.log(seat,"hello amazoooooo")
      setRow({...seat,countc1:[data.data.countc1],countr1:[data.data.countr1],countr2:[data.data.countr2]})
      console.log(seat,"hello amsoooooooooo");
     })
   
     console.log(applicationlist,'hello 000');
    }
    fetchData()
     },[])
  return (
    <div>
     {modelOpen &&  <BookingModal closeModel={setmodel} seat={booking} setSeat={setRow} booked={seat}/>}
    <div className={`${modelOpen && "blur-sm duration-75 ease-in-out"}`}>

     <div className='grid grid-cols-12 px-10 pt-[5rem]'>
     {
     
      seat.countr1.map((seatNumber,index)=>{
        // console.log(seatNumber.seatNumber,'hello google'); 
        return(
     seatNumber.map((e)=>{
      return(
        <div onClick={()=>{
          bookingHandler(e.seatNumber);
        }}  key={index} data-modal-togle="bookingmodal" className={` text-white ${e.occupied ? 'bg-yellow-500' : 'bg-purple-800'} w-[90px] rounded-sm h-[90px] col-span-1 mr-1 text-center mt-5`}>
       {e.seatNumber}
        </div>
      )
     })
        )
      })
     }

     </div>
     {/* <div className='grid grid-cols-12 px-10 pt-5 pb-5'>
     {
      seat.countr2.map((seatNumber,index)=>{
        console.log(seatNumber,"boolo");
        return(
          seatNumber.map((e,index)=>{
          return(
            <div key={index} className=' text-white bg-purple-700 w-[90px] rounded-sm h-[90px] col-span-1 mr-1 text-center'>
            {e}
            </div>  
          )
          })
          )
      })
     }

     </div> */}
  <hr  className='bg-purple-700 mx-10 mr-12 h-[2px] mt-5'/>
     <div className='grid grid-cols-4 px-10 pt-5'>
      <div className='grid grid-cols-3'>
      {
      seat.countc1.map((seatNumber,index)=>{
        return(
          seatNumber.map((e,index)=>{
            return(
              <div key={index} className='bg-purple-600 w-[90px]  text-white rounded-sm h-[90px] mt-5 text-center'>{e}</div>

            )
          })
          )
      })
     }
      </div>
      <div className='grid col-start-4 grid-cols-3'>
      {
      seat.countc1.map((seatNumber,index)=>{
        return(
          seatNumber.map((e,index)=>{
            return(
              <div key={index} className='bg-purple-600 w-[90px]  text-white rounded-sm h-[90px] mt-5 text-center'>{e}</div>
            )
          })
          ) 
      })
     }
      </div>

     </div>
    </div>
    </div>
  )
}

export default Booking
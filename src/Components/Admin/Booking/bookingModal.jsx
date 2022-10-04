import axios from 'axios';
import React, { useEffect, useState } from 'react'

function BookingModal(props) {
    const [error,setError]=useState('')
    const [applicationlist ,  setApplication] = useState([])
    const [booking,setBooking] = useState([])
    const bookSeatHandler = async () =>{
    let seatno = props.seat
   axios.post('http://localhost:4000/auth/bookingSeat',{seatno,booking}).then((response)=>{
    console.log(response.data);
    if(response.data.status){
        props.setSeat({...props.booked,countc1:[response.data.countc1],countr1:[response.data.countr1],countr2:[response.data.countr2]})
        props.closeModel(false)
        console.log(props.booked,"hello gooogle");
    }else{
        setError('select a company')
    }
   })
    }

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
    <div className='duration-300 absolute z-[1000] rounded-md bg-white left-[650px] top-[200px] shadow-md  w-[450px]'>
<div className=''>
    <div className='bg-white flex justify-end w-full py-1'>
    <button className='bg- px-2 mr-2 rounded-sm text-purple-700' onClick={()=>{
        props.closeModel(false)
    }}> x </button>
    </div>
    <div className="text-center">
<h1 className='font-bold text-slate-700 text-2xl'>Select the Company</h1>
    </div>
    <div className="modalBody pt-8 text-center">  
 <select name="" value="select a company" onClick={(e)=>{
     console.log(booking,'hello dude');
    //  console.log(e.target.value,"hello machan");
setBooking([e.target.value])
 }} className='rounded bg-purple-700 text-white px-3 py-2' id="hello">
 {/* <option  value="" className='rounded-none text-slate-800 bg-white'>select a company</option> */}

    {
        applicationlist.map((items)=>{
            
                return(
                    items.map((item,index)=>{
                        // console.log(item,"hello");
                        // console.log(item._id)
                        return(
                            <option key={index} value={item._id} className='rounded-none text-slate-800 bg-white'>{item.companyName}</option>
                        )
                    })
                )
        })
    }
   
  
    
 </select>
    </div>
    <div className="modalFooter flex justify-center pt-5 pb-5">
<button className='rounded bg-purple-700 text-white px-3 py-1 mx-2 ' onClick={()=>{
        props.closeModel(false)
    }}>cancel</button>
<button className='rounded bg-slate-700 text-white px-3 py-1 mx-2' onClick={bookSeatHandler}>continue</button>
    </div>
</div>
</div>
)
}

export default BookingModal
import axios from 'axios'
import Axios from 'axios'
import React,{useEffect,useState} from 'react'
import AxiosInstance  from '../../../config/config'

function SheduleEvent() {
const [applicationlist ,  setApplication] = useState([])
const [modalOpen,setModal] = useState(false)
const [view,setView]=useState({})
const viewHandler = (applicant_id) => {
setModal(true)
axios.post('http://localhost:4000/auth/viewForm',{applicant_id}).then((response)=>{
  console.log(response.data.response);
  const data= response.data.response
  setView(data)
  console.log(view,'kooo');

})
}

let applicationDatas
  useEffect( () => {
 const fetchData = ()=>{
  console.log();
  Axios.post('http://localhost:4000/auth/declinedlist').then((response)=>{
  console.log(response.data);
  setApplication([response.data])
  })

  console.log(applicationlist,'hello 000');
 }
 fetchData()
  },[])
  
  return (
    <div>
          {modalOpen &&   <div className='duration-300 ease-in-out absolute z-[1000] rounded-md bg-white left-[650px] top-[150px] shadow-md  w-[450px]'>
<div className=''>
    <div className=' bg-white flex justify-end w-full py-1'>
    <button className='bg- px-2 mr-2 rounded-sm text-purple-700' onClick={()=>{
       setModal(false)
    }}> x </button>
    </div>
    <div className="text-center">
<h1 className='font-bold text-slate-700 text-2xl'>Declined Application Details</h1>
    </div>
    <div className="modalBody pt-8 ">  
<div className='flex justify-between px-8'>
<div className='text-left'>
<h4 className='font-bold pt-2 pb-1'>Applicant Name</h4>
 <h5 className='font-medium text-slate-500 '>{view.name}</h5>
</div>
<div  className='text-right'>
<h6 className='font-bold  pt-2 pb-1'>address</h6>
 <h5 className='font-medium text-slate-500'>{view.address}</h5>
</div>
</div>
<div className='flex justify-between px-8 pt-2'>
<div className='text-left'>
<h4 className='font-bold pt-2 pb-1'>city</h4>
 <h5 className='font-medium text-slate-500 '>{view.city}</h5>
</div>
<div  className='text-right'>
<h6 className='font-bold  pt-2 pb-1'>State</h6>
 <h5 className='font-medium text-slate-500'>{view.state}</h5>
</div>
</div>
<div className='flex justify-between px-8 pt-2'>
<div className='text-left'>
<h4 className='font-bold pt-2 pb-1'>Company name</h4>
 <h5 className='font-medium text-slate-500 '>{view.companyName}</h5>
</div>
<div  className='text-right'>
<h6 className='font-bold  pt-2 pb-1'>Incubation type</h6>
 <h5 className='font-medium text-slate-500'>{view.Incubation}</h5>
</div>
</div>
<div  className='text-center pt-5 px-2'>
<h6 className='font-bold  pt-2 pb-1'>Problem Facing</h6>
 <h5 className='font-medium text-slate-500'>{view.problem}</h5>
</div>
    </div>
    <div className="modalFooter flex justify-center pt-5 pb-5">
<button className='rounded bg-purple-700 text-white px-3 py-1 mx-2 ' onClick={()=>{
        setModal(false)
    }}>Close</button>
    </div>
</div>
</div> }
<div className={`${modalOpen && "blur-sm duration-75 ease-in-out"} pl-8 w-full pt-8 pr-8`}>
        <h1  className='font-bold text-xl text-purple-800 pb-5'>
          Declined List
        </h1>
        <div >
      <div className="overflow-x-auto  md:w-full shadow-md md:rounded-lg ">
    <table className="text-sm text-left w-full text-white dark:text-gray-400">
        <thead className="text-xs  text-center uppercase bg-purple-700 text-white">
            <tr>
                <th scope="col" className="py-3 px-6">
                    Applicant Name
                </th>
                <th scope="col" className="py-3 px-6">
                    Company Name
                </th>
                <th scope="col" className="py-3 px-6">
                    Address
                </th>
                <th scope="col" className="py-3 px-6">
                    Email
                </th>
                <th scope="col" className="py-3 px-6">
                    status
                </th>
                <th scope="col" className="py-3 px-6 ">
                    actions
                </th> 
            </tr>
        </thead>
        <tbody className='text-center'>
          {
          applicationlist.map((item)=>{
            console.log(item,"konichiwa");
            return(

              item.map((items,index)=>{
  
                return(
                 <tr key={index} className="bg-white border-b   dark:bg-gray-800 dark:border-gray-700">
                 <td scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                     {items.name}
                 </td>
                 <td className="py-4 px-6 text-gray-900 font-medium">
                  {items.companyName}
                 </td>
                 <td  className="py-4 px-6 text-gray-900 font-medium">
                    {items.address}
                 </td>
                 <td  className="py-4 px-6 text-gray-900 font-medium">
                    {items.email}
                 </td>
                 <td  className="py-4 px-6 text-gray-900 font-medium">
                     Declined
                 </td>
                 <td  className="py-4 px-6 text-gray-900 font-medium">
                     <div className='flex justify-center'>
                      <button className='text-white bg-purple-700 px-2 mr-2 rounded-md py-1' onClick={()=>{
                        viewHandler(items._id)
                      }}>View Details</button>
                     </div>
                 </td>
             </tr>
                )
              })
            )
           }) 
           }
           
        </tbody>
    </table>
</div>
      </div>
     

  

  
      </div>

    </div>

  

   
  )
}

export default SheduleEvent
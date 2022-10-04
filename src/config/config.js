import axios from 'axios';


// axios instance for making requests 
const axiosInstance = axios.create();

// request interceptor for adding token
axiosInstance.interceptors.request.use((config) => {
  // add token to request headers
  config.baseURL = 'http://localhost:4000';
//   config.headers = Object.assign({
//     Authorization: `${localStorage.getItem('accessToken')}`
//   }, config.headers)
  return config;
});

// axiosInstance.interceptors.response.use( (response)=>{ 
//   return response
// },( err )=>{
//  if(err.response.status === 401){
//    localStorage.clear();
//    if(window.location.pathname !== '/login'){
//      window.location = '/login'
//    }
//  }
  
//  return Promise.reject(err)
// } )

export default axios;

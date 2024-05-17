import React ,{useState} from 'react'
import axios from 'axios'

export default function WeatherApp() {

    const[dataInput,setDataInput]=useState('');
    const[weatherData,setweatherData]=useState(
     {
      data:{},
      error:false,
     }
  
    );
  
    const search= async(e) =>{
     if(e.key==='Enter'){
       e.preventDefault();
       //search query string literals (&)
       const url="https://api.openweathermap.org/data/2.5/weather";
       const api_key ="9f34a014eb78419bc8cdc3b558a776d4";
       
      await axios.get(url,{
        params:{
             q:dataInput,
             appid:api_key,
             unit:'metric'
        }
       }).then((response)=>{console.log(response);
        setweatherData({data:response.data,error:false})
       }).catch((error)=>{console.log(error);
        setweatherData({...weatherData,data:{},error:true})
        setDataInput('');
       })
  
     }
  
  
    }

  return (
    <div>

<div>
      <input type="text" placeholder='Enter your city name' name="cityname" onChange={(e)=>setDataInput(e.target.value)} value={dataInput} onKeyUp={search}></input>
    </div>

    <div>
      {weatherData.error && <p>something went wrong</p>}
      {weatherData && weatherData.data  && weatherData.data.main &&(
        <>
      <p>{weatherData.data.name}</p>
      <p>{weatherData.data.sys.country}</p>
      <p>{weatherData.data.main.temp}</p>
      </>
      )}
      
    </div>



    </div>
  )
}

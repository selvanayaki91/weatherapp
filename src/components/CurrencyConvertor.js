import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function CurrencyConvertor() {
    const [currencyData,setCurrencyData] = useState({});
    const [inputCurrency, setInputCurrency] =useState(1);
    const [fromCurrency, setFromCurrency] = useState("EUR");
    const [toCurrency, setToCurrency] = useState("USD");
    const [resultAmount, setResultAmount] = useState();

    useEffect(()=>{
        const dataFetch = async()=>{
            try{
                const response =await axios.get('https://open.er-api.com/v6/latest/${fromCurrency}')
                console.log(response);
                setCurrencyData(response.data.rates);
                console.log(currencyData);
            }
            catch(error){
                console.error(error);
            }
        }
        dataFetch();
    },[fromCurrency, toCurrency]);

    

    const handleConvert = ()=>{
        const result = (inputCurrency*currencyData[toCurrency]);
        console.log(result);
        setResultAmount(result);
        console.log(resultAmount);
    }
  return (
    <>
    <div>
        <div>
            Amount: 
            <input type="number" value={inputCurrency} onChange={(e)=>setInputCurrency(e.target.value)}/>

            From Currency:
            <select value={fromCurrency} onChange={(e)=> setFromCurrency(e.target.value)}>
                {Object.keys(currencyData).map((currency, index)=>(
                    <option key={index} value={currency}>{currency}</option>
                ))}
                
            </select>

            To Currency:
            <select value={toCurrency} onChange={(e)=> setToCurrency(e.target.value)}>
            {Object.keys(currencyData).map((currency, index)=>(
                    <option key={index} value={currency}>{currency}</option>
                ))}
            </select>
        </div>

        <button onClick={handleConvert}>Convert Currency</button>

    </div>
    </>
    
  )
}
import React, {useEffect, useState} from 'react'
import CustomizedTreeView from "./CustomizedTreeView";
import TreeChart from './TreeChart';
import {
  ThemeProvider as ThemeProviderV5
} from "@mui/styles";
import { createTheme as createThemeV5 } from '@mui/material';
import FormSentance from './FormSentance'
import SentancesTable from './SentancesTable';
import axios from 'axios';


const themeV5 = createThemeV5({
    palette: {
      primary: {
        main: "#2196f3"
      },
      secondary: {
        main: "#f50057"
      }
    },
    shape: { borderRadius: 8 }
  }); 
const sheetId = '1dtMK2nAzrcZwQz1RBg9LctbIMCUFpE6FsZ2DAOqmEco';
const SentancesSheet = 'sentances'
const apiKey = 'AIzaSyAz1_bTaiPRJLv8tbGPZSLIv0GJJ2XLzkc'

async function getDbSentances(){
    // const range = 'A:C'
    // const URL = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!${range}?key=${apiKey}`;
 
    // we can get data just by using the sheet name no need for indicating range
    const URL = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${SentancesSheet}?key=${apiKey}`;
    
    // console.log(URL);
    const response = await axios.get(URL);
    // console.log('thid is the response',response);
    console.log('get db sentances - headers',response.data.values[0]);
    return response; 

}

function App() {
    const [chartData,setChartData]=useState([['Phrases'],['מ-משפט']]);
    // TODO: add support for local storage
    
    const [sentances,setSentances]=useState([]);
    const headers = sentances.length===0 ? [] : sentances[0];
    const sentancesList = sentances.length===0 ? [] : sentances.slice(1);
    
    useEffect(()=>{
      var dbData;
      getDbSentances()
      .then((res)=>{
        dbData=res;
        console.log('dbData',dbData);
        setSentances(dbData.data.values);
      }); 
    },[])
    
    console.log('HEADERS',headers);
    return (
            <>
            {sentances.length!==0 &&
            <ThemeProviderV5 theme={themeV5}>
                <div className="App">
                    <SentancesTable headers={headers} sentancesList={sentancesList}/>
                    {/* <TreeChart 
                            chartData={chartData}
                            style={{width:'-moz-max-content', width: 'max-content'}}/>
                    <div dir='rtl' style={{paddingTop:'50px'}}>
                        <label htmlFor='sentance'> משפט: </label>
                        <input id='sentance' 
                                placeholder='חנה קנתה שימלה חדשה' 
                                disabled={true}/>
                        <CustomizedTreeView handleChartData={setChartData} />
                    </div> */}
                </div>
            </ThemeProviderV5>
            }
            </>
      );
}

export default App;
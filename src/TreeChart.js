import React from 'react';
import { Chart } from "react-google-charts";

export const data = 
    [ ['Phrases','size','value'],
      ['מ שצ ש חנה',1,1],
      ['מ צפ פ קנתה',1,2],
      ['מ צפ צש ש שמלה',1,3],
      ['מ צפ צש  צי מי עם',1,4],
      ['מ צפ צש צי ש נקודות',1,5],
      ['מ צפ צי מי ב',1,6],
      ['מ צפ צי ש עפולה',1,7],
      
      
    ];
// export const options = {
//     maxFontSize: 20,
//     wordtree: {
//         format: 'implicit',
//         word: 'מ-משפט',
//         colors: ['red','black','green']
//         }};

export const options = {
    maxFontSize: 20,
    colors: ['DarkRed','green','black'],
    backgroundColor: 'Cornsilk',
    wordtree: {
        format: 'implicit',
        word: 'מ-משפט',
        
    }
};

function TreeChart(props) {
    
    return ( 
        <div style={{display:'flex', flexDirection:'column',maxWidth:'50%' ,overflowY:'auto' }}>
            <h2 style={{width:'50%', textJustify:'initial'}}>Graph representation</h2>
            <Chart style={{overflowX: 'scroll'}}
                chartType="WordTree"
                data={props.chartData}
                options={options}
                width={"max-content"}
                height={"100%"}
            />
        </div>
     );
}

export default TreeChart;
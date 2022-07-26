
import * as React from 'react';
import PropTypes, { element } from 'prop-types';
import SvgIcon from '@mui/material/SvgIcon';
import { alpha, styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView'
import TreeItem, { treeItemClasses} from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
// web.cjs is required for IE11 support
import { useSpring, animated } from '@react-spring/web';
import './App.css';
import TreeItems from './TreeItems';
import {useState, useEffect} from 'react'
//start import for RTL
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
//end import for RTL
import { createTheme, ThemeProvider } from "@mui/material/styles";

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}


function CustomizedTreeView(props) {
  //states
  const initData = [{
    isEditMode : false,
    title: 'מ-משפט',
    nodeId: '1'
  }]

  const savedOrLocal = JSON.parse(window.localStorage.getItem('data')) || initData;   
  const [maxNodes, setMaxNodes] =useState(5);
  const [data, setData] = useState(savedOrLocal);
  const [selectedNodeId , setSelectedNodeId]=useState(0);
  const [editedNodeId , setEditedNodeId]=useState(0);
  var tempChartData;


  useEffect(() => {
    const strData = JSON.stringify(data);
    window.localStorage.setItem("data",strData);
    let newData = data;
    let path = '';
    tempChartData = [['Phrases']];  
    handleSetChartData(newData,path);
    console.log('useEffect - tempChartData',tempChartData);
    props.handleChartData(tempChartData);
    // console.log('useeffect - chartData',chartData);  
  }, [data]);

  
  const handleSetChartData = (data,path) =>{
   
    data.forEach((element,index)=>{
      console.log('getChartData - path: ',path);
      if (element.childNodes){
        handleSetChartData(element.childNodes,path.concat(" ",element.title))
      }else{
        const pathElement = [path.concat(" ➢ ",element.title)];
        console.log('handle... befor changing tempChartData - pathElement',pathElement);
        tempChartData = [...tempChartData,pathElement];
        console.log('handleSetChartData - tempChartData',tempChartData);
        
      }
      
    })
  }
 
  const handleSelectedNode = (e,ni)=>{
   console.log('app - handleSelectedNode-nodeId',ni);
    setSelectedNodeId(ni);
  }
  const toggleEditMode = (ni)=>{
    let editedNode = 0;
    console.log('current editedNodeId', editedNodeId);
    editedNode = ni; //in case of stop editing ni===0
    setEditedNodeId(editedNode);
    console.log('toggleEditedNode-editedNodeId',editedNodeId);
  }
  
  const replaceContent = (ni, newContent)=>{
    console.log('after replace content - newContent ',newContent);
    let newData = data;
    newData=replaceNodeContent(newData,ni,newContent);
    setData(newData);
    setEditedNodeId(0);
    console.log('after replace content-data: ',data);
  }

  const replaceNodeContent = (data,nodeId,newContent)=>{
    // console.log('insert node top - data: ',data);
    
    data.forEach((element,index) => {
      if(element.nodeId===nodeId){        
          console.log('toggle edit - foreach found - element: ',element);
          element.title=newContent;
          data[index]=element;
          console.log('toggle edit - data after change in data',data);

      }else{
        if(element.childNodes){
          replaceNodeContent(element.childNodes,nodeId,newContent);
        }
      }
    });
    console.log('toggle edit - before return - data: ',data);
    
    return data;
  }

  const insertNode = (data,nodeId,childObj)=>{
    // console.log('insert node top - data: ',data);
    data.forEach((element,index) => {
      if(element.nodeId===nodeId){
        console.log('foreach found - before push - element: ',element);
        // (element = (!element.childNodes) && {...element,childNodes : []}).childNodes.push(childObj);
        if (element.childNodes){
          element.childNodes.push(childObj)
        }else{
          element={...element,childNodes : [childObj]};
        }
          console.log('foreach found - after push - element: ',element);
          data[index]=element;
          console.log('data after push and add to data',data);
      }else{
        if(element.childNodes){
          insertNode(element.childNodes,nodeId,childObj);
        }
      }
    });
    console.log('insertnode = before return - data: ',data);
    return data;
  }
 
  const addNode = (ni,childValue)=>{
    // console.log(`app - addNode: ${ni}, ${childValue}`);
    
    const childObj = {
      isEditMode : false,
      title: childValue,
      nodeId: String(maxNodes + 1 ),
    }
    // console.log(insertNode(data,ni,childObj));
    let newData = [...data];

    newData=insertNode(newData,ni,childObj);
    console.log('app - addNode after insert- newData',newData);
    setData(newData);
    console.log('app - addNode after insert - data',data);
    setMaxNodes(maxNodes + 1)
    setEditedNodeId(0);
  }
  
    
//RTL support
const theme = createTheme({
  direction: "rtl" // Both here and <body dir="rtl">
});
// Create rtlcache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin]
});
function RTL(props){
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}  


  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl">

          <TreeView
            style={{overflowX: 'scroll',overflowY: 'scroll'}}
            onNodeSelect={handleSelectedNode}
            aria-label="customized"
            defaultExpanded={['1']}
            defaultCollapseIcon={<MinusSquare />}
            defaultExpandIcon={<PlusSquare />}
            defaultEndIcon={<CloseSquare />}
            sx={{ height: 600, flexGrow: 1, maxWidth: 600, overflowY: 'auto' ,paddingTop:'50px'}}
          >
            <TreeItems 
                        data={data} 
                        selectedNode={selectedNodeId}
                        handleAddNode={addNode}
                        handleToggleEdit={toggleEditMode}
                        editedNode={editedNodeId}
                        handleReplace={replaceContent}

                    /> 
          </TreeView>
        </div>
      </ThemeProvider>
    </CacheProvider>      
  );
}

export default CustomizedTreeView;

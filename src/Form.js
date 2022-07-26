import React, { useState } from 'react';
import {Chip,Divider, Paper,IconButton,FormControl,InputLabel, Select, MenuItem}  from '@mui/material'
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

const syntax = [
    {title: 'בחר רכיב', snodeId: '0'},
    {title: '(מ)משפט', snodeId: '1'},
    {title: 'צירוף-שמני(צש)', snodeId: '2'},
    {title: '(צפ)צירוף-פועלי', snodeId: '3'},
    {title: '(שע)שם-עצם', snodeId: '4'},
    {title: '(פ)פועל', snodeId: '5'},
    {title: '(צי)צירוף-יחס', snodeId: '6'},
    {title: '(מי)מילת-יחס', snodeId: '7'},
    {title: '(תהפ)תואר-הפועל', snodeId: '8'},
    
]

function Form(props) {
    const [syntaxItem, setSyntaxItem] =useState('בחר רכיב');
    const handleChange = (e)=>{
        setSyntaxItem(e.target.value);
        // props.handleAddNode(props.selectedNode,e.target.value)
    }
    const handleAddNode = ()=>{
        console.log(`form - handleAddNode: ${props.handleAddNode}`)
        props.handleAddNode(props.selectedNode,syntaxItem);
    }
    const handleReplace = ()=>{
        props.handleReplace(props.editedNode,syntaxItem);
    }

    return ( 
        <Paper>
            <form style={{display:'flex', alignItems:'flex-end' }}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id='syntax-select-label'>בחר רכיב</InputLabel>

                    <Select
                        labelId="syntax-select-label"
                        id="syntax-select"
                        value={syntaxItem}
                        label="syntax"
                        onChange={handleChange}
                        style={{marginTop : '20px', overflowY:'scroll'}}
                        fullWidth
                    >

                        {syntax.map((item,index) =>(
                            <MenuItem 
                                value={item.title}
                                key={index}
                            >{item.title}</MenuItem>
                        ))}
                        <Divider><Chip label='משפט'/></Divider>
                    </Select>
                </FormControl>
                <IconButton 
                    aria-label='replace'
                    onClick={handleReplace}    >
                    <PublishedWithChangesIcon/>
                </IconButton>
                
                <IconButton 
                    aria-label='add'
                    onClick={handleAddNode}    >
                    <SubdirectoryArrowRightIcon/>
                </IconButton>
                
                <IconButton aria-label='clear'>
                    <ClearIcon/>
                </IconButton>


            </form>
        </Paper>
     );
}

export default Form;
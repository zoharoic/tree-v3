import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import {Collapse, IconButton} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
// web.cjs is required for IE11 support
import { animated, useSpring } from "@react-spring/web";
import PropTypes  from "prop-types";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import Form from './Form'


function TransitionComponent(props) {
    // console.log(`transition ${props}`)
    const style = useSpring({
      from: {
        opacity: 0,
        transform: "translate3d(20px,0,0)"
      },
      to: {
        opacity: props.in ? 1 : 0,
        transform: `translate3d(${props.in ? 0 : 20}px,0,0)`
      }
    });
  
    return (
      <animated.div style={style}>
        <Collapse {...props} />
      </animated.div>
    );
  }
  
  TransitionComponent.propTypes = {
    /**
     * Show the component; triggers the enter or exit states
     */
    in: PropTypes.bool
  };
  
//   style={{display: 'flex', 
//                 flexDirection :'column', 
//                 alignItems:'flex-start',
//                 justifyContent: 'inherit',
//                 hight: '100%'}}>

// TODO: check what happens if the editedNodId === 0
const handleToggle= (e,props)=>{
    console.log('handleTogle - props.nodeId',props.nodeId);
    console.log('handleTogle - props.editedNode',props.editedNode);
    if (!props.nodeId || props.nodeId===0){
      return
    }else{
      if(props.nodeId===props.editedNode){
        return
      }else{
        props.handleToggleEdit(props.nodeId) ;
      }
    }
}

  const StyledTreeItem = styled((props) => (
    <>
    <div >
      
      <div style={{display: 'flex', 
                
                alignItems:'baseline',
                justifyContent: 'space-between',
                hight: '100%'}}>
        <TreeItem style={{width:'100%'}} {...props} TransitionComponent={TransitionComponent} />
      
        {(props.nodeId===props.editedNode) 
        && <Form 
              handleAddNode={props.handleAddNode}
              handleReplace={props.handleReplace}
              selectedNode={props.selectedNode}
              editedNode={props.editedNode}/>}

        {((props.nodeId===props.editedNode) || (props.nodeId===props.selectedNode))
         && <IconButton onClick={(e)=>(handleToggle(e,props))} 
                    aria-label='edit'
                    nodeId={props.nodeId}
                    editedNode={props.editedNode}
                    >
            <ModeEditIcon />
        </IconButton>}
      </div>
      
           
    </div>
    </>
  ))(({ theme }) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
      '& .close': {
        opacity: 0.3,
      },
    },
    [`& .${treeItemClasses.group}`]: {
      marginLeft: 15,
      paddingLeft: 18,
      borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
  }));
  
  export default function TreeItems(props){
    // console.log(`treeitems - selected node: ${props.selectedNode}`)
    
    return(
    <div style={{display: 'flex', flexDirection: "column" }}>  
      {props.data.map((item,index) => (
        <>
        <StyledTreeItem
          
          nodeId={item.nodeId}
          key={item.nodeId} 
          label={item.title} 
          selectedNode={props.selectedNode}
          handleAddNode={props.handleAddNode}
          handleToggleEdit={props.handleToggleEdit}
          isEditNode = {item.isEditMode}
          editedNode={props.editedNode}
          handleReplace={props.handleReplace}
        >
          {item.childNodes && <TreeItems 
                                data={item.childNodes} 
                                selectedNode={props.selectedNode} 
                                handleToggleEdit={props.handleToggleEdit}
                                handleAddNode={props.handleAddNode}
                                handleReplace={props.handleReplace}
                                editedNode={props.editedNode}/>
          }
          
        </StyledTreeItem>
        
         </>
      ))}
     

    </div>
    )
  }
  
// source: https://codesandbox.io/s/1pmwj?file=/src/App.tsx
import React from 'react';
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
// import PersonAddIcon from "@mui/icons-materialPersonAdd";
import AppBar from "@mui/material/AppBar";
import { DataGrid } from '@mui/x-data-grid';
import {v4 as uuid} from 'uuid';

// const columns = [
//   { field: "id", headerName: "ID", width: 90 },
//   {
//     field: "sentance",
//     headerName: "sentance",
//     width: 500,
//     editable: false
//   },
//   {
//     field: "status",
//     headerName: "status",
//     width: 150,
//     editable: false
//   }
  
// ];
// const rows = [
//   {id:1, sentance: "שלומית קנתה שמלה עם נקודות בעפולה", status: 'complete'},
//   {id:2, sentance: "ילדים חורגים סורגים", status: 'at-work'},
//   {id:3, sentance: "אם אני לי אתה לי", status: 'complete'},
//   {id:4, sentance: "חשוב ללמוד פתגמים בצורה מדוייקת", status: 'complete'},
   
// ]

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2)
  },
  content: {
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  }
}));

function SentancesTable(props) {
  const rows = props.sentancesList.map((row,index)=>({id: parseInt(row[0]), sentance: row[1], status: row[2]}));
  
  const columns = props.headers.map(((col,index)=>
                ({field: col, 
                  headerName: col,
                  width: col==='sentance' ? 500 : 100,

                })));
  const classes = useStyles();  
  console.log('SentancesTable - cols',columns);
  console.log('SentancesTable - rows',rows);
  // getRowId={(row)=>row.id}
  return (
      <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            My App
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper className={classes.content}>
        <div className={classes.toolbar}>
          <Typography variant="h6" component="h2" color="primary">
            Sentances
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            
          >
            New Sentance
          </Button>
        </div>
        <div style={{ height: 300, width: "100%" }}>
          <DataGrid getRowId={()=>uuid()} rows={rows} columns={columns} checkboxSelection />
        </div>
      </Paper>
    </div>  
 
      );
}

export default SentancesTable;
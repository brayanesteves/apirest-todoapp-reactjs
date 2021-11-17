import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container ,Paper,Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
}));

export default function Items() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[task,setTask]=useState('')
    const[description,setDescription]=useState('')
    const[items,setItems]=useState([])
    const classes = useStyles();

    const handleClick=(e)=>{
        e.preventDefault()
        const student={task, description}
        console.log(student)
        fetch("http://localhost:8080/todo/new",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(student)

        }).then(()=>{
            console.log("New task")
        })
    }

useEffect(()=>{
  fetch("http://localhost:8080/todo/")
  .then(res=>res.json())
  .then((result)=>{
    setItems(result);
  }
)
},[])
  return (

    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blue"}}><u>Add Item</u></h1>

    <form className={classes.root} noValidate autoComplete="off">
        
      <TextField id="outlined-basic" label="Task" variant="outlined" fullWidth 
      value={task}
      onChange={(e)=>setTask(e.target.value)}
      />
      <TextField id="outlined-basic" label="Description" variant="outlined" fullWidth
      value={description}
      onChange={(e)=>setDescription(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={handleClick}>Add</Button>
    </form>
   
    </Paper>
    <h1>Items</h1>
    
    <Paper elevation={3} style={paperStyle}>

        <table>
            <thead>
                <th>#</th>
                <th>Task</th>
                <th>Description</th>      
                <th>Condition</th>
                <th>Action</th>       
            </thead>
            <tbody>
            {items.map(student=>(
            
            <tr>
                <td>{student.rfrnc}</td>
                <td>{student.task}</td>
                <td>{student.description}</td>
                <td>{student.cndtn}</td>    
            </tr>
            ))
            }      
        </tbody>       
        </table>
    </Paper>
    </Container>
  );
}
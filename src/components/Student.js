import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Container, Paper, Button } from "@material-ui/core";
import { FilterFramesOutlined } from "@material-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";
import '../App.css';
import Appbar from './Appbar'

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Student() {
  const paperStyle = { padding: "60px 20px", width: 600, margin: "100px auto",backgroundColor: 'white' };
  const [name, setName] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [students, setStudents] = useState([]);
  const { loginWithRedirect } = useAuth0();
  const classes = useStyles();

  const handleClick = (e) => {
    loginWithRedirect();

    const student = { name, phonenumber };
    console.log(student);
    //   fetch("http://localhost:8080/student/add",{
    //     method:"POST",
    //     headers:{"Content-Type":"application/json"},
    //     body:JSON.stringify(student)

    // }).then(()=>{
    //   console.log("New Student added")
    // })
  };

  // useEffect(()=>{
  //   fetch("http://localhost:8080/student/getAll")
  //   .then(res=>res.json())
  //   .then((result)=>{
  //     setStudents(result);
  //   }
  // )
  // },[])
  return (
    <div style={{
        backgroundColor: 'grey'
        
      }}>

    

    <br></br>

    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <Container >  
      
      {/* <Appbar/> */}
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue" }}>
          <u>MULTI-FACTOR AUTHENTICATION</u>
        </h1>

        

        <form className={classes.root} noValidate autoComplete="off">
          {/* <TextField id="outlined-basic" label="enter username" variant="outlined" fullWidth 
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
      <TextField id="outlined-basic" label="enter your password" variant="outlined" fullWidth
      value={phonenumber}
      onChange={(e)=>setPhonenumber(e.target.value)}
      /> */}
          <Button variant="contained" color="secondary" onClick={handleClick}>
            LOGIN
          </Button>
        </form>
      </Paper>
      {/* <h1>Students</h1> */}

      {/* <Paper elevation={3} style={paperStyle}>

      {students.map(student=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={student.id}>
         Id:{student.id}<br/>
         Name:{student.name}<br/>
         Phonenumber:{student.phonenumber}
        </Paper>
      ))
    
    

}

    </Paper> */}
    </Container>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>




    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>

    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>


    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    
   


     </div>
  );
}

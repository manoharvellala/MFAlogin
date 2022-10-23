import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Container, Paper, Button } from "@material-ui/core";
import { FilterFramesOutlined } from "@material-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
let randomOtp = Math.random().toString().substr(2, 6);
let message = randomOtp;



function updateDatabase(gmail, phoneNumber, boolValue, databaseList, navigate) {
  // find the id in which you want to update the phonenumber of the user
  let primaryId = null;
  for (let i = 0; i < databaseList.length; i++) {
    let eachRow = databaseList[i];
    if (eachRow["name"] === gmail) {
      // we have found the match
      primaryId = eachRow["id"];
      break;
    }
  }
  let phonenumber = phoneNumber;

  let name = gmail;
  let booleanValue = boolValue;

  var rowDetails = {
    id: primaryId,
    name: gmail,
    phonenumber: phoneNumber,
    booleanValue: boolValue,
  };
  console.log(phoneNumber);

  fetch(`http://localhost:8080/student/${primaryId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rowDetails),
  }).then(() => {
    console.log("database updated");
  });

  navigate("/loggedin");
}

function Details() {
  const paperStyle = { padding: "50px 20px", width: 400, margin: "20px auto" };
  const [phoneNumber, setName] = useState("");
  let  [otp, setOtp] = useState("");
  const { user, isAuthenticated, isLoading } = useAuth0();
  const classes = useStyles();
  let [students, setStudents] = useState([]);
  const navigate = useNavigate();
  
  

  

  useEffect(() => {
    fetch("http://localhost:8080/student/getAll")
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      });
  }, []);
  const handleClick = (e) => {
    console.log("in handle click")
    if (randomOtp===otp)
    {
    //students variable has the details of the database get the id which you are
    //interested and update the value of the phone number as well as boolean value
      updateDatabase(user.name, phoneNumber, true, students, navigate);
    }
    else{
      alert("wrong otp")
    }
    
  };
  const handleOtp = (e) => {
    
    const data = { phoneNumber, message };
    fetch("http://localhost:8080/api/v1/sms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      console.log("succesfully");
    });
    // have a check to verify the entered otp matched with the random otp ,if matches i will call this updatefunction
    
  };

  return (
    <div style={{ backgroundColor: 'grey'}}>
      <br></br>

      <br></br>
      <br></br>
      <br></br>

      <br></br>
      <br></br>
      <div style={{ marginTop: "100px" }}>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
      </div>
      <Container id="c">
      <Paper style={paperStyle}>
        <TextField
          id="outlined-basic"
          placeholder="enter your number"
          variant="outlined"
          value={phoneNumber}
          onChange={(e) => setName(e.target.value)}
        />
        <br></br>
        <br></br>
        <TextField
          id="outlined-basic"
          placeholder="enter the otp"
          variant="outlined"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <br></br>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOtp}
          style={{ marginLeft: "20px", marginTop: "10px" }}
        >
          SEND OTP
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClick}
          style={{ marginLeft: "20px", marginTop: "10px" }}
        >
          UPDATE
        </Button>
        </Paper>
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
    </div>
  );
}

export default Details;

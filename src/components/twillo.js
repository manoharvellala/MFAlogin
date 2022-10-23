import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { Container, Paper, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

// generate OTP button handler
let randomOtp = Math.random().toString().substr(2, 6);

//still have to use parms to getvalue here

let message = randomOtp;
console.log(message)
// const parms = useParams();
// console.log("phoneNumber:",parms["phoneNumber"])
// let phoneNumber = parms["phoneNumber"];

const Twillio = () => {
  const [enteredOtp, setFirst] = useState("");
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };

  const navigate = useNavigate();
  const classes = useStyles();
  const location = useLocation();
  let phoneNumber = location.state.name;
  const data = { phoneNumber, message };

  const handleClick = (e) => {
    window.location.reload();
  };
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/sms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      console.log("succesfully");
    });
  }, []);

  // final form submit handler
  const handleSubmit = (event) => {
    // 👇️ prevent page refresh
    event.preventDefault();

    console.log("form submitted ");
    //validate otp here
    console.log(event);
    if (enteredOtp === randomOtp) {
      navigate("/loggedin");
    } else {
      alert("Sorry wrong otp");
    }
  };

  return (
    <div style={{ backgroundColor: 'grey'}}>
    
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
      <Container>
        <Paper elevation={3} style={paperStyle}>
          <h1 style={{ color: "blue" }}>
            <u>OTP AUTHENTICATION</u>
          </h1>

          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Button variant="contained" color="secondary" onClick={handleClick}>
              RESEND OTP
            </Button>
            <br></br>
            <br></br>
            <input
              type="text"
              id="OTP"
              width={200}
              height="30%"
              name="OTP"
              value={enteredOtp}
              onChange={(event) => setFirst(event.target.value)}
            />
            <Button type="submit" variant="contained" color="secondary">
              SUBMIT
            </Button>
          </form>
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
    <br></br>
    <br></br>
   
    

    

    

    </div>
  );
};

export default Twillio;

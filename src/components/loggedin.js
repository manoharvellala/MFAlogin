import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { Container, Paper, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth0 } from "@auth0/auth0-react";


//function to update database on turning off the switch
function updateDatabase(gmail, phoneNumber, boolValue, databaseList) {
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


}

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
function updateToggleValue(students, gmail) {
  console.log("students list :", students);
  console.log(gmail, 'gmail');

  for (let i = 0; i < students.length; i++) {
    let eachRow = students[i];
    if (eachRow.name == gmail) {
      console.log("boolean value=", eachRow.booleanValue);
      return eachRow.booleanValue;
    }
  }
  console.log("boolean value returned false")
  return false;
}

const Login = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [toggleValue, setNewsletter] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/student/getAll")
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      });
  }, []);

  useEffect(() => {
    if (students.length) {
      setNewsletter(updateToggleValue(students, user.name) === "true")
    }
  },[students])


  let switchValue = updateToggleValue(students, user.name);
  console.log("result is:", switchValue);

  const onNewsletterChange = (event) => {
    setNewsletter(event.target.checked);
    console.log(toggleValue, "toggleValue inside event")
    if (!toggleValue == true) {
      console.log("the switch is on")
      navigate("/details");
    }
    
    else{
      console.log("the switch is off")
      
      updateDatabase(user.name, "", false, students)
    }


  };

  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const classes = useStyles();
  return (
    <div className="text-center hero my-5" style={{
      backgroundColor: 'grey'
      
    }}>
    <br>
    </br>
    <br>
    </br>
    <br>
    </br>
    <br>
    </br>
    <br>
    </br>
    <br>
    </br>
    <br>
    </br>
    <br>
    </br>
  
    

      <Container>
        <Paper elevation={3} style={paperStyle}>
          <h1 style={{ color: "blue" }}>
            <u>Welcome</u>
          </h1>
          <div style={{ marginTop: "100px" }}>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
          </div>

          <form className={classes.root} noValidate autoComplete="off">
            <br></br>
            <br></br>
            <h3 className="lead">You have logged in successfully.</h3>
            <br></br>
            <br></br>

            <h4>
              Enable Multi-Factor Authentication
              <br></br>
              <label class="switch">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={toggleValue}
                  onChange={onNewsletterChange}
                />

                <span class="slider round"></span>
              </label>
            </h4>

            <Button type="submit" variant="contained" color="secondary">
              <a href="/">LOGOUT</a>
            </Button>
          </form>
        </Paper>
      </Container>
      <br>
    </br>
  
    <br>
    </br>
    <br>
    </br>
  
    </div>
  );
};

export default Login;

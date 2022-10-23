import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Container, Paper, Button } from "@material-ui/core";
import { FilterFramesOutlined } from "@material-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function checkStatus(username, databaseList, navigate) {
  console.log("databse:", databaseList);

  for (let i = 0; i < databaseList.length; i++) {
    let eachRow = databaseList[i];

    if (eachRow["name"] === username && eachRow["booleanValue"] === "false") {
      // the user does't need multifactor authnication
      console.log("found match");
      navigate("/loggedin");
      return true;
    }
    // check if he is an existing user who has turned on  multifactor
    if (eachRow["name"] === username && eachRow["booleanValue"] === "true") {
      console.log("twillo required");
      let phoneNumber = eachRow["phonenumber"];
      console.log(phoneNumber,"this is in twilio page")
      // navigate(`/twillo/${phoneNumber}`);
      navigate(`/twillo`,{state:{id:1,name:`${phoneNumber}`}});
      return true;
    }
  }
  console.log(username);
  return false;
}

const ContactUs = () => {
  const paperStyle = {  padding: "60px 20px", width: 600, margin: "30px auto",backgroundColor: 'white' };
  const navigate = useNavigate();
  let [name, setName] = useState("");

  let [students, setStudents] = useState([]);
  let { loginWithRedirect } = useAuth0();

  const { user, isAuthenticated, isLoading } = useAuth0();
  function handleClick() {
    
    console.log("students array", students, user);
    //if the user name is in the database and he does't want multifactor authonication
    //just redirect to the final sign in page
    if (checkStatus(user.name, students, navigate) === false) {
      //At this phase the user has signed up for the first time
      //Add his details to the database and redirect him to the final page

      console.log("this code should never execute");
      let name=user.name;
      let phonenumber="";
      let booleanValue="false"
      const student = { booleanValue,name, phonenumber };
      console.log(student);
      fetch("http://localhost:8080/student/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      }).then(() => {
        console.log("New Student added");
      });
      navigate("/loggedin");
    }
    
  };

  useEffect(() => {
    fetch("http://localhost:8080/student/getAll")
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      });
  }, []);
  
  useEffect(() => {
    if (students.length && user) {
      
      handleClick()
    }
    
  }, [students, user]);
 
  return (
    isAuthenticated && (
      <div style={{
        backgroundColor: 'grey'
        
      }}>
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
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
           
          <h3>Your credentials have been verified by Auth0</h3>
          
            <form>
              <Button
                variant="contained"
                color="secondary"
                //onClick={handleClick}
              >
                click here to continue
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

        <br></br>

        <br></br>
        <br></br>

        <br></br>
        <br></br>
        <br></br>

        <br></br>
        <br></br>
      </div>
    )
  );
};

export default ContactUs;
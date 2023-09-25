// src/LoginForm.js
import React, { useState } from 'react';
import './App.css'
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



// const useStyles = makeStyles((theme) => ({
//     marginTop: {
//       marginTop: '30px',
//     },
//   }));

const Loginform = () => {

    // const classes = useStyles();

    const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
       
     const data =
     {
        UserName : email,
        Password : password

  };

    axios.post('http://localhost:8000/api/user',data)
      .then((response)=>{
          console.log('res',response.data);

          const {message} = response.data;
           
          console.log('msg',message)

          if (message === 'Login successful')
          {
              navigate('/email');
              alert('Login Successfully')
          }
          else
          {
             alert('Login Failed')
          }


      })

    }

  return (
    <Container maxWidth="xs">
    <Box
      sx={{
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)', // Add your desired shadow here
        borderRadius: '8px', // Optional: Add some border radius for rounded corners
        padding: '16px',marginTop:'200px' // Optional: Add padding for space around the form
      }}
    >
      <form className='margin' onSubmit={handleSubmit}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          size='small'
          fullWidth
          margin="normal"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          size='small'
          fullWidth
          margin="normal"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button  size='small' variant="contained" color="primary" fullWidth type="submit">
          Log In
        </Button>
      </form>
    </Box>
  </Container>
  
  );
};

export default Loginform;

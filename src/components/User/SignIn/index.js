import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid'


import { makeStyles } from '@material-ui/styles';
import { withFirebase } from '../../Firebase';
import { compose } from 'recompose';
import { Typography } from '@material-ui/core';


import SingleLineError from '../../Error'

const useStyles = makeStyles(theme => ({
  dialogTitle:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center"
  },
  icon:{
    float:"right"
  },
  returningCustomerText:{
    marginTop:25,
  },
  signInButton:{
    height:47,
    width:80,
    marginTop:20,
    color: '#FFFFFF',
    backgroundColor: '#00B4F4',
    borderRadius:0,
    '&:hover':{
      backgroundColor: '#D6D6D6'
    }
  },
  errorPaper:{
    borderRadius:0,
    backgroundColor: '#FFBDBD',
    height:70
  },
  errorText:{
    align:"center"
  },
  link:{
    color: '#000000',
    textDecoration: "none",
    '&:hover':{
      color: '#00B4F4',
      textDecoration: "none",
    }
  }
}));


const SignIn = (props) => {

  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const onSubmit = event => {
    props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => props.history.push('/account'))
      .catch(error => setError("Incorrect email or password"));
      
      
    
    event.preventDefault();
    
  }

  return(
    <React.Fragment>
      <div className="Container">

    <Grid container justify="center" alignItems="center" className={classes.returningCustomerText}>
 
      <Grid item xs={6}>
      <div className={classes.returningCustomerText}>
          <Typography variant="h5" >Customer Login</Typography>
        </div>
        
        <form onSubmit={onSubmit}>
          <SingleLineError error={error}/>

          <TextField
              autoFocus          
              margin="normal"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              label="Email Address"
              type="email"
              required
              fullWidth
            />
            <TextField
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              margin="normal"
              id="passwordOne"
              label="Password"
              type="password"
              required
              fullWidth
            />
            <Button type="submit" className={classes.signInButton}>
              Sign In
            </Button>
            {error && <p>{error.message}</p>}
        </form>
        <Typography className={classes.returningCustomerText} >
            <Link to={'/register'} className={classes.link}>
              Register for an account
            </Link>                 
        </Typography>       
      </Grid>
        <Grid item xs={3}>
        </Grid>
    </Grid>
            
    </div>
    </React.Fragment>
  );

}


export default compose(withFirebase)(SignIn);


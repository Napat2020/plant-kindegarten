import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

import Git from "./Octocat.png";



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
    margin:0,
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



const About = (props) => {

  const classes = useStyles();

  return(
    <React.Fragment>
    <div className="has-text-centered">
      <section class="hero is-dark">
        <div className="container">
        <img src={Git} alt="logo" height="400px" width="400px"/>
          <h1 className="title">Github Link for Project</h1>
          <a href="https://github.com/Napat2020/plant-kindegarten.git"><h1 className="is-size-1">Github</h1></a>
          <h2>Created by Napat Olanwichitwong</h2>
        </div>
      </section>
    </div>
    </React.Fragment>
  );

}


export default About;
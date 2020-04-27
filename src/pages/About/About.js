import React, { Component } from 'react'
import classes from "./About.css";

export default class About extends Component {
  render() {
    return (
      <div className={classes.Container}>
        <h1>Github Link for Project</h1>
        <a href="https://github.com/hemanshuEng/react-ecommerce"><h1>Github</h1></a>
        <h2>Created by Napat Olanwichitwong</h2>
      </div>
    )
  }
}

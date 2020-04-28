import React from 'react'
import Git from "./Octocat.png";

export default () => (
  <div className="has-text-centered">
    <section class="hero is-light">
      <div className="container">
      <img src={Git} alt="logo" height="400px" width="400px"/>
        <h1 className="title">Github Link for Project</h1>
        <a href="https://github.com/Napat2020/plant-kindegarten.git"><h1 className="is-size-1">Github</h1></a>
        <h2>Created by Napat Olanwichitwong</h2>
      </div>
    </section>
  </div>
)

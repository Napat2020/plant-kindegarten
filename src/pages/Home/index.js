import React from 'react';
import './Home.css';
import Homepix from "./homepix.jpg";
import { NavLink } from 'react-router-dom';

export default () => (
  <div className="has-text-centered">
    <section class="is-fullheight-with-navbar is-light">
        {/* <div className="Container"> */}
        <div className="Container">
        <img src={Homepix} alt="home" className="Img" />
          <div className="Overlay" />
          <div className="Headding">
            <h1 className="Title">
            A beautiful plant is like having a friend around the house
            </h1>
            <NavLink to="/marketplace"><button className="Btn"> shop now</button></NavLink>
          
          </div>
        </div>
         
          {/* </div> */}
{/*         
        <h1 className="title">Home Page</h1>
        <h2 className="page-title">ทำ Routing ให้กับ React ด้วย React Router v4</h2>
        <p className="button button-large is-primary"><a href="https://devahoy.com/posts/basic-web-with-react-router-v4/" target="_blank">อ่านบทความ</a></p> */}
    </section>
  </div>
)

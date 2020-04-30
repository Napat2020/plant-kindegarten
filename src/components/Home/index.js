import React  from 'react';
import { NavLink } from 'react-router-dom';
import "./Home.css";
import Background from './homepix.jpg';

// const useStyles = makeStyles(theme => ({
//   bg:{
//     width:'100%',
//     height:900,
//     backgroundImage:`url(${Background})`,
//     backgroundSize:'1300px 900px',
//   },
// }));

const Home = props => {
  return(
    
    <div className="has-text-centered">
              
    <section class="hero is-fullheight-with-navbar is-white">
        <div className="container1">
        <img src={Background} alt="home" className="Img" />
          <div className="Headding">
            <h1 className="Title">
            A beautiful plant is like having a friend around the house
            </h1>
            <NavLink to="/login"><button className="Btn"> shop now</button></NavLink>
          </div>
        </div>   
    </section>
  </div>
  )
}

export default Home;
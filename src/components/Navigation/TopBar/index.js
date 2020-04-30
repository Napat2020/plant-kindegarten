
import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import CartDrawer from '../../Cart'

import { withAuthentication, withAuthorization, AuthUserContext } from '../../Session';
import ToolbarUserButton from './ToolbarUserButton'

import { NavLink } from 'react-router-dom'



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width:"100%",
    backgroundColor:"#EBEBEB"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolBar:{
    minHeight:36,
    margin:0,
    spacing:0,
    padding:0,
  },
  appBar:{
    width:`calc(100% - 300px)`,
    height:36,
    marginLeft:300,
    marginTop:0,
    backgroundColor:'#BBBBBB'
  },
  title: {
    flexGrow: 1,

  },
  tempDrawerPaper:{
    width:240,
    marginLeft:240,
    marginTop:65
  },
  drawer:{
    width:240,
    flexShrink:0,
  },
  drawerPaper:{
    marginTop:120,
    width:240
  },
  content: {
    marginLeft:240,
    flexGrow: 1,
    backgroundColor:"#EBEBEB",
    padding: theme.spacing(1),
  },
  modal: {
    marginLeft: 150,
    disableBackdropClick: true,
    hideBackdrop:true,
    disableEscapeKeyDown:false
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },

  toolbarIcon:{
    color: '#FFFFFF'
  },

  toolbarButton:{
    height:"100%",
    minWidth:45,
    width:50,
    margin:0,
    color: '#FFFFFF',
    borderRadius:0,
    '&:hover':{
      backgroundColor: '#D6D6D6'
    }
  },
  cartButton:{
    height:"100%",
    width:100,
    margin:0,
    color: '#FFFFFF',
    backgroundColor: '#00B4F4',
    borderRadius:0,
    '&:hover':{
      backgroundColor: '#D6D6D6'
    }
  },
  userProfilePopper:{
    backgroundColor: '#BBBBBB',
    borderRadius:0,
    margin:0,
    spacing:0,
    padding:0,
  },
  userProfilePopperButton:{
    height: 40,
    width: 150,
    align: 'left',
    color: '#FFFFFF',
    borderRadius:0,
    '&:hover':{
      backgroundColor: '#D6D6D6'
    }
  },
  userProfileMenuList:{
    margin:0,
    padding:0,
    spacing:0,
  }
}));


const TopBar = withAuthentication((props) => {
  const classes = useStyles();
  
  const [cartOpen, setCartOpen] = React.useState(false);

  const cartEl = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClick, false);
  
    return () => {
      document.removeEventListener('mouseDown', handleClick, false);
    }
  }, [])

  const handleClick = (e) => {
    if(!cartEl.current.contains(e.target)){
      setCartOpen(false);
    }
  }

  return(
    <React.Fragment>
      <div ref={cartEl}>
        <CartDrawer open={cartOpen}/>
      </div>
        <div className="my-app">
        <nav className="navbar is-light" role="navigation" aria-label="main navigation">
          <div className="container">
   
            <div className="navbar-menu is-active">
              <div className="navbar-end">
                <NavLink exact to="/" activeClassName="is-active" className="navbar-item"><i class="fas fa-home"></i>Home</NavLink>
                {/* <NavLink to="/marketplace" activeClassName="is-active" className="navbar-item"><i class="fas fa-shopping-cart"></i>Marketplace</NavLink> */}
                <NavLink to="/about" activeClassName="is-active" className="navbar-item"><i class="fas fa-info-circle"></i>About</NavLink>
                {/* <NavLink to="/login" activeClassName="is-active" className="navbar-item"><i class="fas fa-sign-in-alt"></i>Login</NavLink> */}
                
                <AuthUserContext.Consumer>
                  {authUser => <ToolbarUserButton authUser={authUser} firebase={props.firebase}/>} 
                </AuthUserContext.Consumer>

                <Button className={classes.cartButton} elevation={0} onClick={(e) => {setCartOpen(true)}}>
                  <ShoppingCartOutlinedIcon/>
                </Button> 

              </div>
            </div>
          </div>
        </nav>
      </div>
    </React.Fragment>

  );

})

export default TopBar;

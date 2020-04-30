
import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


import Button from '@material-ui/core/Button';


// icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


import { MenuItem } from '@material-ui/core';

import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList'

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
    width:`calc(100% - 225px)`,
    height:36,
    marginLeft:225,
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
    color: '#000000',
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



const ToolbarUserButton = props => {

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef(null);
  const paperRef = React.useRef(null);


  const handleMouseOver = (e) => {
    // open poper on hover
    if(!!buttonRef.current && !open && buttonRef.current.contains(e.target)) {
      setOpen(true);
    }
    // close poper on hover out
    else if(!!paperRef.current && !paperRef.current.contains(e.target)){
      setOpen(false);
    }
  }

  useEffect(() => {

    document.addEventListener('mouseover', handleMouseOver, false);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver, false);
    }

  }, [])
  
  const openPopper = () => {
    setOpen(true);
  }


  // If the there is authenticated user show drop down menu on mouse over
  if(props.authUser)
    return(
      <React.Fragment>
        <Button ref = {buttonRef} className={classes.toolbarButton} onClick={() => {openPopper()}}>
          <AccountCircleIcon/>
        </Button>
        <Popper ref = {paperRef} open={open} anchorEl={buttonRef.current} placement='bottom-end'>
          <Paper  className={classes.userProfilePopper} elevation={0}>
            <MenuList className={classes.userProfileMenuList}>
              <MenuItem component={Link} to={'/account'} className={classes.userProfilePopperButton}>
                Your account
              </MenuItem>
              <MenuItem onClick={props.firebase.doSignOut} className={classes.userProfilePopperButton}>
                Log out
              </MenuItem>
            </MenuList>
          </Paper>
        </Popper>

      </React.Fragment>
    );


  return(
    <NavLink to="/login" activeClassName="is-active" className="navbar-item"><i class="fas fa-sign-in-alt"></i>Login</NavLink>
  );

}

export default ToolbarUserButton;
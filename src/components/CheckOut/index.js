import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SingleLineError from '../Error'
import {withFirebase} from '../Firebase'
import {compose} from 'recompose'
import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import NullImage from '../Product/No-Image-Available.jpg';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import { CardMedia, Card, CardContent, CardActions } from '@material-ui/core'

import Button from '@material-ui/core/Button';
import { withAuthentication, AuthUserContext } from '../Session';
import './CheckOut.css';

const useStyles = makeStyles({
  grid:{
    margin:10,
    padding:10,
    marginLeft:30,
  },
  paper: {
    marginLeft:40,
    width: '100%',
    backgroundColor: "rgba(0,0,0,0)",
  },
  fullList: {
    width: 'auto',
  },
  title:{
    marginTop:20,
  },
  cartButton:{
    marginTop:20,
    height:47,
    width:'100%',
    color: '#FFFFFF',
    float:'center',
    backgroundColor: '#00B4F4',
    borderRadius:0,
    '&:hover':{
      backgroundColor: '#D6D6D6'
    }
  },
});


const CheckOutView = compose(withAuthentication, withFirebase)((props) => {

  return(
   <AuthUserContext.Consumer>
     {authUser => <CheckOutViewBase authUser={authUser} firebase={props.firebase} history={props.history}/>}
   </AuthUserContext.Consumer>
  )
})

const CheckOutViewBase = (props) => {
  const classes = useStyles();
  const storageRef = props.firebase.storage;
  const [total, setTotal] = React.useState(0);
  const [products, setProducts] = React.useState([]);

  const [email, setEmail ]                    = useState('');
  const [userFirstName, setUserFirstName     ] = useState('');
  const [userLastName,  setUserLastName      ] = useState('')
  const [addressOne,    setAddressOne       ] = useState('');
  const [addressTwo,    setAddressTwo       ] = useState('');
  const [city,          setCity             ] = useState('');
  const [country,       setCountry          ] = useState('');
  const [code,          setCode             ] = useState('');
  const [phone,         setPhone            ] = useState('');
  const [errors, setErorrs] = useState([]);

  useEffect(() => {
    setEmail        (!!props.authUser && !!props.authUser.email         ? props.authUser.email          : '')
    setUserFirstName(!!props.authUser && !!props.authUser.userFirstName ? props.authUser.userFirstName  : '') 
    setUserLastName (!!props.authUser && !!props.authUser.userLastName  ? props.authUser.userLastName   : '') 
    setAddressOne   (!!props.authUser && !!props.authUser.addressOne    ? props.authUser.addressOne     : '') 
    setAddressTwo   (!!props.authUser && !!props.authUser.addressTwo    ? props.authUser.addressTwo     : '') 
    setCity         (!!props.authUser && !!props.authUser.city          ? props.authUser.city           : '') 
    setCountry      (!!props.authUser && !!props.authUser.country       ? props.authUser.country        : '') 
    setCode         (!!props.authUser && !!props.authUser.code          ? props.authUser.code           : '') 
    setPhone        (!!props.authUser && !!props.authUser.phone         ? props.authUser.phone          : '') 

  }, [])

 useEffect(() => {
    if(!!localStorage.getItem('cart')){

      let obj = JSON.parse(localStorage.getItem('cart'));

      setTotal(0);
      setProducts([]);

      if(!!obj) {
        obj.forEach( e => {
          if(!!e.key)
            props.firebase.products().child(e.key).once('value', (snapshot) => {
              if(snapshot.exists()) {     
                      
                  // Try to get url from the storage
                  storageRef.ref().child(snapshot.val().previewImage).getDownloadURL().then( (url) => { 

                    let element = {...snapshot.val(), imageRef:url, key:snapshot.key}
                    
                    console.log(element.imageRef);
                    if(element.isPublic) {
                      setTotal(t => (+t + +element.price));
                      setProducts(a => [...a, element])
                    }                
                    // if it fails set the url to the default image
                  }).catch(err => {

                    let element = {...snapshot.val(), imageRef:NullImage, key:snapshot.key}
                    console.log(element.imageRef);
                    if(element.isPublic) {
                      setTotal(t => t + element.price);
                      setProducts(a => [...a, element])
                    }
                  })
              }
            });
          })
      }
    }
  }, [])

  const onSubmit = event => {

    let user = {
        email,
        userFirstName,
        userLastName,
        addressOne,
        addressTwo,
        city,
        country,
        code,
        phone,
    }
    
    props.firebase.createOrder(JSON.parse(localStorage.getItem('cart')), user)
      .catch((err) => {
        console.log(err)
      })


    localStorage.setItem('cart', JSON.stringify([]));
    props.history.push('/');
    event.preventDefault();
    
  }
  
  return(
    <React.Fragment>
      <div className="Container">

<Grid container className={classes.returningCustomerText}>

  <Grid item xs={1}>
    <div className={classes.returningCustomerText}>
    </div>     
  </Grid>

  <Grid item xs={4}> 
  <Typography className={classes.title} variant="h5" >Check Out</Typography>    
    <form onSubmit={onSubmit}>     
      {!!errors && errors.map((err, id) => {
        return(<SingleLineError key={id} error={err}/>)
      })}      
      <Grid container spacing={0}>
      <TextField
          autoFocus          
          margin="normal"
          name="addressOne"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="addressOne"
          label="E-mail"
          type="email"
          required
          fullWidth
        />
        <Grid item xs={6}>

        <TextField
          name="firstName"
          value={userFirstName}
          onChange={(e) => setUserFirstName(e.target.value)}
          type="text"
          autoFocus          
          id="firstName"
          label="First Name"
          required
          fullWidth

        />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="lastname"
            value={userLastName}
            onChange={(e) => setUserLastName(e.target.value)}
            type="text"
            autoFocus          
            id="lastname"
            label="Last Name"
            required
            fullWidth
          />
        </Grid>
      </Grid>
      <TextField
          autoFocus          
          margin="normal"
          name="addressOne"
          value={addressOne}
          onChange={(e) => setAddressOne(e.target.value)}
          id="addressOne"
          label="Address 1"
          type="text"
          required
          fullWidth
        />
        <TextField
          name="addressTwo"
          value={addressTwo}
          onChange={(e) => setAddressTwo(e.target.value)}
          autoFocus
          margin="normal"
          id="addressTwo"
          label="Address 2"
          type="text"
          required
          fullWidth
        />
        <TextField
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          autoFocus
          margin="normal"
          id="city"
          label="City"
          type="text"
          required
          fullWidth
        />
        <TextField
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          autoFocus
          margin="normal"
          id="country"
          label="Country"
          type="text"
          required
          fullWidth
        />
         <TextField
          name="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoFocus
          margin="normal"
          id="code"
          label="Code"
          type="text"
          required
          fullWidth
        />
         <TextField
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoFocus
          margin="normal"
          id="phone"
          label="Phone"
          type="text"
          required
          fullWidth
        />
        <Button className={classes.cartButton} type="submit" color="primary">
          Check Out
        </Button>
    </form>
    </Grid>
    
  <Grid item xs={4}>
    <Paper className={classes.paper} elevation={0}>
      <List>
        <ListItem>
          <Typography variant="h6"> Shopping Cart </Typography>
        </ListItem>
      {products.map((product, i) => (
        <ListItem className={classes.grid}>
          <Grid  container spacing={3}>
            <Grid item xs ={3}>
              <img src={product.imageRef} width={'100%'} height={'100%'}/>
            </Grid>
            <Grid item xs={9}>
              <Typography > {product.name} </Typography>
              <Typography  > {product.model} </Typography>
              <Typography > ${product.price} </Typography>
            </Grid>
          </Grid>
        </ListItem>
      ))}
      </List>
        <ListItem>
            <Typography variant="h6"> Total : ${total} </Typography>
        </ListItem> 

    </Paper>
  </Grid>
</Grid>
      </div>
    </React.Fragment>
  );

}


export default CheckOutView;
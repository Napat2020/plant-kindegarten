
import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, CardMedia, Card, CardContent, CardActions } from '@material-ui/core'
import { typography } from '@material-ui/system';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';


const useStyles = makeStyles(theme => ({
  gridItemAdmin:{
    height:450,
    width:"100%",
    borderRadius:0, 
    '&:hover':{
      backgroundColor: '#FCFDFC'
    } 
  },
  gridItem:{
    height:400,
    width:"100%",
    borderRadius:0, 

    '&:hover':{
      backgroundColor: '#FCFDFC'
    }
  },
  card: {
    maxHeight:100,
    borderRadius:0,
    textDecoration: "none",
  },
  cardContent:{
    height:100,
    backgroundColor:"#F1F2F0",


  },
  media: {
    height: 250,
    borderRadius:0,
    padding:20,
    alignItems:30,

  },
  link:{
    textDecoration: "none",
    color:"#000000"
  }
}));


const ProductListGrid = props => {
  const classes = useStyles();


}

const ProductListItem = props => {
  const classes = useStyles();

  if(!props.product.isPublic &&  ((!!!props.authUser)  || (!!props.authUser && !props.authUser.isAdmin)))
    return null;

  if(!!props.authUser && props.authUser.isAdmin)
    return(
      <Grid className={classes.gridItemAdmin} item xs={4}>
        
        <Card elevation={0}>
          <CardMedia 
          className={classes.media}
          image={props.product.imageRef}
          />
        </Card>

        <CardContent>
          <Typography> {props.product.name} </Typography>
          <Typography> {props.product.model} </Typography>
          <Typography> ${props.product.price} </Typography>
          <Typography> Public : {props.product.isPublic.toString()} </Typography>
        </CardContent>

        <CardActions>
          <Link to={`/products/edit/${props.product.key}`} className={classes.link}>
          <button class="button is-info">Edit  </button>
          </Link>
          <button class="button is-danger" onClick={(e) => {props.firebase.deleteProduct(props.product.key)}}>
            Delete
          </button>
          <button class="button is-info" onClick={(e) => {props.firebase.archiveProduct(props.product.key)}}>
            Archive
          </button>
          <Link to={`/products/details/${props.product.key}`} className={classes.link}>
            <button class="button is-info">Details</button>
          </Link>  
        </CardActions>

      </Grid>
    )

  return(
    
      <Grid className={classes.gridItem} item xs={3}>
        <Link to={`/products/details/${props.product.key}`} className={classes.link}>
          <Card elevation={0}>
            <CardMedia 
            className={classes.media}
            image={props.product.imageRef}  
            />
          </Card>

          <CardContent>
            <Typography variant="subtitle1"> {props.product.name} </Typography>
            <Typography variant="body2"> {props.product.model} </Typography>
            <Typography variant="body2"> ${props.product.price} </Typography>
          </CardContent>
          
        </Link>   
      </Grid>
    
  )


}


export default ProductListItem;
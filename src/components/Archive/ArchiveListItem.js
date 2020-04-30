
import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, CardMedia, Card, CardContent, CardActions, Button } from '@material-ui/core'



const useStyles = makeStyles(theme => ({
  gridItemAdmin:{
    height:500,
    width:"100%",
    borderRadius:0, 

    '&:hover':{
      backgroundColor: '#FCFDFC'
    } 
  },
  gridItem:{
    height:450,
    width:"100%",
    borderRadius:0, 
    padding:15,
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


const ArchiveListItem  = props => {
  const classes = useStyles();

    return(
      
      <Grid className={classes.gridItem} item xs={3}>
         
         <Card elevation={2}>
          <CardMedia 
              className={classes.media}
              image={props.product.imageRef}
          />
          </Card>
        
        <CardContent>
          <Typography> {props.product.name} </Typography>
          <Typography> {props.product.model} </Typography>
          <Typography> ${props.product.price} </Typography>
        </CardContent>

        <CardActions>
          <Button variant="contained" size="md" color="primary" onClick={(e) => {props.firebase.restoreArchivedProduct(props.product.key)}}>
            Restore
          </Button>
          <Button variant="contained" size="md" color="secondary" onClick={(e) => {props.firebase.deleteArchivedProduct(props.product.key)}}>
            Delete
          </Button>
        </CardActions>

      </Grid>
    )



}


export default ArchiveListItem ;
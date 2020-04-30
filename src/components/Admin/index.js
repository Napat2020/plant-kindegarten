import Paper from '@material-ui/core/Paper';
import {withFirebase} from '../Firebase'
import {compose} from 'recompose'
import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import { withAuthentication, AuthUserContext, withAuthorization } from '../Session';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './Admin.css';

const useStyles = makeStyles({
  st:{
    fontSize:12,
  },
  table: {
    minWidth: 650,
  },
  grid:{
    margin:0,
    padding:0,
    marginLeft:0,
  },
  paper: {
    marginLeft:0,
    marginRight:5,
    width: '100%',
    backgroundColor: "white",
  },
  returningCustomerText:{
    marginLeft:15,
    marginTop:25,
    marginBottom:25,
  },
});

const condition = (authUser) => !!authUser && authUser.isAdmin;

const Dashboard = compose(withAuthentication, withFirebase, withAuthorization(condition))((props) => {

  return(
   <AuthUserContext.Consumer>
     {authUser => <DashboardBase authUser={authUser} firebase={props.firebase}/>}
   </AuthUserContext.Consumer>
  )
})

const DashboardBase = (props) => {

  const classes = useStyles();
  const [orders, setOrders] = useState([]);

  const ordersRef = props.firebase.orders();

  useEffect( () => {

    // reset products state
    setOrders([])

    const ca = ordersRef.on("child_added", (snapshot, prevChildKey) => {
      console.log('asd');
      setOrders(a => [...a, {...snapshot.val(), key:snapshot.key}]);  
    })

    const cr = ordersRef.on("child_removed", (snapshot) => {
      setOrders(e => e.filter(x => x.key !== snapshot.key));     
    })

    return () => {
      ordersRef.off("child_added", ca);
      ordersRef.off("child_removed", cr);
    }

  }, []);


  return(
        <div className="container2">
          <Paper className={classes.paper}>
        <div className={classes.returningCustomerText}>
          <Typography variant="h5" > Pending Orders </Typography>
        </div> 
<Table className={classes.table} size="small" aria-label="a dense table">
<TableHead>
  <TableRow>
    <TableCell align="right">Email</TableCell>
    <TableCell align="right">Product</TableCell>
    <TableCell align="right">Contact</TableCell> 
    <TableCell align="right">Action</TableCell>   
  </TableRow>
</TableHead>
<TableBody>
  {orders.map(row => (
    <TableRow key={row.key}>
      <TableCell align="right">{row.email}</TableCell>
      <TableCell align="right">{row.productId}</TableCell>
      <TableCell align="right">
        <Typography className={classes.st}>Contry : {row.country} asd</Typography>
        <Typography className={classes.st}>City : {row.city}</Typography>
        <Typography className={classes.st}>Adress 1 : {row.addressOne}</Typography>
        <Typography className={classes.st}>Adress 1 : {row.addressTwo}</Typography>
        <Typography className={classes.st}>Code : {row.code}</Typography>
        <Typography className={classes.st}>First Name : {row.firstName}</Typography>
        <Typography className={classes.st}>Last Name : {row.lastName}</Typography>
      </TableCell>
      <TableCell align="right">
        <Button variant="contained" color="secondary" onClick={(e) => props.firebase.order(row.key).remove()}>
          Process
        </Button>
      </TableCell>   
    </TableRow>
  ))}
</TableBody>
</Table>
</Paper>

   

        </div>
  );

}


export default Dashboard;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { useSpring, animated } from 'react-spring'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'space-around',
    height:50,
  },
  toolbarroot:{
    justifyContent: 'space-between',
  },
  menuButton: {
    margin: theme.spacing(3),
    marginRight: theme.spacing(15),
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize:18,
    '&:hover':{
      backgroundColor:'transparent'
    }
  },
  meButton:{
    marginLeft: 0,
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  appBarheader:{
    backgroundColor:'transparent',
    color:"black",
    boxShadow:'none',
  },
  title: {
    margin: theme.spacing(3),
    marginLeft: theme.spacing(15),
  },
}));

export default function Header() {
  const classes = useStyles();
  const [firstprops, firstset, firststop] = useSpring(() => ({ opacity: 1, width: '100%', height: '100%', position: 'fixed', borderRadius: '100%', backgroundColor:'green' }))
  const animateOnHover = (v) => {
    console.log(v)
    if(v=='enter'){
      firstset({
       opacity:1,
        transform: 'scale(0.1,0.2)'
      })
    }else{
      firstset({
        opacity: 0,
        transform: 'scale(0,0)'
        })
    }
  }
  const animateOnClick = () => {
    firstset({

      top: 0, left: 0,
      transform: 'scale(1,1)',
      

      borderRadius:'0px'
    })
  }
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBarheader}>
        <Toolbar className={classes.toolbarroot}>
          <Typography variant="h4" className={classes.title}>
            Bool It  
          </Typography>
          
          <div className={classes.menuButton}>
            <animated.div style={firstprops}></animated.div>
            <IconButton className={classes.meButton} onClick={() => { animateOnClick() }} onMouseEnter={() => { animateOnHover('enter') }} onMouseLeave={() => { animateOnHover('leave') }} edge="start"   color="inherit" aria-label="menu">          
              Menu
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

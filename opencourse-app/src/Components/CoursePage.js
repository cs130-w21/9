import React, { useState, useEffect } from "react";import { useLocation } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import logo from "../OpenCourse.svg";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from '@material-ui/icons/Menu';
import { borders } from '@material-ui/system';
import CoursePageModel from '../Models/CoursePageModel.js';
import clsx from 'clsx';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
const drawerWidth = 220;

function Copyright() {
  return (
    <Typography variant="body2" color="primary" align="center">
      {'Copyright © '}
      <Link color="primary" href="https://material-ui.com/">
        OpenCourse
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: "#6D177D",
    padding: theme.spacing(1, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(6),
  },
  cardGrid: {
    align: 'center',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(10),
  },
  card: {
    height: '120%',
    width: '130%',
    display: 'flex',
    flexDirection: 'column',
    color: '3e4551',
    backgroundColor: '#CCC8CD',
    borderRadius: '10px',
    borderBottom: '1',
    borderTopColor: '#2196F3',
    borderColor:'#2196F3',
    variant: "outlined",
    raised: false,
    shadow: 1,
    transform: 'translate(-5%, -5%)',
    backgroundSize: '500%',
    boxShadow: '0 3px 5px 2px rgba(20, 10, 15, .3)',
    transition: '0.6s',
    backgroundImage: 'linear-gradient(45deg, #CCC8CD, #CCC8CD, #3e4551)',
    '&:hover': {
      backgroundPosition: 'right',
      raised: true,
      shadow:3,
      transform: "scale3d(1.05, 1.05, 1)",
    }
  },
  newcard: {
    height: '100%',
    width: '20%',
    display: 'flex',
    flexDirection: 'row',
    color: '#6D177D'
  },
  
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: 'white',//theme.palette.background.paper,
    padding: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));




const card1 = [1];








const coursePageModel = new CoursePageModel();

export default function CoursePage() {
    const location = useLocation();
    const courseId = location.state.detail
    const classes = useStyles();
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [modules, setModules] = useState([]);
    const getmodules = async () => {
      try {
        const data = await coursePageModel.getData(courseId);
        console.log(data);
        setAuthor(data.author);
        setModules(data.body);
        setDescription(data.description);
        setTitle(data.name);
      } catch (e) {
        console.log(e);
      }
    };
  
    useEffect(() => {
      getmodules();
    }, []);



    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });




    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };





    const list = (anchor) => (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {['Home', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <HomeIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

  return (
    


    
   // <div>course page {location.state.detail}</div>
    <React.Fragment>
        <style>{'body { background-color:  #F0EEF1; }'}</style> 
        <main>
        <div className={classes.root} variant='outlined'>
      <div>


        
      


      {[" "].map((anchor) => (
        
        <React.Fragment key={anchor}>
          <AppBar position="sticky" style ={{backgroundColor: 'white'}}>
          <Toolbar >
          <IconButton edge="start" className={classes.menuButton} style ={{color: '#2196F3'}} aria-label="menu" onClick={toggleDrawer(anchor, true)}>{anchor}
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" className={classes.title} style ={{color: '#3e4551'}}>
            OpenCourse
          </Typography>
          <Button style ={{color: '#2196F3'}}>Login</Button>
        </Toolbar>
        </AppBar>
          
          <IconButton edge="end" className={classes.menuButton} style ={{color: '#2196F3'}} aria-label="menu" onClick={toggleDrawer(anchor, true)}>{anchor}
          
          </IconButton>
          
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>



    




      
    </div>


    
    
    <img src={logo} alt="Logo" width="140" height="130" style={{float : "left"}}/>
    <h1 style={{ textAlign: "center", fontFamily: "Times New Roman",fontSize: 50, fontStyle: "normal", minHeight: "1px", color: '#3e4551', }}>   {title}</h1>

          
        
      
    

          {/* Hero unit */} 
          <div className={classes.cardContent }>
            <Container maxWidth="xl">
          <div>
         
         </div>
            </Container>
            <div>  
            <h5 style={{ textAlign: "center", fontFamily: "Times New Roman",fontSize: 20, fontStyle: "normal", minHeight: "1px", color: '#3e4551', }}>  
              Course Description {description}
            </h5>
            </div>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          

            <Grid container spacing={9}> 
              {modules.length > 0 ? (modules.map((card) => (
                <Grid item key={card} xs={1} sm={4} md={9}>
                  <Card className={classes.card}>
                  <CardHeader
    
        title={card.title}
        // subheader="September 14, 2016"
      />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h3" component="h3">
                        {card.id}
                      </Typography>
                      <Typography>
                        {card.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button href = {card.link} target = "_blank"variant = "outlined" size="medium" style ={{marginLeft: "auto", backgroundColor: '#2196F3', borderRadius: '5px',  color: 'white'}}>
                        Learn
                      </Button>
                      <Button variant = "outlined" size="medium" style ={{backgroundColor: '#f10849', borderRadius: '5px', color: 'white'}}>
                        Completed
                      </Button> 
                    </CardActions>
                  </Card>
                </Grid>
              ))):( <Typography>
                No modules for this course
              </Typography>)}
            </Grid>
          </Container>
        </main>


       



        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            CS130 Group 9
          </Typography>
          <Copyright />
        </footer>
        {/* End footer */}
      </React.Fragment>


  );
}
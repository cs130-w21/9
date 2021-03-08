import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import logo from "../OpenCourse.svg";
import CoursePageModel from "../Models/CoursePageModel.js";
import CardHeader from "@material-ui/core/CardHeader";

function Copyright() {
  return (
    <Typography variant="body2" color="primary" align="center">
      {"Copyright © "}
      <Link color="primary" href="https://material-ui.com/">
        OpenCourse
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
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
    align: "center",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(10),
  },
  card: {
    height: "120%",
    width: "130%",
    display: "flex",
    flexDirection: "column",
    color: "3e4551",
    backgroundColor: "#CCC8CD",
    borderRadius: "10px",
    borderBottom: "1",
    borderTopColor: "#2196F3",
    borderColor: "#2196F3",
    variant: "outlined",
    raised: false,
    shadow: 1,
    transform: "translate(-5%, -5%)",
    backgroundSize: "500%",
    boxShadow: "0 3px 5px 2px rgba(20, 10, 15, .3)",
    transition: "0.6s",
    backgroundImage: "linear-gradient(45deg, #CCC8CD, #CCC8CD, #3e4551)",
    "&:hover": {
      backgroundPosition: "right",
      raised: true,
      shadow: 3,
      transform: "scale3d(1.05, 1.05, 1)",
    },
  },
  newcard: {
    height: "100%",
    width: "20%",
    display: "flex",
    flexDirection: "row",
    color: "#6D177D",
  },

  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: "white", //theme.palette.background.paper,
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
    width: "auto",
  },
}));

const coursePageModel = new CoursePageModel();

/**
 * Main component that renders an HTML web-page for the individual course page.
 * @function  CoursePage
 * @returns Rendered HTML individual course page with course sections to choose from.
 */
export default function CoursePage() {
  const location = useLocation();
  const courseId = location.state.detail;
  const classes = useStyles();
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [modules, setModules] = useState([]);
  const getmodules = async () => {
    try {
      const data = await coursePageModel.getData(courseId);
      if (data.author !== undefined) {
        setAuthor(data.author);
      }
      if (data.body !== undefined) {
        setModules(data.body);
      }
      if (data.description !== undefined) {
        setDescription(data.description);
      }

      if (data.name !== undefined) {
        setTitle(data.name);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getmodules();
  }, []);

  return (
    <React.Fragment>
      <style>{"body { background-color:  #F0EEF1; }"}</style>
      <main>
        <div className={classes.root} variant="outlined"></div>

        <img
          src={logo}
          alt="Logo"
          width="140"
          height="130"
          style={{ float: "left" }}
        />
        <h1
          style={{
            textAlign: "center",
            fontFamily: "Times New Roman",
            fontSize: 50,
            fontStyle: "normal",
            minHeight: "1px",
            color: "#3e4551",
          }}
        >
          {" "}
          {title}
        </h1>

        {/* Hero unit */}
        <div className={classes.cardContent}>
          <Container maxWidth="xl">
            <div></div>
          </Container>
          <div>
            <h5
              style={{
                textAlign: "center",
                fontFamily: "Times New Roman",
                fontSize: 20,
                fontStyle: "normal",
                minHeight: "1px",
                color: "#3e4551",
              }}
            >
              Course Description {description}
            </h5>
          </div>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}

          <Grid container spacing={9}>
            {modules.length > 0 ? (
              modules.map((card) => (
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
                      <Typography>{card.description}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        href={card.link}
                        target="_blank"
                        variant="outlined"
                        size="medium"
                        style={{
                          marginLeft: "auto",
                          backgroundColor: "#2196F3",
                          borderRadius: "5px",
                          color: "white",
                        }}
                      >
                        Learn
                      </Button>
                      {/*<Button variant = "outlined" size="medium" style ={{backgroundColor: '#f10849', borderRadius: '5px', color: 'white'}}>
                        Completed
                      </Button> */}
                    </CardActions>
                  </Card>
                </Grid>

              ))
            ) : (
              <Typography>No modules for this course</Typography>
            )}
          </Grid>
        </Container>
      </main>

      {/* Footer efeffe*/}
      {/*new comment */}
      <footer className={classes.footer}>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          CS130 Group 9
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>

  );
}

import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import logo from "../OpenCourse.svg";
import history from "../history.js";
import CourseListModel from "../Models/CourseListModel.js";
import Box from "@material-ui/core/Box";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        OpenCourse
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

/**
 * When an individual course's view button is clicked, pushes 
 * that state onto the history stack to be able to return back.
 * @function viewClicked  
 * @param {int} albumNum - Identifying number to distinguish each course within course album layout.
 */
function viewClicked(albumNum) {
  history.push({
    pathname: "/CoursePage",
    state: { detail: albumNum },
  });
}
/**
 * When an individual course's edit button is clicked, pushes 
 * that state onto the history stack to be able to return back.
 * @function editClicked 
 * @param {int} albumNum - Identifying number to distinguish each course within course album layout.
 */
function editClicked(albumNum) {
  console.log("edit Clicked");
  history.push({
    pathname: "/createEdit",
    state: { detail: albumNum },
  });
}

/**
 * When create button is clicked, pushes the path onto the history stack.
 * @function createClicked 
 */
function createClicked() {
  console.log("create Clicked");
  history.push({
    pathname: "/createEdit",
  });
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: 15,
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const courseListModel = new CourseListModel();

/**
 * Main component that renders an HTML web-page for the course list homepage.
 * @function  CourseList
 * @returns Rendered HTML home page with list of courses to choose from.
 */
export default function CourseList({ handleLogout }) {
  const classes = useStyles();
  const [issues, setIssues] = useState([]);
  const getIssues = async () => {
    try {
      const data = await courseListModel.getData();
      setIssues(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getIssues();
  }, []);
  return (
    <React.Fragment>
      <style>{"body { background-color: gray; }"}</style>
      <main>
        <button onClick={handleLogout}>Logout</button>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <img src={logo} alt="Logo" />
          </Container>
          <Box textAlign="center">
            <Button variant="contained" onClick={createClicked}>
              Add Course
            </Button>
          </Box>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {issues.map((card) => (
              <Grid item key={card.name} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={logo}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography>{card.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        return viewClicked(card.course_id);
                      }}
                    >
                      View
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        return editClicked(card.course_id);
                      }}
                    >
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
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

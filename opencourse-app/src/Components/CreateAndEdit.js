import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

export default function CreateAndEdit() {
  const classes = useStyles();
  const [modules, setModules] = useState([
    {
      id: 1,
      title: "first modulee",
      desc: "this is the first module",
      link: "http://www.google.com",
    },
  ]);

  const newModule = () => {
    const list = modules.concat({
      id: modules.length + 1, //need to change this to the id in db.
      title: "",
      desc: "",
      link: "",
    });

    setModules(list);
  };

  const deleteModule = (id) => {
    console.log("deleting", id);
    const newList = modules.filter((item) => item.id !== id);

    setModules(newList);
  };

  const modulesList = modules.map((module, index) => (
    <Grid item key={index} className={classes.moduleCard}>
      <Card>
        <CardHeader
          avatar={<Avatar aria-label="recipe">{index + 1}</Avatar>}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={module.title}
          // subheader="September 14, 2016"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {module.desc}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {/* <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton> */}
          <IconButton aria-label="link" href={module.link} target="_blank">
            <ShareIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            style={{ marginLeft: "auto" }}
            onClick={() => deleteModule(module.id)}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  ));

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        alignItems="center"
        height="100vh"
        className={classes.grid}
      >
        <Grid item className={classes.submitButton}>
          <Button
            variant="contained"
            style={{
              background:
                "radial-gradient(circle, rgba(0,212,255,1) 15%, rgba(65,96,255,1) 100%)",
              color: "white",
            }}
          >
            Save
          </Button>
        </Grid>
        <Grid item style={{ width: "90%" }}>
          <Typography variant="h4">Course Title:</Typography>
        </Grid>
        <Grid item className={classes.gridItem}>
          <TextField
            className={classes.textInput}
            id="outlined-basic"
            label="Course Title"
            variant="outlined"
          />
        </Grid>
        <Grid item style={{ width: "90%" }}>
          <Typography variant="h6">Course Description:</Typography>
        </Grid>
        <Grid item className={classes.gridItem} style={{ marginTop: "1%" }}>
          <TextField
            className={classes.textInput}
            id="outlined-basic"
            label="Course Decription"
            variant="outlined"
            multiline
            rows={4}
          />
        </Grid>
        <Grid item style={{ width: "90%" }}>
          <Typography variant="h6">Course Modules:</Typography>
        </Grid>
        <Grid container direction="column" alignItems="center">
          {modulesList}
        </Grid>
        <Grid item>
          <Button
            style={{
              margin: 20,
              background:
                "radial-gradient(circle, rgba(0,212,255,1) 30%, rgba(39,74,252,1) 100%)",
              color: "white",
            }}
            onClick={newModule}
            variant="contained"
            color="primary"
          >
            Add Module
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "100vh",
    // flexDirection: "column",
    //alignItems: "center",
    // background: "grey",
    // flex: 1,
    flexGrow: 1,
  },
  grid: {
    marginTop: "5%",
  },
  textInput: {
    width: "100%",
  },
  gridItem: { margin: "3%", width: "90%" },
  submitButton: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  moduleCard: { margin: 10, width: "90%" },
  container: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
  },
});

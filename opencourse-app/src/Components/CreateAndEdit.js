import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";

export default function CreateAndEdit() {
  const classes = useStyles();
  const [modules, setModules] = useState([
    {
      id: 1,
      title: "first modulee",
      desc: "this is the first module",
      link: "www.google.com",
    },
  ]);

  const newModule = () => {
    const list = modules.concat({
      id: modules.length + 1,
      title: "",
      desc: "",
      link: "",
    });

    setModules(list);
  };

  const modulesList = modules.map((module, index) => (
    <Grid item className={module.moduleCard}>
      <Card className={module.moduleCard}>
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
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          {/* <IconButton aria-label="show more">
            <ExpandMoreIcon />
          </IconButton> */}
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
        <div className={classes.submitButton}>
          <Grid item>
            <Button variant="contained" color="primary">
              Save
            </Button>
          </Grid>
        </div>
        <Grid item>
          <TextField
            className={classes.textInput}
            id="outlined-basic"
            label="Course Title"
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <TextField
            className={classes.textInput}
            id="outlined-basic"
            label="Course Decription"
            variant="outlined"
            multiline
            rows={4}
          />
        </Grid>
        <Grid container direction="column" alignItems="center">
          {modulesList}
        </Grid>
        <Grid item>
          <Button
            style={{ margin: 20 }}
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
    margin: "3%",
    width: 600,
  },
  submitButton: {
    width: 600,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  moduleCard: { margin: "3%", width: 900 },
  container: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
  },
});

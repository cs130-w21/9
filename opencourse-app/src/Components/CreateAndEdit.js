import React from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

export default function CreateAndEdit() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container direction="column" alignItems="center" height="100vh">
        <Grid item>
          <TextField
            id="outlined-basic"
            label="Course Title"
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <TextField
            id="outlined-basic"
            label="Course Decription"
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <TextField id="outlined-basic" label="Module 1" variant="outlined" />
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
  container: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
  },
});

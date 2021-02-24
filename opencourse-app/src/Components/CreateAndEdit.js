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
import ModuleCard from "./ModuleCard";
import Modal from "@material-ui/core/Modal";

export default function CreateAndEdit() {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [modules, setModules] = useState([
    {
      id: 1,
      title: "first modulee",
      desc: "this is the first module",
      link: "https://pictureofahotdog.com/",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [currModule, setCurrModule] = useState({
    id: undefined,
    title: "",
    desc: "",
    link: "",
  });
  const [currModuleIndex, setCurrModuleIndex] = useState(0);

  const handleModuleTitleChange = (e) => {
    setCurrModule({ ...currModule, title: e.target.value });
  };

  const handleModuleDescChange = (e) => {
    setCurrModule({ ...currModule, desc: e.target.value });
  };
  const handleModuleLinkChange = (e) => {
    setCurrModule({ ...currModule, link: e.target.value });
  };

  const handleOpen = (index) => {
    const current = modules[index];
    console.log("selected module", current);
    setCurrModule(current);
    setCurrModuleIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    const newModules = modules;
    newModules[currModuleIndex] = currModule;
    console.log(newModules);
    setModules(newModules);
    setOpen(false);
  };

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
      <ModuleCard
        index={index}
        module={module}
        deleteModule={deleteModule}
        openModal={handleOpen}
      />
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          height={"100vh"}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className={classes.paper}>
            <TextField
              id="outlined-basic"
              label="Module Title"
              variant="outlined"
              defaultValue={currModule.title}
              style={{ margin: "1%" }}
              onChange={handleModuleTitleChange}
            />
            <TextField
              id="outlined-basic"
              label="Module Description"
              variant="outlined"
              defaultValue={currModule.desc}
              style={{ margin: "1%" }}
              onChange={handleModuleDescChange}
              multiline
              rows={4}
            />
            <TextField
              id="outlined-basic"
              label="Module Link"
              variant="outlined"
              defaultValue={currModule.link}
              style={{ margin: "1%" }}
              onChange={handleModuleLinkChange}
            />
          </div>
        </Modal>
        <Grid item className={classes.submitButton}>
          <Button
            variant="contained"
            style={{
<<<<<<< HEAD
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              color: "white",
              boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .4)",
=======
              background:
                "radial-gradient(circle, rgba(0,212,255,1) 15%, rgba(65,96,255,1) 100%)",
              color: "white",
>>>>>>> cbe266e35b69bc8a3b3446def23c8afdeb6b150c
            }}
          >
            Save Changes
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
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
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
            defaultValue={desc}
            multiline
            rows={4}
            onChange={(e) => setDesc(e.target.value)}
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
<<<<<<< HEAD
              // background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              color: "#2196F3",
              boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .4)",
            }}
            onClick={newModule}
            variant="outlined"
=======
              background:
                "radial-gradient(circle, rgba(0,212,255,1) 30%, rgba(39,74,252,1) 100%)",
              color: "white",
            }}
            onClick={newModule}
            variant="contained"
>>>>>>> cbe266e35b69bc8a3b3446def23c8afdeb6b150c
            color="primary"
          >
            Add Module
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
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
  paper: {
    border: "2px solid #000",
    backgroundColor: theme.palette.background.paper,
    minWidth: "50%",
    boxShadow: theme.shadows[5],
    padding: "5%",
    display: "flex",
    flexDirection: "column",
  },
  container: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
  },
}));

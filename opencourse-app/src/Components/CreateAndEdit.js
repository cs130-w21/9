import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import history from "../history.js";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ModuleCard from "./ModuleCard";
import Modal from "@material-ui/core/Modal";
import CoursePageModel from "../Models/CoursePageModel.js";
import createEditCourseModel from "../Models/createEditCourseModel.js";

const coursePageModel = new CoursePageModel();
const createEditModel = new createEditCourseModel();

/**
 * Renders the creating a course page and editing page that allows users 
 * to click on the repsective button and make the appropriate changes.
 * @function CreateAndEdit
 * @returns An HTML component for the respective creating and editing pages.
 */
export default function CreateAndEdit() {

  const classes = useStyles();
  const location = useLocation();
  const courseId = location.state ? location.state.detail : undefined; //undefined if creating course
  const [editing, setEditing] = useState(!(location.state === undefined));
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState("");
  const [author, setAuthor] = useState();
  const [modules, setModules] = useState([]);

  /**
   * Fetches data for courses from model file
   * @function getCourse 
   * @returns Various information pertaining each course such as course name and description.
   */
  const getCourse = async () => {
    try {
      const data = await coursePageModel.getData(courseId);
      console.log(data);
      if (data.body !== undefined) {
        setModules(data.body);
      }
      if (data.description !== undefined) {
        setDesc(data.description);
      }
      if (data.name !== undefined) {
        setTitle(data.name);
      }
    } catch (e) {
      console.log(e);
      setEditing(!(location.state === undefined))
    }
  };

  const [open, setOpen] = useState(false);
  const [currModule, setCurrModule] = useState({
    id: undefined,
    title: "",
    description: "",
    link: "",
  });
  const [currModuleIndex, setCurrModuleIndex] = useState(0);

  useEffect(() => {
    console.log("editing:", editing);
    if (editing) {
      getCourse();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


/**
 * Calls model for when user creates a specific course
 * @function createCourse
 * @returns Saved course to course list.
 */
  const createCourse = () => {
    if (!title) {
      alert("You must add a course title!");
    } else if (modules.length === 0) {
      alert("You must add course modules");
    } else {
      try {
        createEditModel.createCourse(author, desc, "", title, modules);
        history.push({
          pathname: "/",
        });
      } catch (e) {
        console.log(e);
      }
    }
    //route back to home
  };

/**
 * Calls model when user edits a course and routes back to home with newly edited course added to the list.
 * @function saveEdits
 * @returns Edited course to course list.
 */
  const saveEdits = () => {
    if (modules.length === 0) {
      alert("You must add course modules");
    } else {
      try {
        createEditModel.editCourse(courseId, modules);
        history.push({
          pathname: "/",
        });
      } catch (e) {
        console.log(e);
      }
    }
    //route back to home
  };

  const handleModuleTitleChange = (e) => {
    setCurrModule({ ...currModule, title: e.target.value });
  };

  const handleModuleDescChange = (e) => {
    setCurrModule({ ...currModule, description: e.target.value });
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
      description: "",
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
  /**
   * Returns wrapped JSX html component for the respective saving and editing pages
   */
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        alignItems="center"
        height="100vh"
        className={classes.grid}
        data-testid = "addmoduleextension"
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
              onChange={handleModuleTitleChange } 
	      
            />
            <TextField
              id="outlined-basic"
              label="Module Description"
              variant="outlined"
              defaultValue={currModule.description}
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
          {editing ? (
            <Button
              variant="contained"
              style={{
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                color: "white",
                boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .4)",
              }}
              onClick={saveEdits}
            >
              Save Changes
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                color: "white",
                boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .4)",
              }}
              onClick={createCourse}
            >
              Create Course
            </Button>
          )}
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
          <Typography variant="h6">Course Author:</Typography>
        </Grid>
        <Grid item className={classes.gridItem} style={{ marginTop: "1%" }}>
          <TextField
            className={classes.textInput}
            id="outlined-basic"
            label="Course Author"
            variant="outlined"
            defaultValue={author}
            onChange={(e) => setAuthor(e.target.value)}
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
              // background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              color: "#2196F3",
              boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .4)",
            }}
            onClick={newModule}
            variant="outlined"
            color="primary"
            data-testid="addmodulebutton"
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

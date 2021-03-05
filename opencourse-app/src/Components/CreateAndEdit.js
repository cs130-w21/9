import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import history from "../history.js";
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
import CoursePageModel from "../Models/CoursePageModel.js";
import createEditCourseModel from "../Models/createEditCourseModel.js";

const coursePageModel = new CoursePageModel();
const createEditModel = new createEditCourseModel();

export default function CreateAndEdit() {
  const classes = useStyles();
  const location = useLocation();
  const courseId = location.state ? location.state.detail : undefined; //undefined if creating course
  const [editing, setEditing] = useState(!(location.state === undefined));
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState("");
  const [author, setAuthor] = useState();
  const [modules, setModules] = useState([]);

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
  }, []);
  /*
Function for adding/creating a course. Must fill in all parameters.
Create the courseEdit model first like this
const courseListModel = new CourseListModel();

You then call the function as courseListMode.createCourse(fill in all parameters)
courseAuthor = string
courseDescription = string
courseLength = string
courseName = string
courseBody = array of objects with following type {title: "link2", link: "https://reddit.com", description : "test"}, be sure that this
is an array, as the model will append the existing entries into this array and then this array will be sent in post request. 

Example call createCourse("1 minute", "Abstract", [{title: "link2", link: "https://reddit.com", description : "test"}])

  function createCourse(courseId, courseAuthor, courseDate, courseDescription,
    courseLength, courseName, courseBody) {
      courseCreateModel.createCourse(courseId, courseAuthor, courseDate, courseDescription,
        courseLength, courseName, courseBody)
    }


  ****** To Edit a course *****
CourseId is needed as well as a body to edit a course. You can also change the name and description

courseID = int ** required
courseDescription = string ** optional
courseLength = string ** optional
courseName = string ** required
courseBody = array of objects with following type {title: "link2", link: "https://reddit.com", description : "test"}, be sure that this
is an array, as the model will append the existing entries into this array and then this array will be sent in post request. ** required

Example call createCourse("yaboi", "id", "1 minute", "Abstract", [{title: "link2", link: "https://reddit.com", description : "test"}])

  function createCourse(courseId, courseAuthor, courseDate, courseDescription,
    courseLength, courseName, courseBody) {
      courseCreateModel.createCourse(courseId, courseAuthor, courseDate, courseDescription,
        courseLength, courseName, courseBody)
    }
*/

  const createCourse = () => {
    if (!title) {
      alert("You must add a course title!");
    } else if (modules.length == 0) {
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

  const saveEdits = () => {
    if (modules.length == 0) {
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

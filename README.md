Welcome to OpenCourse!
Read the below information to find out how to locally build, test and run the app.

Requirements:

- First, make sure you have Node.js installed. If not, install it before you start any of the steps.
- After cloning the github OpenCourse repository on your local machine, go to opencourse-app folder, and run the command npm install to install the required dependencies that your system may not have.

Build:

In the main project directory of your local machine's copy, run: 
**npm run build** 
to build the project.

Test:

In the main project directory of your local machine's copy, run:
**npm test**
to run all the test cases, both frontend and backend.

Run:

Simply run the command:
**npm start**
This command will start the server, as well as the frontend, and the web application will show up and 
start running on a window.

=======
Make sure that PORT 4000 is not in use before and in between the commands above. If an error shows up saying that port is in use, run the following
command, and then re-run: **kill $(lsof -t -i:4000)**

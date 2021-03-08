import axios from "axios";

var headers = {
  "Content-Type": "application/json",
};
/**
 * Creating and editing courses passed from the conroller to database.
 * @class CreateEditModel
 */

class CreateEditModel {
  /**
   * Constructs creating and editing course card.
   * @constructor 
   */
  constructor() {
    this.cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

  /**
   * Given course information, will create a course in the database.
   * @method createCourse 
   * @param {string} courseAuthor - Author of Course.
   * @param {string} courseDescription - Description of course to be created.
   * @param {string} courseLength - Length of Course to be created.
   * @param {string} courseName - Name of course to be created.
   * @param {Object[]} courseBody - Array of modules.
   * @returns A newly generated or edited course.
   */
  createCourse = async (
    courseAuthor,
    courseDescription,
    courseLength,
    courseName,
    courseBody
  ) => {
    try {
      const randomId = Math.floor(Math.random() * 1000000000000000);
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0");
      var yyyy = today.getFullYear();
      today = mm + "/" + dd + "/" + yyyy;
      const course_id = randomId.toString();
      console.log("createcourse id", course_id);
      const data = await axios.post(
        "http://localhost:4000/courses/create",
        {
          id: randomId, //mandatory
          date_created: today, //mandatory
          description: courseDescription,
          length: courseLength,
          author: courseAuthor,
          name: courseName, //mandatory
          body: courseBody, //mandatory
          course_id: course_id,
        },
        { headers: headers }
      );
      console.log("post request", data.data);
      return data.data;
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * Given course ID and body, adds modules to given course in database.
   * @method editCourse
   * @param {int} courseId - Course distinguisher.
   * @param {Object[]} courseBody - Array of Modules.
   * @returns A new course module.
   */
  editCourse = async (courseId, courseBody) => {
    var dataBody = {};
    try {
      const data = await axios.get(`http://localhost:4000/courses/${courseId}`);
      dataBody = data.data;
    } catch (e) {
      console.log(e);
    }
    try {
      const data = await axios.post(
        "http://localhost:4000/courses/create",
        {
          id: parseInt(courseId), //mandatory in db
          date_created: dataBody.date_created, //mandatory in db
          description: dataBody.description,
          length: dataBody.length,
          author: dataBody.author,
          name: dataBody.name, //mandatory in db
          body: courseBody, //mandatory in db
          course_id: courseId,
        },
        { headers: headers }
      );
      console.log(dataBody);
      return dataBody;
    } catch (e) {
      console.log(e);
    }
  };
}

export default CreateEditModel;

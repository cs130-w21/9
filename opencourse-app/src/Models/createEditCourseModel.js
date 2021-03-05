import axios from "axios";

var headers = {
  "Content-Type": "application/json",
};
class CreateEditModel {
  constructor() {
    this.cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

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
          course_id: toString(randomId),
        },
        { headers: headers }
      );
      console.log(data.data);
      return data.data;
    } catch (e) {
      console.log(e);
    }
  };

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

import axios from 'axios';


class CourseListModel {
    constructor() {
      this.cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
    getCards()
    {
        return this.cards;
    }
    getData = async () => {
      try {
          const data = await axios.get(
              "http://localhost:4000/courses"
          );
            return data.data
      } catch(e) {
          console.log(e);
      }
  };
  }

  export default CourseListModel;
 
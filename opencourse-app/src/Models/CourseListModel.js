import axios from 'axios';

/**
 * This is a model to store the data received for 
 * the database for the controller to talk to.
 * @class CourseListModel
 */
class CourseListModel {
    /**
    * Declares an array to use for the cards for each course
    * @constructor constructor
    */
    constructor() {
      this.cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
    /**
     * @method getCards
     * @returns this instance's course list model cards.
     */
    getCards()
    {
        return this.cards;
    }
    /**
     * Gets relevant course information from database.
     * @method getData
     * @returns Courses and stores in this instance's list model cards.
     */
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
 
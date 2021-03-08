import axios from 'axios';

/**
 * This is a model to store the data received for 
 * the database for the controller to talk to.
 * @class CoursePageModel
 */
class CoursePageModel {
    /**
    * Declares an array to use for the cards for each course's subtopic.
    * @constructor constructor
    */
    constructor() {
        this.cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.dict = {1: "Software Process",2: "Software Analysis",
        3: "Software Architecture",4: "Software Design",5: "Software Code Generation",
        6: "Test 6",7: "Test 7",8: "Test 8",
        9: "Test 9"};
    }

    /**
     * @method getCards
     * @returns this instance's course topics list model cards.
     */
    getCards()
    {
        return this.cards;
    }

    /**
     * Uses course ID to get each course's information 
     * @method getData
     * @param {int} id - Course ID to distinguish different courses.
     * @returns Course topics from database and stores it in this instance's list model cards.
     */
    getData = async (id) => {
        try {
            const data = await axios.get(
                `http://localhost:4000/courses/${id}`
            );
              return data.data
        } catch(e) {
            console.log(e);
        }
    };

}

export default CoursePageModel;
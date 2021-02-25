import axios from 'axios';


class CoursePageModel {
    constructor() {
        this.cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.dict = {1: "Software Process",2: "Software Analysis",
        3: "Software Architecture",4: "Software Design",5: "Software Code Generation",
        6: "Test 6",7: "Test 7",8: "Test 8",
        9: "Test 9"};
    }


    getCards()
    {
        return this.cards;
    }


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
import axios from 'axios';

const url = 'http://localhost:5000/api/public/courses';

class displayServices {

    //Courses
    static getCourses(){
        return new Promise(async (resolve, reject) => {
            try{
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(courses => ({
                        ...courses
                    }))
                );
            } catch(err) {
                reject(err);
            }
        })
    }
}

export default displayServices;
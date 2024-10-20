import axios from 'axios';

const url = 'http://localhost:5000/api/auth/registerStudent';

class Authservices { 

    //Register new 
    static addUser(user){
        return axios.post(url, user);
    }

    static login(user){
        return axios.post('http://localhost:5000/api/auth/login', user);
    }
}

export default Authservices;
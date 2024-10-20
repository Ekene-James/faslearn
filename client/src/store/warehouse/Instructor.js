import axios from 'axios';
//import router from '../../router';


const state = {
    status: '', 
};

const getters = {
    loader: state => state.status 
    //error: state => state.error
};

const actions = {
    //creating a new course
    async createNewCourse({
        commit
    }, formData) {
        commit('create_course_request');
        try {
            let res = await axios.post('instructor/createCourse', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.status == 201) {
                commit('create_course_success');
            }
            return res;
        } catch (err) {
            commit('create_course_error', err);
        }
    },
    //fetching playlists of a course
    async bringPlaylist({
        commit
    }, course_id) {
        commit('get_playlist_request');
        try {
            let res = await axios.get('instructor/playlists/' + course_id)
            if (res.status == 200) {
                commit('get_playlist_seen');
            }
            return res;
        } catch (err) {
            commit('get_playlist_error', err);
        }
    },
    //creating a new playlist
    async createPlaylist({
        commit
    }, play) {
        commit('create_playlist_request');
        try {
            let res = await axios.post('instructor/playlist', play);
            if (res.status == 201) {
                commit('create_playlist_success');
            }
            return res;
        } catch (err) {
            commit('create_playlist_error', err);
        }
    },

    //creating a video lecture
    async createVideoLecture({
        commit
    }, formData) {
        commit('create_lecture_request');
        try {
            let res = await axios.post('instructor/lecture', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            commit('create_lecture_success');
            return res;
        } catch (err) {
            commit('create_lecture_error', err);
        }
    },

    //creating a video lecture
    async createMaterialLecture({
        commit
    }, formData) {
        commit('create_lecture_request');
        try {
            let res = await axios.post('instructor/material', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            commit('create_lecture_success');
            return res;
        } catch (err) {
            commit('create_lecture_error', err);
        }
    },

    //creating a video lecture
    async fetchplaylistlectures({
        commit
    }, play_id) {
        commit('get_lectures_request');
        try {
            let res = await axios.get('instructor/playlistlectures/' + play_id)
            if (res.status == 200) {
                commit('get_lectures_seen');
            }
            return res;
        } catch (err) {
            commit('get_lectures_error', err);
        }
    },

    //creating a video lecture
    async fetchOneInstructor({
        commit
    }, instructor_id) {
        commit('get_request');
        try {
            let res = await axios.get('instructor/instructor/' + instructor_id)
            if (res.status == 200) {
                commit('get_seen');
            }
            return res;
        } catch (err) {
            commit('get_error', err);
        }
    },

    //fetching cousrse by a particular user
    async fetchInstructorCourse({
        commit
    }, object) {
        commit('get_request');
        try {
            let res = await axios.get('instructor/courses/'+object.instructor_id+'/'+object.skip)
            if (res.status == 200) {
                commit('get_seen');
            }
            return res;
        } catch (err) {
            commit('get_error', err);
        }
    },

    //All instructors
    async fetchAllInstructors({
        commit
    }, skip) {
        commit('get_request');
        try {
            let res = await axios.get('instructor/allinstructor/'+skip)
            if (res.status == 200) {
                commit('get_seen');
            }
            return res;
        } catch (err) {
            commit('get_error', err);
        }
    }, 

    async fetch_AllInstructorByCategory({
        commit
    }, object) {
        commit('get_request');
        try {
            let res = await axios.get('instructor/fetchAllInstructorByCategory/' + object.catId +'/'+object.skip)
            if (res.status == 200) {
                commit('get_seen');
            }
            return res;
        } catch (err) {
            commit('get_error', err);
        }
    },

    async fetchInstructorQuestionsToAnswer({
        commit
    }, object) {
        commit('get_request');
        try {
            let res = await axios.get('instructor/fetchClassQuestionForRespond/' + object.instructor_id+'/'+object.skip)
            if (res.status == 200) {
                commit('get_seen');
            }
            return res;
        } catch (err) {
            commit('get_error', err);
        }
    }, 

    async fetch_Single_ClassQuestion({
        commit
    }, question_id) {
        commit('get_request');
        try {
            let res = await axios.get('instructor/fetchSingleClassQuestion/' + question_id)
            if (res.status == 200) {
                commit('get_seen');
            }
            return res;
        } catch (err) {
            commit('get_error', err);
        }
    },  

    async Answer_Single_ClassQuestion({
        commit
    }, object) {
        commit('get_request');
        try {
            let res = await axios.post('instructor/AnswerSingleClassQuestion', object)
            if (res.status == 200) {
                commit('get_seen');
            }
            return res;
        } catch (err) {
            commit('get_error', err);
        }
    },
    
    async Delete_Single_ClassQuestion({
        commit
    }, id) {
        commit('get_request');
        try {
            let res = await axios.delete('instructor/DeleteSingleClassQuestion/'+ id)
            if (res.status == 200) {
                commit('get_seen');
            }
            return res;
        } catch (err) {
            commit('get_error', err);
        }
    }, 
    async fetch_Instructor_Dashboard({
        commit
    }, id) {
        commit('get_request');
        try {
            let res = await axios.get('instructor/fetchInstructorDashboard/' + id)
            if (res.status == 200) {
                commit('get_seen');
            }
            return res;
        } catch (err) {
            commit('get_error', err);
        }
    }, 
    
    async fetch_categories({
        commit
    }) {
        commit('get_request');
        try {
            let res = await axios.get('instructor/categories')
            if (res.status == 200) {
                commit('get_seen');
            }
            return res;
        } catch (err) {
            commit('get_error', err);
        }
    }, 

    async apply_ForEmployment({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.post('instructor/applyForEmployment', object)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    }, 

    async check_IsLecturerAppllied({
         commit
     }, object) {
        commit('try_request');
        try {
            let res = await axios.post('instructor/checkIsLecturerAppllied', object)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },
    
    async view_CourseForEdit({
        commit
    }, id) {
        commit('get_request');
        try {
            let res = await axios.get('instructor/viewCourseForEdit/' + id)
            if (res.status == 200) {
                commit('get_seen');
            }
            return res;
        } catch (err) {
            commit('get_error', err);
        }
    }, 

    async editCourse({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.post('instructor/editCourse', object)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },
    async deleteLecture({
        commit
    }, lecture_id) {
        commit('try_request');
        try {
            let res = await axios.delete('instructor/lecture/'+lecture_id)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },

    async delete_Playlist({
        commit
    }, playlist_id) {
        commit('try_request');
        try {
            let res = await axios.delete('instructor/playlist/'+playlist_id)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },

    async delete_course({
        commit
    }, course_id) {
        commit('try_request');
        try {
            let res = await axios.delete('instructor/course/' + course_id)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },
    async fetchInstructor_Details({
        commit
    }, user_id) {
        commit('try_request');
        try {
            let res = await axios.get('instructor/fetchInstructorDetails/' + user_id)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },
    async applyCourse_Affiliation({
        commit
    }, object){
        commit('try_request');
        try {
            let res = await axios.post('instructor/applyCourseAffiliation/', object)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },
    async manage_Test({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.post('instructor/manageTest/', object)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    }, 
    async fetch_CourseTest({
        commit
    }, courseId) {
        commit('try_request');
        try {
            let res = await axios.get('instructor/fetchCourseTest/'+ courseId)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    }, 
    async manage_Questions({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.post('instructor/manageQuestions/', object)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    }, 
    async add_QuestionOption({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.post('instructor/addQuestionOption/', object)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },
    async set_OptionDelete({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.post('instructor/setOptionDelete', object)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },

}; 

const mutations = {
    create_course_request(state) {
        state.error = null
        state.status = 'loading'
    },
    create_course_success(state) {
        state.status = 'success'
        state.error = null
    },
    create_course_error(state, err) {
        state.error = err.response.data.error
    },
    get_playlist_request(state){
        state.error = null
        state.status = 'loading'
    },
    get_playlist_seen(state) {
        state.status = 'success'
        state.error = null
    },
    get_playlist_error(state, err) {
        state.error = err.response.data.errors
    },
    create_playlist_request(state) {
        state.error = null
        state.status = 'loading'
    },
    create_playlist_success(state) {
        state.status = 'success'
        state.error = null
    },
    create_playlist_error(state, err) {
        state.error = err.response.data.errors
    },
    create_lecture_request(state) {
        state.error = null
        state.status = 'loading'
    },
    create_lecture_success(state) {
        state.status = 'success'
        state.error = null
    },
    create_lecture_error(state, err) {
        state.error = err.response.data.error
    },
    get_lectures_request(state) {
        state.error = null
        state.status = 'loading'
    },
    get_lectures_seen(state) {
        state.status = 'success'
        state.error = null
    },
    get_lectures_error(state, err) {
        state.error = err.response.data.errors
    },
    get_request(state) {
        state.error = null
        state.status = 'loading'
    },
    get_seen(state) {
        state.status = 'success'
        state.error = null
    },
    get_error(state, err) {
        state.error = err.response.data.errors
    },
};

export default {
    state,
    actions,
    mutations,
    getters
}
import axios from 'axios';
//import router from '../../router';


const state = {
    status: '',
    myTest: ''
};

const getters = {
    circle: state => state.status,
    myTest: state => state.myTest
};

const actions = {
    //fetch the most recent courses
    async fetch_recent_courses({
        commit
    }, skip) {
        commit('fetch_recent_courses_request');
        try {
            let res = await axios.get('student/RecentCourses/'+skip)
            if (res.status == 200) {
                commit('fetch_recent_courses_seen');
            }
            return res;
        } catch (err) {
            commit('fetch_recent_courses_error');
        }
    },

    //fetch the most recent courses
    async fetch_course_details({
        commit
    }, object) {
        commit('fetch_course_details_request');
        try {
            let res = await axios.post('student/course', object)
            if (res.status == 200) {
                commit('fetch_course_details_seen');
            }
            return res;
        } catch (err) {
            commit('fetch_course_details_error');
        }
    },

    //fetch the most recent courses
    async recieve_lectures({
        commit
    }, lecture_id) {
        commit('recieve_lectures_request');
        try {
            let res = await axios.get('student/lecture/'+lecture_id)
            if (res.status == 200) {
                commit('recieve_lectures_seen');
            }
            return res;
        } catch (err) {
            commit('recieve_lectures_error');
        }
    },

    async fetch_user({
        commit
    }, user_id) {
        commit('single_user_request');
        try {
            let res = await axios.get('student/singleuser/' + user_id)
            if (res.status == 200) {
                commit('single_user_seen');
            }
            return res;
        } catch (err) {
            commit('single_user_error');
        }
    },
    //save all purchased courses for user in database
    async save_purchased_course({
        commit
    }, object) {
        commit('save_purchased_course_request');
        try {
            let res = await axios.post('student/verifyPayment/', object)
            if (res.status == 200) {
                commit('save_purchased_course_seen');
            }
            return res;
        } catch (err) {
            commit('save_purchased_course_error');
        }
    },
    // check if user payed for a course
    async verify_course_payment({
        commit
    }, object) {
        commit('verify_course_purchase_request');
        try {
            let res = await axios.post('student/verifyPurcahse', object)
            if (res.status == 200) {
                commit('verify_course_purchase_seen');
            }
            return res;
        } catch (err) {
            commit('verify_course_purchase_error', err);
        }
    },

    ///myCourses/:id
    async fetch_purchased_courses({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.get('student/myCourses/' + object.user_id+'/'+object.skip)
            if (res.status == 200) {
                commit('try_seen');
            }
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },

    //fetch category cousres
    async fetch_courses_by_category({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.get('student/CoursesByCategory/' + object.cat + '/' +object.skip)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },
    ///fetching course details for site view
    async fetch_public_course_details({
        commit
    }, courseId) {
        commit('try_request');
        try {
            let res = await axios.post('public/course/', courseId)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },

    
    async fetchReviewedPublic({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.post('public/fetchReviewedPublic', object)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },

    // async submit_student_course_review({
    //     commit
    // }, object) {
    //     commit('try_request');
    //     try {
    //         let res = await axios.post('student/submitCourseReview', object);
    //         console.log(object);
    //         commit('try_seen');
    //         return res;
    //     } catch (err) {
    //         commit('try_error', err);
    //     }
    // }, 

    // async fetch_student_course_review({
    //     commit
    // }, courseId) {
    //     commit('try_request');
    //     try {
    //         let res = await axios.get('student/fetchCourseReview/'+ courseId);
    //         commit('try_seen');
    //         return res;
    //     } catch (err) {
    //         commit('try_error', err);
    //     }
    // },
    
    async fetchAllPurchaseForCourse({
        commit
    }, courseId, skip) {
        commit('try_request');
        try {
            let res = await axios.get('student/fetchAllPurchaseForCourse/' + courseId +'/'+skip);
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },

    //Asking questions in lecture room
    async Ask_Question({
        commit
    }, object) {
        commit('try_request');
        console.log(object)
        try {
            let res = await axios.post('student/AskClassQuestion', object)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },

    //Asking questions in lecture room
    async fetch_lecture_Questions({
        commit
    }, id, skip) {
        commit('try_request');
        try {
            let res = await axios.get('student/fetchClassQuestions/'+ id +'/'+skip)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    }, 

    async fetch_All_User_Asked_Question({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.get('student/fetchAllUserAskedQuestion/' + object.id + '/' +object.skip)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },

    async fetch_Student_Dashboard({
        commit
    }, id) {
        commit('try_request');
        try {
            let res = await axios.get('student/fetchStudentDashboard/' + id)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },

    async apply_for_Admission({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.post('student/applyForAdmission', object)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },

    async manage_Subscription({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.post('student/manageSubscription', object)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    }, 
    async check_IsUserInstitutionStudent({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.post('student/checkIsUserInstitutionStudent', object)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    }, 
    async check_IsUserSubscribed({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.post('student/checkIsUserSubscribed', object)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },
    async fetch_TestForCourseDetails({
        commit
    }, id) {
        commit('try_request');
        try {
            let res = await axios.get('student/fetchTestForCourseDetails/' + id)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    }, 

    async fetch_TestForStudentExamRoom({
        commit
    }, id) {
        commit('try_request');
        try {
            let res = await axios.get('student/fetchTestForStudentExamRoom/' + id)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    }, 
    async manage_studentPreparedTest({
        commit
    }, testObjest) {
        commit('encrypt_test_and_save', testObjest);
    }, 

    async officially_StartTest({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.post('student/officiallyStartTest', object)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },
    async manage_TestLogResults({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.post('student/manageTestLogResults', object)
            commit('clear_ended_Test');
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },
    async checkIf_UserAlreadyStartedTest({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.post('student/checkIfUserAlreadyStartedTest', object)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    }, 
    async fetch_StudentCertificate({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.post('student/fetchStudentCertificate', object)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    }, 
    async checkIf_UserAlreadyReviewedAndFetchAll({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.post('student/checkIfUserAlreadyReviewedAndFetchAll', object)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },
    async submit_Review({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.post('student/submitReview', object)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },
    async fetch_UserNotifications({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.get('student/fetchUserNotifications/' + object.userId +'/'+object.skip)
            if (res.status == 200) {
                commit('try_seen');
            }
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    }, 
    async count_UnseenNotifications({
        commit
    }, userId) {
        commit('try_request');
        try {
            let res = await axios.get('student/countUnseenNotifications/' + userId)
            if (res.status == 200) {
                commit('try_seen');
            }
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },

    async count_UnseenQuestions({
        commit
    }, userId) {
        commit('try_request');
        try {
            let res = await axios.get('student/countUnseenQuestions/' + userId)
            if (res.status == 200) {
                commit('try_seen');
            }
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },  

    async fetch_SubscribtionNotification({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.post('student/fetchSubscribtionNotification', object)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    }, 

    async fetch_AdmissionRequestNotification({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.post('student/fetchAdmissionRequestNotification', object)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    }, 

    async fetch_AdmissionResponseNotification ({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.post('student/fetchAdmissionResponseNotification ', object)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    }, 
    
    async fetch_EmploymentRequestNotification({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.post('student/fetchEmploymentRequestNotification', object)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },

    async fetch_EmploymentResponseNotification({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.post('student/fetchEmploymentResponseNotification', object)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    }, 

    async fetch_AffiliationRequestNotification({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.post('student/fetchAffiliationRequestNotification', object)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },
    async fetch_AffiliationResponseNotification({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.post('student/fetchAffiliationResponseNotification', object)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    }, 
    async fetch_PurchasedCourseNotification({
         commit
     }, object) {
        commit('try_request');
        try {
            let res = await axios.post('student/fetchPurchasedCourseNotification', object)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    }, 
    async fetch_NewCourseNotification({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.post('student/fetchNewCourseNotification', object)
            commit('try_seen');
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },
    async seen_AllNotification({
        commit
    }, userId) {
        commit('try_request');
        try {
            let res = await axios.get('student/seenAllNotification/' + userId)
            if (res.status == 200) {
                commit('try_seen');
            }
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    }, 
    async search_Items({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.post('student/searchItems', object)
            if (res.status == 200) {
                commit('try_seen');
            }
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },
    async send_StudentFeedback({
        commit
    }, object) {
        commit('try_request');
        try {
            let res = await axios.post('student/sendStudentFeedback', object)
            if (res.status == 200) {
                commit('try_seen');
            }
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    }, 
    async fetchUserCertificates({
        commit
    }, userId) {
        commit('try_request');
        try {
            let res = await axios.get('student/fetchUserCertificates/' + userId)
            if (res.status == 200) {
                commit('try_seen');
            }
            return res;
        } catch (err) {
            commit('try_error', err);
        }
    },

}; 

const mutations = {
    fetch_recent_courses_request(state) {
        state.error = null
        state.status = 'loading'
    },
    fetch_recent_courses_seen(state) {
        state.status = 'success'
        state.error = null
    },
    fetch_recent_courses_error(state, err) {
        state.error = err.response.data.error
    },
    fetch_course_details_request(state) {
        state.error = null
        state.status = 'loading'
    },
    fetch_course_details_seen(state) {
        state.status = 'success'
        state.error = null
    },
    fetch_course_details_error(state, err) {
        state.error = err.response.data.errors
    },
    recieve_lectures_request(state) {
        state.error = null
        state.status = 'loading'
    },
    recieve_lectures_seen(state) {
        state.status = 'success'
        state.error = null
    },
    recieve_lectures_error(state, err) {
        state.error = err.response.data.errors
    },
    single_user_request(state) {
        state.error = null
        state.status = 'loading'
    },
    single_user_seen(state) {
        state.status = 'success'
        state.error = null
    },
    single_user_error(state, err) {
        state.error = err.response.data.errors
    }, 
    save_purchased_course_request(state) {
        state.error = null
        state.status = 'loading'
    },
    save_purchased_course_seen(state) {
        state.status = 'success'
        state.error = null
    },
    save_purchased_course_error(state, err) {
        state.error = err.response.data
    },
    verify_course_purchase_request(state) {
        state.error = null
        state.status = 'loading'
    },
    verify_course_purchase_seen(state) {
        state.status = 'success'
        state.error = null
    },
    verify_course_purchase_error(state, err) {
        state.error = err.response.data
    },
    try_request(state) {
        state.error = null
        state.status = 'loading'
    },
    try_seen(state) {
        state.status = 'success'
        state.error = null
    },
    try_error(state, err) {
        state.error = err.response.data
    },
    encrypt_test_and_save(state, testObjest) {
        state.myTest = testObjest
    },
    clear_ended_Test(state){
        state.myTest = ''
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}
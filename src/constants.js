const Labels = {
    app_title: 'Metacognitive Tutor', // Don't forget to change the title in index.html and index.ejs too. 
    app_description: 'An app to teach kids metacognitive reading strategies. Written with React.js.',
    home: {
        title: 'Home',
        learn_more: "Learn More"
    },
    about: {
        title: 'About',
        description: 'An app to teach kids metacognitive reading strategies. Written with React.js.',
    },
    login: {
        title: "Log in",        
        log_in_as_a_teacher: 'Login as a Teacher',        
        log_in_as_a_student: 'Login as a Student'
    },
    logout: {
        title: 'Logout'        
    },
    not_found: {
        title: '404 Page Not Found',
        message: 'Go back to homepage'
    },
    privacy_policy: {
        title: 'Privacy Policy',        
        phone_number: '781 205-9546',
        email_address: 'jgorman30@gatech.edu'
    },
    teacher: {
        admin_page: {
            title: 'Admin Page',
            description: 'Some Description...'
        },
        create_lesson_page: {
            title: 'Create Lesson',
            description: 'Some Description...',
            lesson_saved_success_message: 'Lesson saved'
        },
        lesson_form: {
            manage_lesson: {
                title: "Manage Lesson"
            }
        }
    },
    student: {
        main_menu: {
            title: 'Main Menu',
            description: 'Some Description...'
        },
        lesson_page: {
            title: 'Lesson Page',
            description: 'Some Description...'
        }
    },
    shared: {
        lessons_page: {
            title: "Lessons"            
        }
    }
}

const LoginTypeEnum = Object.freeze({ logged_out: 0, teacher: 'teacher', student: 'student' }); // https://stackoverflow.com/a/5040502/109941, 06/27/2018
const LoginServiceEnum = Object.freeze({ logged_out: 0, google: 'google', facebook: 'facebook' }); // https://stackoverflow.com/a/5040502/109941, 06/27/2018

export {  
    Labels,
    LoginTypeEnum,
    LoginServiceEnum
};
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
        teachers: "Teachers",
        students: "Students",
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
            title: 'Lessons',
            description: 'Some Description...'
        },
        create_lesson_page: {
            title: 'Create Lesson',
            description: 'Some Description...',
            lesson_saved_success_message: 'Lesson saved'
        },
        lesson_form: {
            manage_lesson: {
                title: "Manage Lesson",
                preview: "Preview",
                edit: "Edit",
                complete_lesson: "Complete Lesson",
                lesson_author: "Lesson Author",
                book_title: "Book Title",
                book_amazon_url: "Amazon Url",
                main_idea: "Main Idea",
                supporting_idea: "Supporting Idea",
                you_tube_video_selection: {
                  column_headers: {
                    title: "Title",
                    description: "Description",
                    image: "Image"
                  },
                  title: "Choose a YouTube Video",
                  watch: "Watch"
                }
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

const LoginTypeEnum = Object.freeze({ logged_out: '', teacher: 'teacher', student: 'student' }); // https://stackoverflow.com/a/5040502/109941, 06/27/2018
const LoginServiceEnum = Object.freeze({ logged_out: 0, google: 'google', facebook: 'facebook' }); // https://stackoverflow.com/a/5040502/109941, 06/27/2018

export {
    Labels,
    LoginTypeEnum,
    LoginServiceEnum
};
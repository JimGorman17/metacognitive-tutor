const Labels = {
    app_title: 'Metacognitive Tutor', // Don't forget to change the title in index.html too. 
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
        log_in_as_a_teacher: 'Log in as a Teacher',
        log_in_as_a_student: 'Log in as a Student'
    },
    logout: {
        title: 'Logout'        
    },
    not_found: {
        title: '404 Page Not Found',
        message: 'Go back to homepage'
    }
}

const LoginTypeEnum = Object.freeze({ logged_out: 0, teacher: 1, student: 2 }); // https://stackoverflow.com/a/5040502/109941, 06/27/2018

export {  
    Labels,
    LoginTypeEnum
};
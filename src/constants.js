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
    not_found: {
        title: '404 Page Not Found',
        message: 'Go back to homepage'
    }
}

const LoginTypeEnum = Object.freeze({ teacher: {}, student: {} }); // https://stackoverflow.com/a/5040502/109941, 06/27/2018

export {  
    Labels,
    LoginTypeEnum
};
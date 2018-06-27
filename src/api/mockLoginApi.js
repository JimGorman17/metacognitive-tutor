import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const profiles = [ // https://developers.google.com/identity/sign-in/web/sign-in, https://gist.github.com/sleepingpig/afe590dad79433fbce7c62c2a72d64c9, 06/27/2018
    {
        Id: 1,
        Name: 'Anna Teacher',
        GivenName: 'Anna',
        FamilyName: 'Teacher',
        ImageUrl: '<some_image.png>',
        Email: 'anna@microsoft.com'
    },
    {
        Id: 1,
        Name: 'Hailee Student',
        GivenName: 'Hailee',
        FamilyName: 'Student',
        ImageUrl: '<some_image.png>',
        Email: 'hailee@microsoft.com'
    }
];

class LoginApi {
    static loginTeacher(/*teacher*/) {
        // teacher = Object.assign({}, teacher); // to avoid manipulating object passed in.
        return new Promise((resolve/*, reject*/) => {
            setTimeout(() => {
                // Simulate server-side validation
                resolve(profiles[0]);
            }, delay);            
        });
    }

    static loginStudent(/*student*/) {
        // student = Object.assign({}, student); // to avoid manipulating object passed in.
        return new Promise((resolve/*, reject*/) => {
            setTimeout(() => {
                // Simulate server-side validation
                resolve(profiles[1]);
            }, delay);            
        });
    }
}

export default LoginApi;

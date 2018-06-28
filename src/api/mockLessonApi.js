import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const lessons = [
  {
    id: "react-creating-reusable-components",
    title: "Creating Reusable React Components",
    watchHref: "http://pluralsight.com/courses/react-creating-reusable-components",
    authorId: "cory-house",
    length: "6:20",
    category: "JavaScript"
  },
  {
    id: "react-flux-building-applications",
    title: "Building Applications in React and Flux",
    watchHref: "http://www.pluralsight.com/courses/react-flux-building-applications",
    authorId: "cory-house",
    length: "5:08",
    category: "JavaScript"
  },
  {
    id: "clean-code",
    title: "Clean Code: Writing Code for Humans",
    watchHref: "http://www.pluralsight.com/courses/writing-clean-code-humans",
    authorId: "cory-house",
    length: "3:10",
    category: "Software Practices"
  },
  {
    id: "architecture",
    title: "Architecting Applications for the Real World",
    watchHref: "http://www.pluralsight.com/courses/architecting-applications-dotnet",
    authorId: "cory-house",
    length: "2:52",
    category: "Software Architecture"
  },
  {
    id: "career-reboot-for-developer-mind",
    title: "Becoming an Outlier: Reprogramming the Developer Mind",
    watchHref: "http://www.pluralsight.com/courses/career-reboot-for-developer-mind",
    authorId: "cory-house",
    length: "2:30",
    category: "Career"
  },
  {
    id: "web-components-shadow-dom",
    title: "Web Component Fundamentals",
    watchHref: "http://www.pluralsight.com/courses/web-components-shadow-dom",
    authorId: "cory-house",
    length: "5:10",
    category: "HTML5"
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (lesson) => {
  return replaceAll(lesson.title, ' ', '-');
};

class LessonApi {
  static getAllLessons() {
    return new Promise((resolve/*, reject*/) => {
      setTimeout(() => {
        resolve(Object.assign([], lessons));
      }, delay);
    });
  }

  static saveLesson(lesson) {
    lesson = Object.assign({}, lesson); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minLessonTitleLength = 1;
        if (lesson.title.length < minLessonTitleLength) {
          reject(`Lesson must be at least ${minLessonTitleLength} characters.`);
        }

        if (lesson.id) {
          const existingLessonIndex = lessons.findIndex(a => a.id == lesson.id);
          lessons.splice(existingLessonIndex, 1, lesson);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new courses in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          lesson.id = generateId(lesson);
          lesson.watchHref = `http://www.pluralsight.com/courses/${lesson.id}`;
          lessons.push(lesson);
        }

        resolve(lesson);
      }, delay);
    });
  }

  static deleteLesson(lessonId) {
    return new Promise((resolve/*, reject*/) => {
      setTimeout(() => {
        const indexOfLessonToDelete = lessons.findIndex(lesson => {
          return lesson.lessonId == lessonId;
        });
        lessons.splice(indexOfLessonToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default LessonApi;

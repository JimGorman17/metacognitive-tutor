import LessonModel from '../models/Lesson';
import YouTubeVideoModel from '../models/YouTubeVideo';
import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const lessons = [
  new LessonModel({
    BookTitle = "",
    BookAmazonUrl = "",
    TheHookYouTubeVideo = new YouTubeVideoModel({
      VideoId: "",
      Title: "",
      Description: "",
      ImageUrl: ""
    }),
    TheTwoVocabularyWordsYouTubeVideo = new YouTubeVideoModel({
      VideoId: "",
      Title: "",
      Description: "",
      ImageUrl: ""
    }),
    TheTwoVocabularyWordsEnunciationVideos = [
      new YouTubeVideoModel({
        VideoId: "",
        Title: "",
        Description: "",
        ImageUrl: ""
      }),
      new YouTubeVideoModel({
        VideoId: "",
        Title: "",
        Description: "",
        ImageUrl: ""
      })
    ],
    MainIdea = "",
    SupportingIdea = "",
    StoryDetails = [
      "",
      "",
      ""
    ],
    StoryQuestions = [
      "",
      "",
      ""
    ],
    ImportantSentencesForWordScramble = [
      "",
      "",
      ""
    ]
  })
];

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

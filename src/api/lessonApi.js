import LessonModel from '../models/Lesson';
import YouTubeVideoModel from '../models/YouTubeVideo';
import LoginModel from '../models/Login';
import {post} from '../apiWrapper';
import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const lessons = [
  new LessonModel({
    id: 1,
    BookTitle: "Bob Books, Set 1: Beginning Readers",
    BookAmazonUrl: "https://www.amazon.com/Bob-Books-Set-Beginning-Readers/dp/0439845009/ref=sr_1_3?ie=UTF8&qid=1531180222&sr=8-3&keywords=bob+books",
    TheHookYouTubeVideo: new YouTubeVideoModel({
      VideoId: "",
      Title: "",
      Description: "",
      ImageUrl: ""
    }),
    TheTwoVocabularyWordsYouTubeVideo: new YouTubeVideoModel({
      VideoId: "",
      Title: "",
      Description: "",
      ImageUrl: ""
    }),
    /*
    // TODO: Out-of-scope for now
    TheTwoVocabularyWordsEnunciationVideos: [
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
    */
    MainIdea: "Teach a child letter sounds with Bob Books Set 1! With four letters in the first story, children can read a whole book. Consistent new sounds are added gradually, until young readers have read books with all letters of the alphabet (except Q). Short vowels and three-letter words in simple sentences make Bob Books Set 1 a fun confidence builder. With little books, come big success. (TM)",
    SupportingIdea: "This is my supporting idea.",
    StoryDetails: [
    ],
    StoryQuestions: [
    ],
    ImportantSentencesForWordScramble: [
    ],
    LessonAuthor: new LoginModel({
      Name: "Jim Gorman",
      Email: "james.m.gorman@gmail.com",
      Provider: "google",
      ProviderId: "108290761639768371541",
      ProviderPic: "https://lh3.googleusercontent.com/-fB5ZaiCCqA0/AAAAAAAAAAI/AAAAAAAAH6Q/mrbHWDkDaKI/s96-c/photo.jpg"
    })
  }),
  new LessonModel({
    id: 2,
    BookTitle: "Bob Books Set 2: Advancing Beginners",
    BookAmazonUrl: "https://www.amazon.com/Bob-Books-Set-2-Advancing-Beginners/dp/0439845025/ref=sr_1_1?ie=UTF8&qid=1531183140&sr=8-1&keywords=bob+books+set+2",
    TheHookYouTubeVideo: new YouTubeVideoModel({
      VideoId: "",
      Title: "",
      Description: "",
      ImageUrl: ""
    }),
    TheTwoVocabularyWordsYouTubeVideo: new YouTubeVideoModel({
      VideoId: "",
      Title: "",
      Description: "",
      ImageUrl: ""
    }),
    /*
    // TODO: Out-of-scope for now
    TheTwoVocabularyWordsEnunciationVideos: [
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
    */
    MainIdea: "Bob Books Set 2-Advancing Beginners continues to build reading skills. Use of three-letter words and consistent vowel sounds in slightly longer stories build confidence. Children love the hilarious (and sometimes mischievous) stories and pictures. These twelve books, filled with fun, drama, and surprise keep interest high for even the youngest readers.",
    SupportingIdea: "This is my supporting idea. 2",
    StoryDetails: [
    ],
    StoryQuestions: [
    ],
    ImportantSentencesForWordScramble: [
    ],
    LessonAuthor: new LoginModel({
      Name: "Jim Gorman",
      Email: "james.m.gorman@gmail.com",
      Provider: "google",
      ProviderId: "108290761639768371541",
      ProviderPic: "https://lh3.googleusercontent.com/-fB5ZaiCCqA0/AAAAAAAAAAI/AAAAAAAAH6Q/mrbHWDkDaKI/s96-c/photo.jpg"
    })
  }),
  new LessonModel({
    id: 3,
    BookTitle: "Bob Books Set 3: Word Families",
    BookAmazonUrl: "https://www.amazon.com/Bob-Books-Set-Word-Families/dp/0439845092/ref=sr_1_1?ie=UTF8&qid=1531184647&sr=8-1&keywords=bob+books+set+3",
    TheHookYouTubeVideo: new YouTubeVideoModel({
      VideoId: "",
      Title: "",
      Description: "",
      ImageUrl: ""
    }),
    TheTwoVocabularyWordsYouTubeVideo: new YouTubeVideoModel({
      VideoId: "",
      Title: "",
      Description: "",
      ImageUrl: ""
    }),
    /*
    // TODO: Out-of-scope for now
    TheTwoVocabularyWordsEnunciationVideos: [
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
    */
    MainIdea: "Bob Books Set 3 adds something new for young readers. Consonant blends gently introduce new concepts to the progressing reader. Consistent vowel sounds and lots of three-letter-word practice mean your child continues to enjoy reading success. In addition to eight story books, two Activity Books are included, designed to entice youngsters to read, write, and solve puzzles.",
    SupportingIdea: "This is my supporting idea. 3",
    StoryDetails: [
    ],
    StoryQuestions: [
    ],
    ImportantSentencesForWordScramble: [
    ],
    LessonAuthor: new LoginModel({
      Name: "Allison Gorman",
      Email: "allisonbarry25@gmail.com",
      Provider: "facebook",
      ProviderId: "10156180360895358",
      ProviderPic: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10156180360895358&height=50&width=50&ext=1531443568&hash=AeT3HgoHhxLrgrCW"
    })
  }),
];

class LessonApi {
  static getAllLessons() {
    return new Promise((resolve/*, reject*/) => {
      setTimeout(() => {
        resolve(Object.assign([], lessons));
      }, delay);
    });
  }

  static saveLesson(lessonModel) {
    if (!(lessonModel instanceof LessonModel)) {
      throw 'payload is not of type LessonModel.';
    }

    return post(`lesson/upsert`, lessonModel);
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

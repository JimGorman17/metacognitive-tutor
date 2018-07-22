import YouTubeVideoModel from './YouTubeVideo';
import LoginModel from './Login';

export default class Lesson {
  constructor(params) {
    this.id = params ? params.id : 0;
    this.bookTitle = params ? params.bookTitle : '';
    this.bookAmazonUrl = params ? params.bookAmazonUrl : '';
    this.theHookYouTubeVideo = params && params.theHookYouTubeVideo ? new YouTubeVideoModel(params.theHookYouTubeVideo) : new YouTubeVideoModel();
    this.theTwoVocabularyWordsYouTubeVideo = params && params.theTwoVocabularyWordsYouTubeVideo ? new YouTubeVideoModel(params.theTwoVocabularyWordsYouTubeVideo) : new YouTubeVideoModel();
    this.mainIdea = params ? params.mainIdea : '';
    this.supportingIdea = params ? params.supportingIdea : '';
    this.storyDetails = params && params.storyDetails && params.storyDetails.constructor === Array ? params.storyDetails : [];
    this.storyQuestions = params && params.storyQuestions && params.storyQuestions.constructor === Array ? params.storyQuestions : [];
    this.importantSentencesForWordScramble = params && params.importantSentencesForWordScramble && params.importantSentencesForWordScramble.constructor === Array ? params.importantSentencesForWordScramble : [];
    this.lessonAuthor = params && params.lessonAuthor ? new LoginModel(params.lessonAuthor) : new LoginModel();
    this.numberOfEnrolledStudents = params ? params.numberOfEnrolledStudents : 0;

    this.provider = this.lessonAuthor ? this.lessonAuthor.provider : null;
    this.providerId = this.lessonAuthor ? this.lessonAuthor.providerId : null;
  }

  convertToApiReady(){
    return Object.assign({}, this, {
      theHookYouTubeVideo: JSON.stringify(this.theHookYouTubeVideo),
      theTwoVocabularyWordsYouTubeVideo: JSON.stringify(this.theTwoVocabularyWordsYouTubeVideo),
      storyDetails: JSON.stringify(this.storyDetails),
      storyQuestions: JSON.stringify(this.storyQuestions),
      importantSentencesForWordScramble: JSON.stringify(this.importantSentencesForWordScramble)
    });
  }
}
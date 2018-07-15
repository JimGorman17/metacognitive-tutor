import YouTubeVideoModel from '../models/YouTubeVideo';
import LoginModel from '../models/Login';

export default class Lesson {
  constructor(params) {
    this.id = params ? params.id : 0;
    this.bookTitle = params ? params.bookTitle : '';
    this.bookAmazonUrl = params ? params.bookAmazonUrl : '';
    this.theHookYouTubeVideo = params && params.theHookYouTubeVideo ? new YouTubeVideoModel(params.theHookYouTubeVideo) : new YouTubeVideoModel();
    this.theTwoVocabularyWordsYouTubeVideo = params && params.theTwoVocabularyWordsYouTubeVideo ? new YouTubeVideoModel(params.theTwoVocabularyWordsYouTubeVideo) : new YouTubeVideoModel();
    // TODO: Out-of-scope for now
    // this.theTwoVocabularyWordsEnunciationVideos = params && params.theTwoVocabularyWordsEnunciationVideos && params.theTwoVocabularyWordsEnunciationVideos.constructor === Array && params.theTwoVocabularyWordsEnunciationVideos.length === 2 && params.theTwoVocabularyWordsEnunciationVideos.every(v => v instanceof YouTubeVideoModel) ? params.theTwoVocabularyWordsEnunciationVideos : [];
    this.mainIdea = params ? params.mainIdea : '';
    this.supportingIdea = params ? params.supportingIdea : '';
    this.storyDetails = params && params.storyDetails && params.storyDetails.constructor === Array ? params.storyDetails : [];
    this.storyQuestions = params && params.storyQuestions && params.storyQuestions.constructor === Array ? params.storyQuestions : [];
    this.importantSentencesForWordScramble = params && params.importantSentencesForWordScramble && params.importantSentencesForWordScramble.constructor === Array ? params.importantSentencesForWordScramble : [];
    this.lessonAuthor = params && params.lessonAuthor ? new LoginModel(params.lessonAuthor) : new LoginModel();

    this.provider = this.lessonAuthor ? this.lessonAuthor.Provider : null;
    this.providerId = this.lessonAuthor ? this.lessonAuthor.ProviderId : null;
  }
}
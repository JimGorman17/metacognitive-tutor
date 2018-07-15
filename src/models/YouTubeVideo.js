export default class YouTubeVideo {
  constructor(params) {
      this.videoId = params ? params.videoId : '';
      this.url = params ? (params.url ? params.url : (params.videoId ? `https://www.youtube.com/watch?v=${params.videoId}`: "")): "";
      this.title = params ? params.title : '';
      this.description = params ? params.description : '';
      this.imageUrl = params ? params.imageUrl : '';
  }
}
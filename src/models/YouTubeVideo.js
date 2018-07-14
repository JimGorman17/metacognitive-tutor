export default class YouTubeVideo {
  constructor(params) {
      this.VideoId = params ? params.VideoId : '';
      this.Url = params ? (params.Url ? params.Url : (params.VideoId ? `https://www.youtube.com/watch?v=${params.VideoId}`: "")): "";
      this.Title = params ? params.Title : '';
      this.Description = params ? params.Description : '';
      this.ImageUrl = params ? params.ImageUrl : '';
  }
}
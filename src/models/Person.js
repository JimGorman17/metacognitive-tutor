export default class Person {
  constructor(params) {
      this.Name = params ? params.Name : '';
      this.Email = params ? params.Email : '';
      this.Provider = params ? params.Provider : '';
      this.ProviderId = params ? params.ProviderId : '';
      this.ProviderPic = params ? params.ProviderPic : '';
  }
}
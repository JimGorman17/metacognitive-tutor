export default class Login {
    constructor(params) {
        this.Name = params.Name;
        this.Token = params.Token;
        this.Email = params.Email;
        this.Provider = params.Provider;
        this.ProviderId = params.ProviderId;
        this.ProviderPic = params.ProviderPic;
        this.IsTeacher = params.IsTeacher;
        this.IsStudent = params.IsStudent;
    }    
}
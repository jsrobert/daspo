export class UserProfile {

    constructor(
        private givenName:string,
        private userName :string,
        private upn :string) {
    }
    getName() {
        return "Joe";
    }
}
export class AuthService {
    loggedIn = false;
    username = 'admin';
    password = 'password123';

    isAuthenticated() {
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.loggedIn);
                }, 800);
            }
        );
        return promise;
    }

    login(username, password) {
        if (username === this.username && password === this.password) {
            this.loggedIn = true;
        } else {
            this.loggedIn = false;
            alert('Invalid username or password');
        }
    }

    logout() {
        this.loggedIn = false;
    }
}

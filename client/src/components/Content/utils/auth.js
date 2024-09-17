import jwtDecode from "jwt-decode";

class AuthService {
    getProfile() {
        return jwtDecode(this.getToken());
    }

    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenEpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = jwtDecode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    getToken() {

        return localStorage.getItem('token');// token
    }

    login(idToken) {

        localStorage.setItem('token', idToken);
        window.location.assign('/app/search');
    }

    logout() {
        localStorage.removeItem('token');
        window.location.assign('/');
    }
}

export default new AuthService();

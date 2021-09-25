export default class AuthService {
  constructor(http, TokenStorage) {
    this.http = http;
    this.TokenStorage = TokenStorage;
  }

  async singup(username, password, name, email, url) {
    const data = await this.http.fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        name,
        email,
        url,
      }),
    });
    // jwt 토큰을 받아와서 로컬 스토리지에 세팅
    this.TokenStorage.saveToken(data.token);

    return data;
  }

  async login(username, password) {
    const data = await this.http.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });
    // jwt 토큰을 받아와서 로컬 스토리지에 세팅
    this.TokenStorage.saveToken(data.token);
    return data;
  }
  async me() {
    const token = this.TokenStorage.getToken();
    return this.http.fetch('/auth/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async logout() {
    this.TokenStorage.clearToken();
  }
}

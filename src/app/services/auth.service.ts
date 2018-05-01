import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { tokenNotExpired } from "angular2-jwt";

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) {}

  registerUser(user) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:5000/users/register", user, { headers: headers })
      .map(res => res.json());
  }
  // Authenticate User
  authenticateUser(user) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:5000/users/auth", user, {
        headers: headers
      })
      .map(res => res.json());
  }
  // Get profile
  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append("Authorization", this.authToken);
    headers.append("Content-Type", "application/json");
    return this.http
      .get("http://localhost:5000/users/profile", { headers: headers })
      .map(res => res.json());
  }
  //Load Token
  loadToken() {
    const token = localStorage.getItem("id_token");
    this.authToken = token;
    this.user = JSON.parse(localStorage.getItem("user"));
  }
  // Strore User Data
  storeUserData(token, user) {
    this.authToken = token;
    this.user = user;
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }
  //Logout function
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  // check for logged In User
  loggedIn() {
    return tokenNotExpired("id_token");
  }
  // get factory
  getUserFactory() {
    this.loadToken();
    return this.user.factory;
  }
}

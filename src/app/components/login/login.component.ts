import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  constructor(
    private auth: AuthService,
    private flashMsg: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit() {}

  onLogin() {
    if (this.username === "" && this.password === "") {
      this.flashMsg.show("Please Fill in all the credentials", {
        cssClass: "alert alert-danger",
        timeout: 4000
      });
    } else {
      const user = { username: this.username, password: this.password };
      // Authenticate
      this.auth.authenticateUser(user).subscribe(data => {
        console.log(data);
        if (data.success) {
          // Store user data
          this.auth.storeUserData(data.token, data.user);
          this.flashMsg.show("Welcome " + data.user.name, {
            cssClass: "alert alert-success",
            timeout: 4000
          });
          this.router.navigate(["/dashboard"]);
        } else {
          this.flashMsg.show(data.msg, {
            cssClass: "alert alert-danger",
            timeout: 4000
          });
          this.router.navigate(["/login"]);
        }
      });
    }
  }
}

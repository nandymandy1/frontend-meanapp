import { Component, OnInit } from "@angular/core";
import { ValidateService } from "../../services/validate.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FactoryService } from "../../services/factory.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  username: String;
  name: String;
  password: String;
  c_password: String;
  factory: String;
  jobTitle: String;
  email: String;
  factories: Object;

  jobs: Array<String> = [
    "Master",
    "Merchandiser",
    "Cutting",
    "Sewing",
    "Finishing",
    "Quality",
    "General"
  ];
  constructor(
    private validate: ValidateService,
    private flashMsg: FlashMessagesService,
    private auth: AuthService,
    private router: Router,
    private factoryService: FactoryService
  ) {}

  ngOnInit() {
    this.factoryService.fetchFactories().subscribe(
      res => {
        this.factories = res.factories;
      },
      err => {
        return false;
      }
    );
  }

  onRegister() {
    // If the password matches
    if (this.c_password === this.password && this.password != "") {
      const user = {
        name: this.name,
        username: this.username,
        factory: this.factory,
        jobTitle: this.jobTitle,
        password: this.password,
        email: this.email
      };
      // Validate the credentials
      if (!this.validate.validateRegister(user)) {
        this.flashMsg.show("Please Fill in all the credentials", {
          cssClass: "alert alert-danger",
          timeout: 4000
        });
        return false;
      }
      // Validdte Email
      if (!this.validate.validateEmail(user.email)) {
        this.flashMsg.show("Please Fill in a valid Email ID", {
          cssClass: "alert alert-danger",
          timeout: 4000
        });
        return false;
      }
      // register User
      this.auth.registerUser(user).subscribe(data => {
        if (data.success) {
          this.flashMsg.show("User Registration Successful", {
            cssClass: "alert alert-success",
            timeout: 4000
          });
          this.router.navigate(["/login"]);
        } else {
          this.flashMsg.show("User Registration Unsuccessful", {
            cssClass: "alert alert-danger",
            timeout: 4000
          });
          this.router.navigate(["/register"]);
        }
      });
    } else {
      this.flashMsg.show("Password Don't match", {
        cssClass: "alert alert-danger",
        timeout: 4000
      });
    }
  }
}

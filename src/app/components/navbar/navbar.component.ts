import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private flashMsg: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit() {}

  logout() {
    this.auth.logout();
    this.flashMsg.show("You are successfully logged out", {
      cssClass: "alert alert-danger",
      timeout: 4000
    });
    this.router.navigate(["/login"]);
  }
}

import { Component, OnInit } from "@angular/core";
import { FactoryService } from "../../services/factory.service";
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-cutting",
  templateUrl: "./cutting.component.html",
  styleUrls: ["./cutting.component.css"]
})
export class CuttingComponent implements OnInit {
  factory: String;
  breakups: Array<any>;
  comBreakups: Array<any>;
  constructor(
    private factService: FactoryService,
    private auth: AuthService,
    private flashMsg: FlashMessagesService
  ) {}

  ngOnInit() {
    // Set factory Id
    this.factory = this.auth.getUserFactory();
    // Fetch all the todays breakups
    this.factService.fetchTodaysOrderCut(this.factory).subscribe(
      res => {
        this.breakups = res;
      },
      err => {
        return false;
      }
    );

    // Fect Completed Order
    this.factService.fecthCompOrders(this.factory).subscribe(
      res => {
        this.comBreakups = res;
      },
      err => {
        return false;
      }
    );
  }

  // Complete Breakups
  completeBreakups(key, breakup) {
    this.factService.compBreakup(breakup).subscribe(
      res => {
        this.comBreakups.push(res.order_b);
        this.flashMsg.show("Order is Completed", {
          cssClass: "alert alert-success",
          timeout: 4000
        });
      },
      err => {
        return false;
      }
    );
    this.breakups.splice(key, 1);
  }
  // Sending the order to the supermarket
  sendingSuperMarket(key, id) {
    this.factService.sendToSupermarket(id).subscribe(res => {
      this.flashMsg.show(res.msg, {
        cssClass: "alert alert-success",
        timeout: 4000
      });
      this.comBreakups.splice(key, 1);
    });
  }
}

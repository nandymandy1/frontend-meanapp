import { Component, OnInit } from "@angular/core";
import { FactoryService } from "../../services/factory.service";
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-supermarket",
  templateUrl: "./Supermarket.component.html",
  styleUrls: ["./Supermarket.component.css"]
})
export class SupermarketComponent implements OnInit {
  factory: String;
  issue_id: String;
  quantity: Number;
  orders: Array<any>;
  constructor(
    private factService: FactoryService,
    private auth: AuthService,
    private flashMsg: FlashMessagesService
  ) {}

  ngOnInit() {
    // Set factory Id
    this.factory = this.auth.getUserFactory();
    // fetch all the orders from Supermarket
    this.factService.fetchSupermarket(this.factory).subscribe(
      res => {
        this.orders = res.order_b;
      },
      err => {
        return false;
      }
    );
  }
  // Issue Modal
  setOrder_id(key, id) {
    this.issue_id = id;
    this.quantity = 0;
  }

  //Issue to the sewing separtment
  importToSewing() {
    this.factService
      .sewingImport(this.issue_id, this.quantity)
      .subscribe(res => {
        if (res.success) {
          this.flashMsg.show(res.msg, {
            cssClass: "alert alert-success",
            timeout: 4000
          });
        }
      });
  }
}

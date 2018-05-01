import { Component, OnInit } from "@angular/core";
import { FactoryService } from "../../services/factory.service";
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-merchandiser",
  templateUrl: "./merchandiser.component.html",
  styleUrls: ["./merchandiser.component.css"]
})
export class MerchandiserComponent implements OnInit {
  addStyle: Boolean = false;
  addOrder: Boolean = false;
  addBreakup: Boolean = false;
  // New Style Object Vars
  style_name: String;
  brand_name: String;
  // New Order Object Vars
  order_name: String;
  quantity: Number;
  style_id: String;
  delivery_date: Date;
  // New Order_b Object Vars
  order_id: String;
  loading_date: Date;
  // General Objects
  orders: Array<any>;
  styles: Array<any>;
  breakups: Array<any> = [];
  factory: Array<any>;
  constructor(
    private factoryservice: FactoryService,
    private auth: AuthService,
    private flashMsg: FlashMessagesService
  ) {}

  ngOnInit() {
    // fecth orders
    this.factory = this.auth.getUserFactory();
    //Load Orders
    this.factoryservice.fetchOrders(this.factory).subscribe(
      res => {
        this.orders = res.orders;
        console.log(this.orders);
      },
      err => {
        return false;
      }
    );
    //Load Styles
    this.factoryservice.fetchStyles(this.factory).subscribe(
      res => {
        this.styles = res;
        console.log(this.styles);
      },
      err => {
        return false;
      }
    );
    // Load Breakups
    this.factoryservice.fetchBreakups(this.factory).subscribe(
      res => {
        this.breakups = res;
        console.log(this.breakups);
      },
      err => {
        return false;
      }
    );
  }
  onClickAddStyle() {
    this.addStyle = !this.addStyle;
  }
  onClickAddOrder() {
    this.addOrder = !this.addOrder;
  }
  onClickAddBreakup() {
    this.addBreakup = !this.addBreakup;
  }
  // Add Style
  styleSubmit() {
    const newStyle = {
      style_name: this.style_name,
      brand_name: this.brand_name,
      factory: this.factory
    };
    this.factoryservice.addStyle(newStyle).subscribe(data => {
      if (data.success) {
        this.flashMsg.show("Style Adding Successful", {
          cssClass: "alert alert-success",
          timeout: 4000
        });
        this.styles.unshift(data.style);
        this.style_name = "";
        this.brand_name = "";
      } else {
        this.flashMsg.show("Style Unsuccessful Addition", {
          cssClass: "alert alert-danger",
          timeout: 4000
        });
      }
    });
    this.addStyle = !this.addStyle;
  }
  //Delete Styles
  deleteStyles(key, style) {
    this.factoryservice.delStyle(style).subscribe(data => {
      if (data.success) {
        this.flashMsg.show("Style deletion Successful", {
          cssClass: "alert alert-success",
          timeout: 4000
        });
        this.styles.splice(key, 1);
      } else {
        this.flashMsg.show("Style deletion failed", {
          cssClass: "alert alert-danger",
          timeout: 4000
        });
      }
    });
  }
  submitOrder() {
    const newOrder = {
      order_name: this.order_name,
      quantity: this.quantity,
      style_id: this.style_id,
      delivery_date: this.delivery_date,
      factory: this.factory
    };
    this.factoryservice.addOrder(newOrder).subscribe(data => {
      console.log(data);
      if (data.success) {
        this.flashMsg.show("Order Adding Successful", {
          cssClass: "alert alert-success",
          timeout: 4000
        });
        console.log(data);
        this.orders.unshift(data.order);
        this.order_name = "";
        this.quantity = 0;
        this.style_id = "";
        this.delivery_date = null;
        this.addOrder = !this.addOrder;
      } else {
        this.flashMsg.show("Order Unsuccessful Addition", {
          cssClass: "alert alert-danger",
          timeout: 4000
        });
      }
    });
  }
  // Delete Orders
  deleteOrders(key, order) {
    this.factoryservice.delOrder(order).subscribe(data => {
      if (data.success) {
        this.flashMsg.show("Order deletion Successful", {
          cssClass: "alert alert-success",
          timeout: 4000
        });
        this.orders.splice(key, 1);
      } else {
        this.flashMsg.show("Order deletion failed", {
          cssClass: "alert alert-danger",
          timeout: 4000
        });
      }
    });
  }
  // Add Order Breakup
  submitBreakup() {
    const newBreakup = {
      order_id: this.order_id,
      quantity: this.quantity,
      loading_date: this.loading_date,
      factory: this.factory
    };
    this.factoryservice.addOrderBrekup(newBreakup).subscribe(data => {
      if (data.success) {
        this.flashMsg.show("Order Breakup Added Successfully", {
          cssClass: "alert alert-success",
          timeout: 4000
        });
        this.breakups.unshift(data.order_b);
        this.quantity = 0;
        this.order_id = "";
        this.loading_date = null;
      } else {
        this.flashMsg.show("Order Breakup Registration Failed", {
          cssClass: "alert alert-danger",
          timeout: 4000
        });
      }
    });
    this.addBreakup = !this.addBreakup;
  }
  // Delete Breakup
  deleteBreakup(key, breakup) {
    this.factoryservice.delBreakup(breakup).subscribe(data => {
      if (data.success) {
        this.flashMsg.show("Order Breakup deletion Successful", {
          cssClass: "alert alert-success",
          timeout: 4000
        });
        this.breakups.splice(key, 1);
      } else {
        this.flashMsg.show("Order Breakup deletion failed", {
          cssClass: "alert alert-danger",
          timeout: 4000
        });
      }
    });
  }
}

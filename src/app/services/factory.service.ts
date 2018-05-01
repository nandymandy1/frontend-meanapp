import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class FactoryService {
  constructor(private http: Http) {}

  // Fetch all the factories
  fetchFactories() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .get("http://localhost:5000/general/get/factories", { headers: headers })
      .map(res => res.json());
  }
  // fetch orders
  fetchOrders(factory) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .get("http://localhost:5000/orders/get/" + factory, {
        headers: headers
      })
      .map(res => res.json());
  }
  //fetch Styles
  fetchStyles(factory) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .get("http://localhost:5000/styles/get/" + factory, { headers: headers })
      .map(res => res.json());
  }
  // Fetch Order Breakups
  fetchBreakups(factory) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .get("http://localhost:5000/orders/breakup/get/" + factory, {
        headers: headers
      })
      .map(res => res.json());
  }
  // Add new Style
  addStyle(style) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:5000/styles/add", style, {
        headers: headers
      })
      .map(res => res.json());
  }
  // delete Styles
  delStyle(id) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .get("http://localhost:5000/styles/delete/" + id, {
        headers: headers
      })
      .map(res => res.json());
  }
  // Add Orders
  addOrder(order) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:5000/orders/add", order, { headers: headers })
      .map(res => res.json());
  }
  // Delete Order
  delOrder(id) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .get("http://localhost:5000/orders/delete/" + id, {
        headers: headers
      })
      .map(res => res.json());
  }
  // Order Breakup
  addOrderBrekup(order_b) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:5000/orders/breakup/add", order_b, {
        headers: headers
      })
      .map(res => res.json());
  }
  // Delete Breakups
  delBreakup(id) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .get("http://localhost:5000/orders/breakup/delete/" + id, {
        headers: headers
      })
      .map(res => res.json());
  }
  // Fetch Toady's Orderbreakups
  fetchTodaysOrderCut(factory) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .get("http://localhost:5000/orders/breakup/get/today/" + factory, {
        headers: headers
      })
      .map(res => res.json());
  }
  // Complete Breakup API Call
  compBreakup(id) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .get("http://localhost:5000/orders/breakup/get/completed/" + id, {
        headers: headers
      })
      .map(res => res.json());
  }
  // Get todays Completed Orders
  fecthCompOrders(factory) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .get(
        "http://localhost:5000/orders/breakup/get/completed/today/" + factory,
        {
          headers: headers
        }
      )
      .map(res => res.json());
  }
  sendToSupermarket(id) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .get("http://localhost:5000/orders//breakup/send/supermarket/" + id, {
        headers: headers
      })
      .map(res => res.json());
  }
  // get all the orders from supermarket
  fetchSupermarket(factory) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .get("http://localhost:5000/orders/get/supermarket/" + factory, {
        headers: headers
      })
      .map(res => res.json());
  }
  // sewing Import
  sewingImport(id, qty) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .get("http://localhost:5000/orders/issue/sewing/" + id + "/" + qty, {
        headers: headers
      })
      .map(res => res.json());
  }
}

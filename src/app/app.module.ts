import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";

import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomeComponent } from "./components/home/home.component";
import { ProfileComponent } from "./components/profile/profile.component";
// Funcionality Routes
import { MerchandiserComponent } from "./components/merchandiser/merchandiser.component";
import { CuttingComponent } from "./components/cutting/cutting.component";
import { CDashboardComponent } from "./components/c-dashboard/CDashboard.component";
import { SupermarketComponent } from "./components/supermarket/Supermarket.component";
// Services
import { ValidateService } from "./services/validate.service";
import { AuthService } from "./services/auth.service";
import { FlashMessagesModule } from "angular2-flash-messages";
import { FactoryService } from "./services/factory.service";
// AuthGuard
import { AuthGuard } from "./guards/auth.guard";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "cutting",
    component: CuttingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "cutting-dashboard",
    component: CDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "merchandiser",
    component: MerchandiserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "supermarket",
    component: SupermarketComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    ProfileComponent,
    MerchandiserComponent,
    CuttingComponent,
    CDashboardComponent,
    SupermarketComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ValidateService, AuthService, AuthGuard, FactoryService],
  bootstrap: [AppComponent]
})
export class AppModule {}

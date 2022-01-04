import { AuthService } from "./../../containers/services/auth/auth.service";
import { Component, OnInit } from "@angular/core";
import { navItems } from "../../_nav";

@Component({
  selector: "app-dashboard",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.css"],
})
export class LayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  currentUser: any = {};
  constructor(private authService: AuthService) {}

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getLocal();
    console.log(this.currentUser);
  }
  logout = () => {
    this.authService.logout();
  }
}

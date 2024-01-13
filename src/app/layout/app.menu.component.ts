import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { LayoutService } from "./service/app.layout.service";

@Component({
  selector: "app-menu",
  templateUrl: "./app.menu.component.html",
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
    this.model = [
      {
        label: "Home",
        items: [
          {
            label: "Dashboard",
            icon: "pi pi-fw pi-home",
            routerLink: ["/"],
          },
        ],
      },
      {
        label: "Products",
        items: [
          {
            label: "Products List",
            icon: "pi pi-fw pi-list",
            routerLink: ["/products"],
          },
          {
            label: "Products Overview",
            icon: "pi pi-fw pi-th-large",
            routerLink: ["/products/overview"],
          },
          {
            label: "Add Product",
            icon: "pi pi-fw pi-plus",
            routerLink: ["/products/new"],
          },
        ],
      },
      {
        label: "Orders",
        items: [
          {
            label: "Orders Overview",
            icon: "pi pi-fw pi-list",
            routerLink: ["/"],
          },
          {
            label: "Create Order",
            icon: "pi pi-fw pi-plus",
            routerLink: ["/"],
          },
          {
            label: "Order History",
            icon: "pi pi-fw pi-history",
            routerLink: ["/"],
          },
        ],
      },
      {
        label: "Offers / Promotions",
        items: [
          {
            label: "Offers Overview",
            icon: "pi pi-fw pi-star",
            routerLink: ["/"],
          },
          {
            label: "Start Promotion",
            icon: "pi pi-fw pi-plus",
            routerLink: ["/"],
          },
          {
            label: "Promotions History",
            icon: "pi pi-fw pi-history",
            routerLink: ["/"],
          },
        ],
      },
      {
        label: "Users / Accounts",
        items: [
          {
            label: "Users List",
            icon: "pi pi-fw pi-users",
            routerLink: ["/"],
          },
          {
            label: "Add User",
            icon: "pi pi-fw pi-user-plus",
            routerLink: ["/"],
          },
        ],
      },
      {
        label: "Customers",
        items: [
          {
            label: "Customers Overview",
            icon: "pi pi-fw pi-users",
            routerLink: ["/"],
          },
          {
            label: "Create Customer Account",
            icon: "pi pi-fw pi-user-plus",
            routerLink: ["/"],
          },
        ],
      },
      {
        label: "Settings",
        items: [
          {
            label: "My Profile",
            icon: "pi pi-fw pi-user",
            routerLink: ["/profile"],
          },
        ],
      },
      {
        label: "UI Components",
        items: [
          {
            label: "Table",
            icon: "pi pi-fw pi-table",
            routerLink: ["/uikit/table"],
          },
          {
            label: "Panel",
            icon: "pi pi-fw pi-tablet",
            routerLink: ["/uikit/panel"],
          },
          {
            label: "Overlay",
            icon: "pi pi-fw pi-clone",
            routerLink: ["/uikit/overlay"],
          },
          {
            label: "Media",
            icon: "pi pi-fw pi-image",
            routerLink: ["/uikit/media"],
          },
          {
            label: "Menu",
            icon: "pi pi-fw pi-bars",
            routerLink: ["/uikit/menu"],
            routerLinkActiveOptions: {
              paths: "subset",
              queryParams: "ignored",
              matrixParams: "ignored",
              fragment: "ignored",
            },
          },
          {
            label: "Chart",
            icon: "pi pi-fw pi-chart-bar",
            routerLink: ["/uikit/charts"],
          },
          {
            label: "Misc",
            icon: "pi pi-fw pi-circle",
            routerLink: ["/uikit/misc"],
          },
        ],
      },
      {
        label: "Pages",
        icon: "pi pi-fw pi-briefcase",
        items: [
          {
            label: "Landing",
            icon: "pi pi-fw pi-globe",
            routerLink: ["/landing"],
          },
          {
            label: "Auth",
            icon: "pi pi-fw pi-user",
            items: [
              {
                label: "Login",
                icon: "pi pi-fw pi-sign-in",
                routerLink: ["/auth/login"],
              },
              {
                label: "Error",
                icon: "pi pi-fw pi-times-circle",
                routerLink: ["/auth/error"],
              },
              {
                label: "Access Denied",
                icon: "pi pi-fw pi-lock",
                routerLink: ["/auth/access"],
              },
            ],
          },
          {
            label: "Crud",
            icon: "pi pi-fw pi-pencil",
            routerLink: ["/pages/crud"],
          },
          {
            label: "Not Found",
            icon: "pi pi-fw pi-exclamation-circle",
            routerLink: ["/notfound"],
          },
          {
            label: "Empty",
            icon: "pi pi-fw pi-circle-off",
            routerLink: ["/pages/empty"],
          },
        ],
      },
      {
        label: "Hierarchy",
        items: [
          {
            label: "Submenu 1",
            icon: "pi pi-fw pi-bookmark",
            items: [
              {
                label: "Submenu 1.1",
                icon: "pi pi-fw pi-bookmark",
                items: [
                  { label: "Submenu 1.1.1", icon: "pi pi-fw pi-bookmark" },
                  { label: "Submenu 1.1.2", icon: "pi pi-fw pi-bookmark" },
                  { label: "Submenu 1.1.3", icon: "pi pi-fw pi-bookmark" },
                ],
              },
              {
                label: "Submenu 1.2",
                icon: "pi pi-fw pi-bookmark",
                items: [
                  { label: "Submenu 1.2.1", icon: "pi pi-fw pi-bookmark" },
                ],
              },
            ],
          },
          {
            label: "Submenu 2",
            icon: "pi pi-fw pi-bookmark",
            items: [
              {
                label: "Submenu 2.1",
                icon: "pi pi-fw pi-bookmark",
                items: [
                  { label: "Submenu 2.1.1", icon: "pi pi-fw pi-bookmark" },
                  { label: "Submenu 2.1.2", icon: "pi pi-fw pi-bookmark" },
                ],
              },
              {
                label: "Submenu 2.2",
                icon: "pi pi-fw pi-bookmark",
                items: [
                  { label: "Submenu 2.2.1", icon: "pi pi-fw pi-bookmark" },
                ],
              },
            ],
          },
        ],
      },
    ];
  }
}

import { serviceIcon, UsersIcon } from "./variables";

export const categoryLinks = {
    header: "Categories",
    baseRoute: "/categories",
    headerIcon: [serviceIcon],
    nestedLinks: [
      {
        label: "Categories", link: "/categories", icon: [serviceIcon],
      },
      {
        label: "Create Category", link: "/categories/create-category", icon: [serviceIcon],
      },
    ]
  }

  export const productLinks = {
    header: "Products",
    baseRoute: "/products",
    headerIcon: [serviceIcon],
    nestedLinks: [
      {
        label: "Products", link: "/products", icon: [serviceIcon],
      },
      {
        label: "Create Product", link: "/products/create-product", icon: [serviceIcon],
      },
    ]
  }

  export const usersLinks = {
    header: "Users",
    baseRoute: "/users",
    headerIcon: [UsersIcon],

    nestedLinks: { label: "Users List", link: "/users" }
  }
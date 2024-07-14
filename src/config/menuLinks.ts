import { serviceIcon } from "./variables";

export const websiteLinks = {
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
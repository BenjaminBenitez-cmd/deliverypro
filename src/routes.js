import Account from "views/Account";
import CreateDelivery from "views/CreateDelivery";
import Customers from "views/Customers";
import Dashboard from "views/Dashboard.js";
import Deliveries from "views/Deliveries";
import Drivers from "views/Drivers";
import Map from "views/Map.js";
import Schedule from "views/Schedule";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/map",
    name: "Map",
    rtlName: "خرائط",
    icon: "tim-icons icon-pin",
    component: Map,
    layout: "/admin",
  },
  {
    path: "/deliveries",
    name: "Deliveries",
    icon: "tim-icons icon-notes",
    component: Deliveries,
    layout: "/admin",
  },
  {
    path: "/createdelivery",
    name: "Create Delivery",
    icon: "tim-icons icon-notes",
    component: CreateDelivery,
    layout: "/admin",
    redirect: true,
  },
  {
    path: "/drivers",
    name: "Drivers",
    icon: "tim-icons icon-delivery-fast",
    component: Drivers,
    layout: "/admin",
  },
  {
    path: "/customer",
    name: "Customers",
    icon: "tim-icons icon-delivery-fast",
    component: Customers,
    layout: "/admin",
  },
  {
    path: "/schedule",
    name: "Schedule",
    icon: "tim-icons icon-calendar-60",
    component: Schedule,
    layout: "/admin",
  },
  {
    path: "/account",
    name: "Account",
    icon: "tim-icons icon-calendar-60",
    component: Account,
    layout: "/admin",
    redirect: true,
  },
];
export default routes;

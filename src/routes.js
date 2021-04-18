import CreateDelivery from "views/CreateDelivery";
import Dashboard from "views/Dashboard.js";
import Deliveries from "views/Deliveries";
import Drivers from "views/Drivers";
import Map from "views/Map.js";
import Typography from "views/Typography.js";

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
    name: 'Create Delivery',
    icon: "tim-icons icon-notes",
    component: CreateDelivery,
    layout: "/admin",
    redirect: true,
  },
  {
    path: "/drivers",
    name: 'Drivers',
    icon: "tim-icons icon-delivery-fast",
    component: Drivers,
    layout: "/admin",
  },
];
export default routes;

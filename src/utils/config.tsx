import { Color, Weekday } from "../redux/redux";

export default {
  appName: "Trackme",
  githubName: "lucaslmlok",
  githubProfile: "https://github.com/lucaslmlok",
  githubRepo: "https://github.com/lucaslmlok/trackme-frontend",
  apiPath: "http://localhost:5000",
  drawerWidth: 240,
  dateFormat: "yyyy-MM-DD",
};

export const ActionTypes = {
  yesNo: "Yes / No",
  number: "Quantity",
};

export const Colors: Color[] = [
  "deepPurple",
  "indigo",
  "blue",
  "lightBlue",
  "cyan",
  "teal",
  "green",
  "lightGreen",
  "lime",
  "yellow",
  "amber",
  "orange",
  "red",
  "pink",
  "purple",
  "deepOrange",
  "brown",
  "grey",
  "blueGrey",
];

export const Icons = [
  "king_bed",
  "hiking",
  "local_dining",
  "local_bar",
  "local_cafe",
  "pool",
  "directions_run",
  "fastfood",
  "directions_bike",
  "computer",
  "favorite",
  "local_pizza",
  "sports_soccer",
  "fitness_center",
  "videogame_asset",
  "alarm_on",
  "menu_book",
  "headset",
  "commute",
  "flight",
  "shopping_cart",
  "local_atm",
];

export const Weekdays: Weekday[] = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
];

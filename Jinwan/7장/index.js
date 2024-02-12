import App from "./components/App.js";
import DomAPI from "./utils/DomAPI.js";

const _ = new DomAPI();
const $root = _.$("#root");

const app = new App($root);

console.log(app.target);

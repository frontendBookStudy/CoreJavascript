import DomAPI from "../utils/DomAPI.js";
import Component from "./Component.js";
import ListContainer from "./ListContainer.js";

class App extends Component {
  constructor(target) {
    super(target);
    this.render();
  }

  render() {
    const _ = new DomAPI();
    const $div = _.$c("div");

    new ListContainer($div);
    this.tmpl = $div;
    this._render();
  }
}

export default App;

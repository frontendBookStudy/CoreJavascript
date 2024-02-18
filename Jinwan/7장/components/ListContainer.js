import DomAPI from "../utils/DomAPI.js";
import Component from "./Component.js";
import ListItem from "./ListItem.js";
class ListContainer extends Component {
  constructor(target) {
    super(target);
    this.state = [
      { title: "test", id: 0 },
      { title: "test", id: 1 },
      { title: "test", id: 2 },
    ];
    this.render();
  }

  render() {
    const _ = new DomAPI();
    const $ul = _.$c("ul");
    const $li = _.$c("li");
    this.state.map((item) =>
      $ul.appendChild(
        new ListItem($li, {
          ...item,
          deleteItem: this.deleteItem,
        }).getTmpl()
      )
    );

    this.tmpl = $ul;

    this._render();
  }
  setState = (newState) => {
    this.state = newState;
    console.log(newState);
    this.render();
  };
  deleteItem = (id) => {
    this.setState(this.state?.filter((item) => item.id !== id));
  };
}
export default ListContainer;

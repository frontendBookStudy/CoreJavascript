import DomAPI from "../utils/DomAPI.js";
import Component from "./Component.js";

class ListItem extends Component {
  constructor(target, props) {
    super(target, props);

    this.render();
  }

  render() {
    const _ = new DomAPI();
    const $li = _.$c("li");
    const $btn = _.$c("button");
    $btn.innerText = "delete";
    $li.innerHTML = `<span>${this.props.title}</span>`;
    $li.appendChild($btn);
    this.addEvents($btn);
    this.tmpl = $li;
    this._render();
  }

  addEvents($el) {
    console.log($el);
    $el?.addEventListener("click", () => {
      this.props.deleteItem(this.props.id);
    });
  }
}
export default ListItem;

class Component {
  constructor(target = null, props) {
    this.target = target;
    this.props = props;
    this.tmpl = "";
  }

  getTmpl() {
    return this.tmpl;
  }

  _render() {
    if (this.target) {
      if (typeof this.tmpl === "string") this.target.innerHTML = this.tmpl;
      else {
        this.target.innerHTML = "";
        this.target.append(this.tmpl);
      }
    }
  }
}

export default Component;

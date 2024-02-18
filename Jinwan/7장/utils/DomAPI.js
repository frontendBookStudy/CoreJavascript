class DomAPI {
  constructor() {}

  $(selector) {
    return document.querySelector(selector);
  }

  $a(selector) {
    return document.querySelectorAll(selector);
  }

  $c(tagName) {
    return document.createElement(tagName);
  }
}

export default DomAPI;

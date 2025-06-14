class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems() {
    this._items.forEach((item) => {
      let todoElement = this._renderer(item);
      this.addItem(todoElement);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}

export default Section;

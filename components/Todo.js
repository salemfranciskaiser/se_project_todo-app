class Todo {
  constructor(data, selector, handleToggleComplete, handleDelete) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleToggleComplete = handleToggleComplete;
    this._handleDelete = handleDelete;
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _setEventListeners() {
    // Checkbox toggling
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = this._todoCheckboxEl.checked;
      this._handleToggleComplete(this._todoCheckboxEl.checked);
    });

    // Delete button
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      if (this._handleDelete) {
        this._handleDelete(this._data.completed);
      }
    });
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    this._todoNameEl.textContent = this._data.name;

    if (this._data.date instanceof Date && !isNaN(this._data.date)) {
      this._todoDate.textContent = this._data.date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } else {
      this._todoDate.textContent = "";
    }

    this._generateCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;

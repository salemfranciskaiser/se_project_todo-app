import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";


import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";

const addTodoForm = document.forms["add-todo-form"];

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = new Todo(
      item,
      "#todo-template",
      (isChecked) => {
        counter.updateCompleted(isChecked);
      },
      (wasCompleted) => {
        counter.updateTotal(false);
        if (wasCompleted) {
          counter.updateCompleted(false);
        }
      }
    );
    const todoElement = todo.getView();
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

section.renderItems();
const counter = new TodoCounter(initialTodos, ".counter__text");

const popupWithForm = new PopupWithForm("#add-todo-popup", (inputData) => {
  const newTodo = {
    name: inputData.name,
    date: new Date(inputData.date),
    id: uuidv4(),
    completed: false,
  };

  const todo = new Todo(
    newTodo,
    "#todo-template",
    (isChecked) => {
      counter.updateCompleted(isChecked);
    },
    (wasCompleted) => {
      counter.updateTotal(false);
      if (wasCompleted) {
        counter.updateCompleted(false);
      }
    }
  );

  const todoElement = todo.getView();
  section.addItem(todoElement);
  counter.updateTotal(true);
});

popupWithForm.setEventListeners();

addTodoButton.addEventListener("click", () => {
  popupWithForm.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

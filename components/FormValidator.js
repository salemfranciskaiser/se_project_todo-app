class FormValidator {
  constructor(settings, formEl) {
    this._formEl = formEl;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
  }

  _showInputError(input) {
    const errorEl = this._formEl.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorEl.textContent = input.validationMessage;
    errorEl.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    const errorEl = this._formEl.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorEl.textContent = "";
    errorEl.classList.remove(this._errorClass);
  }

  _checkInputValidity(input) {
    input.validity.valid
      ? this._hideInputError(input)
      : this._showInputError(input);
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => !input.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );
    this._toggleButtonState();

    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.resetValidation();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._formEl.reset();
    this._inputList.forEach((input) => this._hideInputError(input));
    this._toggleButtonState();
  }
}

export default FormValidator;

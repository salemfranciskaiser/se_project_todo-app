class FormValidator {
    constructor(settings, formEl) {
        this.settings = settings;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._errorClass = settings.errorClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this.formEl = formEl; 
        
        console.log(settings);
        console.log(formEl);
    }
    enableValidatetion() {}
}

export default FormValidator;
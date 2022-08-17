import throttle from "lodash.throttle";

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input');
const message = document.querySelector('textarea');
const STORAGE_KEY = "feedback-form-state";
const formData = {
    email: "",
    message: "",
};

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 1000));
addEventListener("DOMContentLoaded", getLocalForm);


function onFormSubmit(e) {
    e.preventDefault();
    const formElements = e.currentTarget.elements;
    const email = formElements.email.value;
    const message = formElements.message.value;

    if (formData.email !== "" && formData.message !== "") {
        const formDataSubmit = {email, message};
        console.log(formDataSubmit);
        
        e.currentTarget.reset();
        localStorage.removeItem(STORAGE_KEY);
        formData.email = "";
        formData.message = "";
    } else {
        alert("Напишіть Ваше повідомлення");
    }
}

function onFormInput(e) {
    formData[e.target.name] = e.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function getLocalForm() {
    const localFormMessage = localStorage.getItem(STORAGE_KEY);
    try {
        const savedForm = JSON.parse(localFormMessage);
        if (localFormMessage) {
            email.value = savedForm.email;
            message.value = savedForm.message;
            formData.email = savedForm.email;
            formData.message = savedForm.message;
        }
    } catch (error) {
        console.log("parse error");
    }
}

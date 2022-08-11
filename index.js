const form = document.querySelector("form[name='myForm']");
const firstNameInput = document.querySelector("input[name='first_name']");
const lastNameInput = document.querySelector("input[name='last_name']");
const emailInput = document.querySelector("input[name='email']");
const phoneInput = document.querySelector("input[name='phone']");
const sellInput = document.querySelector("select[name='sell']");
const businessTypeInput = document.querySelector(
  "select[name='business_type']"
);
const salesTypeInput = document.querySelector("select[name='monthly_sales']");
const agreeInput = document.querySelector("input[name='agree']");
const businessManagement = document.forms['myForm']['business'];

// radio button error field
const radioErrorEle = document.getElementById('business_err');
const agreeErrorEle = document.getElementById('agree_err');

firstNameInput.isValid = () => !!firstNameInput.value;
lastNameInput.isValid = () => !!lastNameInput.value;
emailInput.isValid = () => isValidEmail(emailInput.value);
phoneInput.isValid = () => isValidPhone(phoneInput.value);
sellInput.isValid = () => !!sellInput.value;
businessTypeInput.isValid = () => !!businessTypeInput.value;
salesTypeInput.isValid = () => !!salesTypeInput.value;
agreeInput.isValid = () => agreeInput.checked;

const inputFields = [
  firstNameInput,
  lastNameInput,
  emailInput,
  phoneInput,
  sellInput,
  businessTypeInput,
  salesTypeInput
];

const isValidEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const isValidPhone = (phone) => {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(String(phone).toLowerCase());
};

let shouldValidate = false;
let isFormValid = false;

const validateInputs = () => {
  if (!shouldValidate) return;

  isFormValid = true;
  inputFields.forEach((input) => {
    input.classList.remove("invalid");
    input.nextElementSibling.classList.add("hide");

    if (!input.isValid()) {
      input.classList.add("invalid");
      isFormValid = false;
      input.nextElementSibling.classList.remove("hide");
    }
  });

  if (!businessManagement.value) {
    isFormValid = false;
    radioErrorEle.classList.remove("hide");
  } else {
    radioErrorEle.classList.add("hide");    
  }

  if (!agreeInput.isValid()) {
    isFormValid = false;
    agreeErrorEle.classList.remove("hide");
  } else {
    agreeErrorEle.classList.add("hide");    
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  shouldValidate = true;
  validateInputs();
  if (isFormValid) {
    const formData = {
      first_name: firstNameInput.value,
      last_name: lastNameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      sell: sellInput.value,
      business_type: businessTypeInput.value,
      sales_type: salesTypeInput.value,
      businessManagement: businessManagement.value,
      agree: agreeInput.value
    }
    localStorage.setItem('form data', JSON.stringify(formData));
    alert('Form submitted successfully');
    window.location.reload();
  }
});

inputFields.forEach((input) => input.addEventListener("input", validateInputs));
agreeInput.addEventListener("input", validateInputs);
document.querySelectorAll("input[name='business']").forEach((radio) => radio.addEventListener("input", validateInputs))

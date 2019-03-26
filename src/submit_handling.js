"use strict";

let form = null;
let type = null;

const validateForm = () => {
  console.log(form.validator('validate'));
};

const constructor = (options) => {
  form = options.form;
  type = options.type;
  return validateForm();
};

export default constructor;

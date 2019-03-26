"use strict";

import { ACTION_TYPES, ACTION_TYPES_IDS } from './constants/action_types';
import { EXIT_CODES } from './constants/exit_codes';
import { exit } from './error_handling';

const { REGISTER } = ACTION_TYPES;
const { E008 } = EXIT_CODES;

let form = null;
let submitButton = null;
let type = null;

const setLoadingState = (isLoading) => {
  submitButton.prop('disabled', isLoading);
};

const handleRegistration = () => {
  setLoadingState(true);
};

const checkType = () => {
  switch (type) {
    case ACTION_TYPES_IDS[REGISTER]:
      handleRegistration();
      break;
    default:
      exit(E008);
  }
};

const validateForm = () => {
  form.validator('validate');
  submitButton = form.find(':submit');
  if (!submitButton.hasClass('disabled')) {
    checkType();
  }
};

const constructor = (options) => {
  form = options.form;
  type = options.type;
  validateForm();
};

export default constructor;

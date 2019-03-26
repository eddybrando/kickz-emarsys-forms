"use strict";

import { ACTION_TYPES, ACTION_TYPES_IDS } from './constants/action_types';
import { EXIT_CODES } from './constants/exit_codes';
import { exit } from './error_handling';

const { REGISTER } = ACTION_TYPES;
const { E008 } = EXIT_CODES;

let $ = null;
let fields = null;
const fieldsEnhanced = [];
let form = null;
let submitButton = null;
let type = null;

const setLoadingState = (isLoading) => {
  submitButton.prop('disabled', isLoading);
};

const setFieldsEnhanced = () => {
  fields.forEach((field) => {
    const id = field.id;
    fieldsEnhanced.push({
      id,
      value: $(`#${id}`).val(),
    });
  });
};

const handleRegistration = () => {
  setLoadingState(true);
  setFieldsEnhanced();
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

const constructor = (options, _$) => {
  $ = _$;
  fields = options.fields;
  form = options.form;
  type = options.type;
  validateForm();
};

export default constructor;

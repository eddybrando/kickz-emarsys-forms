"use strict";

import { ACTION_TYPES, ACTION_TYPES_IDS } from './constants/action_types';
import { EXIT_CODES } from './constants/exit_codes';
import { registerContact } from './axios_calls';
import { exit } from './error_handling';

const { REGISTER } = ACTION_TYPES;
const { E008, E010, W001, W002 } = EXIT_CODES;

let $ = null;
let domErrorMsg = null;
let domSuccessMsg = null;
let fields = null;
const fieldsEnhanced = [];
let form = null;
let formId = null;
const payload = {
  contact: {},
};
let submitButton = null;
let type = null;

const setLoadingState = (isLoading) => {
  submitButton.prop('disabled', isLoading);
};

const constructPayloadForRegisterContact = (_fieldsEnhanced) => {
  _fieldsEnhanced.forEach((field) => {
    if (field.value || field.nullable) {
      payload.contact[field.emarsysId] = field.value;
    }
  });
  registerContact(payload.contact);
};

const setFieldsEnhanced = () => {
  fields.forEach((field) => {
    const id = field.id;
    const emarsysId = field.emarsysId;
    if (id === undefined || emarsysId === undefined) {
      exit(E010);
    }
    fieldsEnhanced.push({
      id,
      emarsysId,
      nullable: field.nullable || false,
      value: $(`#${id}`).val(),
    });
  });
  constructPayloadForRegisterContact(fieldsEnhanced);
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
  formId = options.formId;
  type = options.type;
  validateForm();
};

export const handleError = () => {
  const _domErrorMsg = $(`#${formId}-error`);
  form.hide();
  if (!_domErrorMsg) {
    exit(W001);
  } else {
    domErrorMsg = _domErrorMsg;
    setTimeout(() => {
      domErrorMsg.show();
    }, 200);
  }
};

export const handleSuccess = () => {
  const _domSuccessMsg = $(`#${formId}-error`);
  form.hide();
  if (!_domSuccessMsg) {
    exit(W002);
  } else {
    domSuccessMsg = _domSuccessMsg;
    setTimeout(() => {
      domSuccessMsg.show();
    }, 200);
  }
};

export default constructor;

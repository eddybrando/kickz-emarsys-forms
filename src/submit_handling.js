"use strict";

import axios from 'axios';
import { ACTION_TYPES, ACTION_TYPES_IDS } from './constants/action_types';
import { EMARSYS_ERROR_CODES, EMARSYS_ERROR_CODE_IDS } from './constants/emarsys_error_codes';
import { EXIT_CODES } from './constants/exit_codes';
import { exit } from './error_handling';

const { REGISTER } = ACTION_TYPES;
const { ALREADY_EXISTS } = EMARSYS_ERROR_CODES;
const { E008, E010 } = EXIT_CODES;

let $ = null;
let fields = null;
const fieldsEnhanced = [];
let form = null;
const ga = window.ga;
const payload = [];
let submitButton = null;
let type = null;

const setLoadingState = (isLoading) => {
  submitButton.prop('disabled', isLoading);
};

const registerContact = (_payload) => {
  axios.post("api/forward-emarsys", {
    data: {
      method: "POST",
      payload: {
        contacts: [_payload,],
      },
      target: "https://api.emarsys.net/api/v2/contact",
    },
  }).then((res) => {
    const data = res.data.data.data;
    if (data.errors &&
      !!data.errors[Object.keys(data.errors)[0]][EMARSYS_ERROR_CODE_IDS[ALREADY_EXISTS]]) {
      // updateContactViaApi();
    } else {
      ga("send", "event", "NewsletterSignUp", "sign up", "Gender:X || " + window.location.pathname);
      // sendDoi();
    }
  }).catch((e) => {
    console.warn(e);
    // handleError();
  });
};

const constructPayloadForRegisterContact = (_fieldsEnhanced) => {
  _fieldsEnhanced.forEach((field) => {
    if (field.value || field.nullable) {
      payload[field.emarsysId] = field.value;
    }
  });
  registerContact(payload);
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
  type = options.type;
  validateForm();
};

export default constructor;

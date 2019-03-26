"use strict";

import axios from 'axios';
import validator from 'bootstrap-validator';
import { EXIT_CODES } from './constants/exit_codes';
import { exit } from './error_handling';
import handleSubmit from './submit_handling';

const { E001, E002, E003, E004, E005, E006, E007 } = EXIT_CODES;

let $ = null;
let form = null;
let formId = null;
let type = null;

const setSubmitListener = () => {
  form.on('submit', (e) => {
    e.preventDefault();
    handleSubmit({ form, type, });
  });
  return { success: true, };
};

const initAxios = () => {
  if (!axios) {
    return exit(E006);
  }
  return setSubmitListener();
};

const setupValidation = () => {
  try {
    form.validator();
    return initAxios();
  } catch (e) {
    return exit(E005, e);
  }
};

const initValidation = () => {
  if (!validator) {
    return exit(E005);
  }
  return setupValidation();
};

const setForm = () => {
  const _form = $(`#${formId}`);
  if (!_form.length) {
    return exit(E004);
  }
  form = _form;
  return initValidation();
};

const setJquery = () => {
  const _$ = window.$;
  if (!_$) {
    return exit(E002);
  }
  $ = _$;
  return setForm();
};

const handleMissingParameterExit = (options) => {
  if (!options.formId) {
    return exit(E001);
  } else if (!options.type) {
    return exit(E007);
  }
};

const setupOptions = (options) => {
  formId = options.formId;
  type = options.type;
};

const setup = (options) => {
  if (!options) {
    return exit(E003);
  } else if (!options.formId || !options.type) {
    return handleMissingParameterExit(options);
  }
  setupOptions(options);
  return setJquery();
};

export default { setup, };

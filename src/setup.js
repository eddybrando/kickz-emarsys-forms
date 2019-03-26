"use strict";

import axios from 'axios';
import validator from 'bootstrap-validator';
import { EXIT_CODES } from './constants/exit_codes';
import { exit } from './error_handling';

const { E001, E002, E003, E004, E005, E006 } = EXIT_CODES;

let $ = null;
let form = null;
let formId = null;

const todo = () => {
  // TODO
  return { success: true, };
};

const initAxios = () => {
  if (!axios) {
    return exit(E006);
  }
  return todo();
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

const setup = (options) => {
  if (!options) {
    return exit(E003);
  } else if (!options.formId) {
    return exit(E001);
  }
  formId = options.formId;
  return setJquery();
};

export default { setup, };

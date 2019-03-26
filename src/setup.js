"use strict";

import { EXIT_CODES } from './constants/exit_codes';
import { exit } from './error_handling';

const { E001, E002, E003, E004 } = EXIT_CODES;

let $ = null;
let form = null;
let formId = null;

const todo = () => {
  // TODO
  return { success: true, };
};


const setForm = () => {
  const _form = $(`#${formId}`);
  if (!_form.length) {
    return exit(E004);
  }
  form = _form;
  return todo();
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

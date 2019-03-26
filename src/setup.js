"use strict";

import { EXIT_CODE_MESSAGES, EXIT_CODES } from './constants/exit_codes';

const { E001, E002, E003 } = EXIT_CODES;

let $ = null;
let formId = null;

const exit = (code) => {
  const log = `${code}: ${EXIT_CODE_MESSAGES[code]}`;
  if (code.charAt(0) === 'E') {
    console.error(log);
  } else {
    console.warn(log);
  }
  return { success: false, error: code, };
};

const todo = () => {
  // TODO
  return { success: true, };
};

const setupJquery = () => {
  const _$ = window.$;
  if (!_$) {
    return exit(E002);
  }
  $ = _$;
  return todo();
};

const setup = (options) => {
  if (!options) {
    return exit(E003);
  } else if (!options.formId) {
    return exit(E001);
  }
  formId = options.formId;
  return setupJquery();
};

export default { setup, };

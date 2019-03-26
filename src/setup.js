"use strict";

import { EXIT_CODE_MESSAGES, EXIT_CODES } from './constants/exit_codes';

const { E001, E002, E003 } = EXIT_CODES;

let formId = null;

const emarsysRegistrationForm = {
  _$: null,
  formId: null,
};

const exit = (code) => {
  const log = `${code}: ${EXIT_CODE_MESSAGES[code]}`;
  if (code.charAt(0) === 'E') {
    console.error(log);
  } else {
    console.warn(log);
  }
  return { success: false, error: code, };
};

emarsysRegistrationForm._todo = () => {
  // TODO
  return { success: true, };
};

emarsysRegistrationForm._setupJquery = () => {
  const _$ = window.$;
  if (!_$) {
    return exit(E002);
  }
  emarsysRegistrationForm._$ = _$;
  return emarsysRegistrationForm._todo();
};

const setup = (options) => {
  if (!options) {
    return exit(E003);
  } else if (!options.formId) {
    return exit(E001);
  }
  formId = options.formId;
  return emarsysRegistrationForm._setupJquery();
};

export default { setup, };

"use strict";

import { EXIT_CODE_MESSAGES, EXIT_CODES } from './constants/exit_codes';

const { E001, E002 } = EXIT_CODES;

const emarsysRegistrationForm = {
  _$: null,
  formId: null,
};

emarsysRegistrationForm._exit = (code) => {
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
    return emarsysRegistrationForm._exit(E002);
  }
  emarsysRegistrationForm._$ = _$;
  return emarsysRegistrationForm._todo();
};

emarsysRegistrationForm.setup = ({ formId } = {}) => {
  if (!formId) {
    return emarsysRegistrationForm._exit(E001);
  }
  emarsysRegistrationForm.formId = formId;
  return emarsysRegistrationForm._setupJquery();
};

export default emarsysRegistrationForm;

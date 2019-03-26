"use strict";

const emarsysRegistrationForm = {
  EXIT_CODES: {
    'E001': 'No form ID specified.',
    'E002': 'jQuery is not included.',
  },
  _$: null,
  formId: null,
};

emarsysRegistrationForm._exit = (code) => {
  const log = `${code}: ${emarsysRegistrationForm.EXIT_CODES[code]}`;
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
    return emarsysRegistrationForm._exit('E002');
  }
  emarsysRegistrationForm._$ = _$;
  return emarsysRegistrationForm._todo();
};

emarsysRegistrationForm.setup = ({ formId } = {}) => {
  if (!formId) {
    return emarsysRegistrationForm._exit('E001');
  }
  emarsysRegistrationForm.formId = formId;
  return emarsysRegistrationForm._setupJquery();
};

export default emarsysRegistrationForm;

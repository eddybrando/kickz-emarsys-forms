"use strict";

import { EXIT_CODE_MESSAGES, GENERIC_EXIT_CODE } from './constants/exit_codes';

let code = null;
let e = null;
let log = null;

const logCatchedError = () => {
  if (e) {
    console.log(e);
  }
  return { success: false, error: code, };
};

const logLog = () => {
  if (code.charAt(0) === 'E') {
    console.error(log);
  } else {
    console.warn(log);
  }
  return logCatchedError();
};

const setLog = () => {
  log = `${code}: ${EXIT_CODE_MESSAGES[code]}`;
  return logLog();
};

const setError = (_e) => {
  e = _e;
  return setLog();
};

export const exit = (_code = null, _e = null) => {
  if (!_code) {
    console.error(EXIT_CODE_MESSAGES[GENERIC_EXIT_CODE]);
    return { success: false, error: GENERIC_EXIT_CODE, };
  }
  code = _code;
  return setError(_e);
};

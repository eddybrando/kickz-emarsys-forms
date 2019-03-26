"use strict";

import { EXIT_CODE_MESSAGES } from './constants/exit_codes';

export const exit = (code) => {
  const log = `${code}: ${EXIT_CODE_MESSAGES[code]}`;
  if (code.charAt(0) === 'E') {
    console.error(log);
  } else {
    console.warn(log);
  }
  return { success: false, error: code, };
};

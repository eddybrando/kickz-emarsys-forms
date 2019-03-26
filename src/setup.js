"use strict";

import { EXIT_CODES } from './constants/exit_codes';
import { exit } from './error_handling';

const { E001, E002, E003 } = EXIT_CODES;

let $ = null;
let formId = null;

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

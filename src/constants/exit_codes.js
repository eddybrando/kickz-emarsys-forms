export const EXIT_CODES = {
  E000: 'E000',
  E001: 'E001',
  E002: 'E002',
  E003: 'E003',
  E004: 'E004',
  E005: 'E005',
  E006: 'E006',
  E007: 'E007',
  E008: 'E008',
};

export const EXIT_CODE_MESSAGES = {
  [EXIT_CODES.E000]: 'Something unexpected went wrong.',
  [EXIT_CODES.E001]: 'Missing "formId" parameter in setup.',
  [EXIT_CODES.E002]: 'Missing jQuery library.',
  [EXIT_CODES.E003]: 'Missing parameters in setup.',
  [EXIT_CODES.E004]: 'Given "formId" doesn\'t match any element.',
  [EXIT_CODES.E005]: 'Validator library failed to initialize.',
  [EXIT_CODES.E006]: 'Axios library failed to initialize.',
  [EXIT_CODES.E007]: 'Missing "type" parameter in setup.',
  [EXIT_CODES.E008]: 'Invalid "type" parameter in setup.',
};

export const GENERIC_EXIT_CODE = EXIT_CODES.E000;

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
  E009: 'E009',
  E010: 'E010',
  E011: 'E011',
  W001: 'W001',
  W002: 'W002',
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
  [EXIT_CODES.E009]: 'Missing valid "fields" parameter in setup.',
  [EXIT_CODES.E010]: 'Fields must have valid "id" and "emarsysId" attributes.',
  [EXIT_CODES.E011]: 'Forward Emarsys API call failed.',
  [EXIT_CODES.W001]: 'Missing error message element.',
  [EXIT_CODES.W002]: 'Missing success message element.',
};

export const GENERIC_EXIT_CODE = EXIT_CODES.E000;

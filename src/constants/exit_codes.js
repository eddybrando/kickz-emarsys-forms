export const EXIT_CODES = {
  E001: 'E001',
  E002: 'E002',
  E003: 'E003',
  E004: 'E004',
};

export const EXIT_CODE_MESSAGES = {
  [EXIT_CODES.E001]: 'Missing "formId" parameter in setup.',
  [EXIT_CODES.E002]: 'Missing jQuery library.',
  [EXIT_CODES.E003]: 'Missing parameters in setup.',
  [EXIT_CODES.E004]: 'Given "formId" doesn\'t match any element.',
};

"use strict";

import emarsysRegistrationForm from '../src';

test('returns failure E001 when no parameters are passed', () => {
  expect(emarsysRegistrationForm.setup().success).toBe(false);
});

"use strict";

import axios from 'axios';
import { EMARSYS_ERROR_CODES, EMARSYS_ERROR_CODE_IDS } from './constants/emarsys_error_codes';
import { EXIT_CODES } from './constants/exit_codes';
import { exit } from './error_handling';

const { ALREADY_EXISTS } = EMARSYS_ERROR_CODES;
const { E011 } = EXIT_CODES;

const ga = window.ga;

export const registerContact = (payload) => {
  axios.post("api/forward-emarsys", {
    data: {
      method: "POST",
      payload: {
        contacts: [payload,],
      },
      target: "https://api.emarsys.net/api/v2/contact",
    },
  }).then((res) => {
    const data = res.data.data.data;
    if (data.errors &&
      !!data.errors[Object.keys(data.errors)[0]][EMARSYS_ERROR_CODE_IDS[ALREADY_EXISTS]]) {
      // updateContact();
    } else {
      ga("send", "event", "NewsletterSignUp", "sign up", "Gender:X || " + window.location.pathname);
      // sendDoi();
    }
  }).catch((e) => {
    exit(E011);
    // handleError();
  });
};

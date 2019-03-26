"use strict";

import axios from 'axios';
import { EMARSYS_ERROR_CODES, EMARSYS_ERROR_CODE_IDS } from './constants/emarsys_error_codes';
import { EXIT_CODES } from './constants/exit_codes';
import { exit } from './error_handling';

const { ALREADY_EXISTS } = EMARSYS_ERROR_CODES;
const { E011 } = EXIT_CODES;

const ga = window.ga;

const updateContact = (payload) => {
  axios.post("api/forward-emarsys", {
    data: {
      method: "PUT",
      payload: {
        key_id: 3,
        contacts: [payload,],
      },
      target: "https://api.emarsys.net/api/v2/contact",
    },
  }).then(() => {
    ga("send", "event", "NewsletterSignUp", "already registered", "Gender:X || " + window.location.pathname);
    // handleSuccess();
  }).catch((e) => {
    exit(E011, e);
    // handleError();
  });
};

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
      updateContact(payload);
    } else {
      ga("send", "event", "NewsletterSignUp", "sign up", "Gender:X || " + window.location.pathname);
      // sendDoi();
    }
  }).catch((e) => {
    exit(E011, e);
    // handleError();
  });
};

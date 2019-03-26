"use strict";

import axios from 'axios';
import { EMARSYS_ERROR_CODES, EMARSYS_ERROR_CODE_IDS } from './constants/emarsys_error_codes';
import { EXIT_CODES } from './constants/exit_codes';
import {
  GA_ACTION_ALREADY_REGISTERED,
  GA_ACTION_SEND_DOI,
  GA_ACTION_SIGNUP,
  GA_CATEGORY_NL_SIGNUP,
  GA_EVENT,
  GA_SEND,
} from './constants/ga';
import {
  EMARSYS_API_CONTACT_ENDPOINT,
  EMARSYS_API_TRIGGER_DOI_ENDPOINT,
  PROXY_API_ENDPOINT,
} from './constants/proxy_api';
import { exit } from './error_handling';
import { handleError } from './submit_handling';

const { ALREADY_EXISTS } = EMARSYS_ERROR_CODES;
const { E011 } = EXIT_CODES;

const ga = window.ga;
const gaLabel = `Gender:X || ${window.location.pathname}`;

const updateContact = (payload) => {
  axios.post(PROXY_API_ENDPOINT, {
    data: {
      method: "PUT",
      payload: {
        key_id: 3,
        contacts: [payload,],
      },
      target: EMARSYS_API_CONTACT_ENDPOINT,
    },
  }).then(() => {
    ga(GA_SEND, GA_EVENT, GA_CATEGORY_NL_SIGNUP, GA_ACTION_ALREADY_REGISTERED, gaLabel);
    // handleSuccess();
  }).catch((e) => {
    exit(E011, e);
    handleError();
  });
};

const sendDoi = (payload) => {
  axios.post(PROXY_API_ENDPOINT, {
    data: {
      method: "POST",
      payload: {
        key_id: 3,
        contacts: [{ external_id: payload[3], },],
      },
      target: EMARSYS_API_TRIGGER_DOI_ENDPOINT,
    },
  }).then(() => {
    ga(GA_SEND, GA_EVENT, GA_CATEGORY_NL_SIGNUP, GA_ACTION_SEND_DOI, gaLabel);
    // handleSuccess();
  }).catch((e) => {
    exit(E011, e);
    handleError();
  });
};

export const registerContact = (payload) => {
  axios.post(PROXY_API_ENDPOINT, {
    data: {
      method: "POST",
      payload: {
        contacts: [payload,],
      },
      target: EMARSYS_API_CONTACT_ENDPOINT,
    },
  }).then((res) => {
    const data = res.data.data.data;
    if (data.errors &&
      !!data.errors[Object.keys(data.errors)[0]][EMARSYS_ERROR_CODE_IDS[ALREADY_EXISTS]]) {
      updateContact(payload);
    } else {
      ga(GA_SEND, GA_EVENT, GA_CATEGORY_NL_SIGNUP, GA_ACTION_SIGNUP, gaLabel);
      sendDoi();
    }
  }).catch((e) => {
    exit(E011, e);
    handleError();
  });
};

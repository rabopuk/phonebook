/* eslint-disable object-curly-spacing */
import {
  deleteControl,
  formControl,
  hoverRow,
  modalControl,
  sortControl,
} from './modules/control.js';

import { renderContacts, renderPhoneBook } from './modules/render.js';
import { getStorage } from './modules/serviceStorage.js';

const init = (selectorApp, title) => {
  const app = document.querySelector(selectorApp);
  const data = getStorage('contacts');

  const {
    list,
    logo,
    btnAdd,
    btnDel,
    formOverlay,
    thead,
    form,
  } = renderPhoneBook(app, title);

  const { closeModal } = modalControl(btnAdd, formOverlay);

  sortControl(list, data, thead);
  deleteControl(btnDel, list);
  formControl(form, list, closeModal);

  const allRows = renderContacts(list, data);
  hoverRow(allRows, logo);
};

document.addEventListener('DOMContentLoaded', () => {
  init('#app', 'rabopuk');
});

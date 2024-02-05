/* eslint-disable object-curly-spacing */
import { createRow } from './createElements.js';
import { renderContacts } from './render.js';
import {
  addContactData,
  getStorage,
  removeStorage,
  setStorage,
} from './serviceStorage.js';

const ASC = 'asc';
const DESC = 'desc';
const DELETE = 'Удалить';
const CANCEL = 'Отменить';

export const getSortData = () => ({
  sortOrder: getStorage('sortOrder') || ASC,
  sortField: getStorage('sortField') || null,
});

export const hoverRow = (data, logo) => {
  const text = logo.textContent;

  data.forEach(contact => {
    const phoneLink = contact.querySelector('.phoneLink');

    if (phoneLink) {
      contact.onmouseover = () => logo.textContent = contact.contactData.phone;
      contact.onmouseout = () => logo.textContent = text;
    }
  });
};

export const updateTable = (list, data) => {
  list.innerHTML = '';
  renderContacts(list, data);
};

export const toggleSortOrder = (field) => {
  const { sortOrder, sortField } = getSortData();

  if (sortField !== field) {
    setStorage('sortOrder', ASC);
    return ASC;
  }

  const newSortOrder = sortOrder === ASC ? DESC : ASC;
  setStorage('sortOrder', newSortOrder);
  return newSortOrder;
};

export const applySorting = (list, field) => {
  const currentSortOrder = toggleSortOrder(field);
  const data = getStorage('contacts');

  if (currentSortOrder === ASC) {
    data.sort((a, b) => a[field].localeCompare(b[field]));
  } else {
    data.sort((a, b) => b[field].localeCompare(a[field]));
  }

  setStorage('sortField', field);
  setStorage('sortOrder', currentSortOrder);
  updateTable(list, data);
};

export const sortControl = (list, data, thead) => {
  thead.style.cursor = 'pointer';

  const sortKeys = {
    '.th-name': 'name',
    '.th-surname': 'surname',
  };

  thead.addEventListener('click', e => {
    const target = e.target;

    for (const key in sortKeys) {
      if (target.closest(key)) {
        applySorting(list, sortKeys[key]);
        break;
      }
    }
  });
};

export const getPhoneNumberFromContact = (contact) => {
  const phoneLink = contact.querySelector('.phoneLink');
  return phoneLink ? phoneLink.textContent : null;
};

export const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};

export const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', openModal);

  formOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === formOverlay || target.closest('.close')) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};

export const deleteControl = (btnDel, list) => {
  let isDeleteMode = false;

  const toggleDeleteMode = () => {
    isDeleteMode = !isDeleteMode;
    const buttonText = isDeleteMode ? CANCEL : DELETE;
    btnDel.textContent = buttonText;

    if (!isDeleteMode) {
      updateTable(list, getStorage('contacts'));
    }
  };

  btnDel.addEventListener('click', () => {
    toggleDeleteMode();

    document.querySelectorAll('.delete').forEach(element => {
      const contact = element.closest('.contact');

      if (contact) {
        const phoneNumber = getPhoneNumberFromContact(contact);

        if (phoneNumber) {
          element.classList.toggle('is-visible', isDeleteMode);
        }
      }
    });
  });

  list.addEventListener('click', e => {
    const target = e.target;

    if (target.closest('.del-icon')) {
      const contact = target.closest('.contact');

      if (contact) {
        const phoneNumber = getPhoneNumberFromContact(contact);

        if (phoneNumber) {
          removeStorage(phoneNumber, 'contacts');
        }
        contact.remove();
      }
    }
  });
};

export const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);
    console.log('newContact: ', newContact);

    addContactData(newContact, 'contacts');
    addContactPage(newContact, list);
    form.reset();
    closeModal();
  });
};

export default ASC;

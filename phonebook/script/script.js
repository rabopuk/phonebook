/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
'use strict';

{
  const ASC = 'asc';
  const DESC = 'desc';
  const DELETE = 'Удалить';
  const CANCEL = 'Отменить';

  const getStorage = key => JSON.parse(localStorage.getItem(key)) ?? [];

  const setStorage = (key, obj) => localStorage.setItem(key, JSON.stringify(obj));

  const removeStorage = (phoneNumber, key) => {
    const existingData = getStorage(key);

    const updatedData = existingData.filter(contact => contact.phone.toString() !== phoneNumber.toString());

    setStorage(key, updatedData);
  };

  const getSortData = () => ({
    sortOrder: getStorage('sortOrder') || ASC,
    sortField: getStorage('sortField') || null,
  });

  const addContactData = (contact, key) => {
    const data = getStorage(key);
    const updatedData = [...data, contact];
    setStorage(key, updatedData);
  };

  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = createContainer();
    header.append(headerContainer);

    header.headerContainer = headerContainer;
    return header;
  };

  const createLogo = title => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник ${title}`;
    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');
    main.classList.add('main');

    const mainContainer = createContainer();
    main.append(mainContainer);

    main.mainContainer = mainContainer;
    return main;
  };

  const createButtonsGroup = params => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({ className, type, text }) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;
      return button;
    });

    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
        <th class="delete">Удалить</th>
        <th class="th-name">Имя</th>
        <th class="th-surname">Фамилия</th>
        <th>Телефон</th>
      </tr>
    `);

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;
    table.thead = thead;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
      <button class="close" type="button"></button>
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
        <label class="form-label" for="name">Имя</label>
        <input class="form-input" name="name"
          id="name" type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="surname">Фамилия</label>
        <input class="form-input" name="surname"
          id="surname" type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="phone">Телефон</label>
        <input class="form-input" name="phone"
          id="phone" type="number" required>
      </div>
    `);

    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-4',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonGroup.btns);

    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const createFooter = title => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const footerContainer = createContainer();
    footer.append(footerContainer);

    footer.footerContainer = footerContainer;
    footer.footerContainer.textContent = `Hello, ${title}!`;

    return footer;
  };

  const createRow = ({ name: firstName, surname, phone }) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');

    const tdEdit = document.createElement('td');
    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('btn', 'btn-primary');
    buttonEdit.textContent = 'Редактировать';
    buttonEdit.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16"><path d="M11.293 1.293a1 1 0 0 1 1.414 1.414L3.586 12H2v-1.586l9.707-9.707a1 1 0 0 1 1.414 0z" /><path fill-rule="evenodd" d="M12.293.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.267l1-3a1 1 0 0 1 .242-.39l10-10z" /></svg>';
    tdEdit.appendChild(buttonEdit);

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    const tdName = document.createElement('td');
    tdName.textContent = firstName;
    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;

    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.classList.add('phoneLink');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);

    tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);
    tr.contactData = { name: firstName, surname, phone };

    return tr;
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-4 js-add',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);
    const table = createTable();
    const { form, overlay } = createForm();
    const footer = createFooter(title);

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
    app.append(header, main, footer);

    return {
      list: table.tbody,
      thead: table.thead,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: overlay,
      form,
    };
  };

  const hoverRow = (data, logo) => {
    const text = logo.textContent;

    data.forEach(contact => {
      const phoneLink = contact.querySelector('.phoneLink');

      if (phoneLink) {
        contact.onmouseover = () => logo.textContent = contact.contactData.phone;
        contact.onmouseout = () => logo.textContent = text;
      }
    });
  };

  const modalControl = (btnAdd, formOverlay) => {
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

  const renderContacts = (elem, data) => {
    elem.innerHTML = '';

    const { sortOrder, sortField } = getSortData();

    const sortedData = [...data];

    if (sortField) {
      sortedData.sort((a, b) => (sortOrder === ASC ?
        a[sortField].localeCompare(b[sortField]) :
        b[sortField].localeCompare(a[sortField])));
    }

    const allRows = sortedData.map(createRow);
    elem.append(...allRows);

    return allRows;
  };

  const updateTable = (list, data) => {
    list.innerHTML = '';
    renderContacts(list, data);
  };

  const toggleSortOrder = (field) => {
    const { sortOrder, sortField } = getSortData();

    if (sortField !== field) {
      setStorage('sortOrder', ASC);
      return ASC;
    }

    const newSortOrder = sortOrder === ASC ? DESC : ASC;
    setStorage('sortOrder', newSortOrder);
    return newSortOrder;
  };

  const applySorting = (list, data, field) => {
    const currentSortOrder = toggleSortOrder(field);

    if (currentSortOrder === ASC) {
      data.sort((a, b) => a[field].localeCompare(b[field]));
    } else {
      data.sort((a, b) => b[field].localeCompare(a[field]));
    }

    setStorage('sortField', field);
    setStorage('sortOrder', currentSortOrder);
    updateTable(list, data);
  };

  const sortControl = (list, data, thead) => {
    thead.style.cursor = 'pointer';

    const sortKeys = {
      '.th-name': 'name',
      '.th-surname': 'surname',
    };

    thead.addEventListener('click', e => {
      const target = e.target;

      for (const key in sortKeys) {
        if (target.closest(key)) {
          if (typeof applySorting === 'function') {
            applySorting(list, data, sortKeys[key]);
          } else {
            console.error('applySorting is not a function');
          }
          break;
        }
      }
    });
  };

  const getPhoneNumberFromContact = (contact) => {
    const phoneLink = contact.querySelector('.phoneLink');
    return phoneLink ? phoneLink.textContent : null;
  };

  const deleteControl = (btnDel, list) => {
    let isDeleteMode = false;

    const toggleDeleteMode = () => {
      isDeleteMode = !isDeleteMode;
      const buttonText = isDeleteMode ? CANCEL : DELETE;
      btnDel.textContent = buttonText;
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

  const addContactPage = (contact, list) => {
    list.append(createRow(contact));
  };

  const formControl = (form, list, closeModal) => {
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

  window.phoneBookInit = init;
}

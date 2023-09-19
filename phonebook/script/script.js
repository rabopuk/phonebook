/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
'use strict';

const data = [
  {
    name: 'Иван',
    surname: 'Петров',
    phone: '+79514545454',
  },
  {
    name: 'Игорь',
    surname: 'Семёнов',
    phone: '+79999999999',
  },
  {
    name: 'Семён',
    surname: 'Иванов',
    phone: '+79800252525',
  },
  {
    name: 'Мария',
    surname: 'Попова',
    phone: '+79876543210',
  },
];

{
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

    // Добавить в каждую строку кнопку редактировать (на кнопке текст или иконка на ваше усмотрение)
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
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);

    tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

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
    const form = createForm();
    const footer = createFooter(title);

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, form.overlay);
    app.append(header, main, footer);

    return {
      list: table.tbody,
      thead: table.thead,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: form.overlay,
      form: form.form,
    };
  };

  const renderContacts = (elem, data) => {
    const allRows = data.map(createRow);
    elem.append(...allRows);
    return allRows;
  };

  const hoverRow = (contacts, logo) => {
    const text = logo.textContent;

    contacts.forEach(contact => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
      });
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
  };

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const phoneBook = renderPhoneBook(app, title);

    const {
      list,
      logo,
      btnAdd,
      btnDel,
      formOverlay,
      thead,
      // form,
    } = phoneBook;

    // Функционал
    const allRows = renderContacts(list, data);
    hoverRow(allRows, logo);

    btnAdd.addEventListener('click', () => {
      formOverlay.classList.add('is-visible');
    });

    formOverlay.addEventListener('click', e => {
      const target = e.target;

      if (target === formOverlay || target.closest('.close')) {
        formOverlay.classList.remove('is-visible');
      }
    });

    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach(element => {
        element.classList.toggle('is-visible');
      });
    });

    list.addEventListener('click', e => {
      const target = e.target;

      if (target.closest('.del-icon')) {
        target.closest('.contact').remove();
      }
    });

    // Переменная для отслеживания текущего порядка сортировки
    let sortOrder = 'asc';

    // Функция для обновления таблицы с учетом отсортированных данных
    const updateTable = () => {
      // Очистить текущие строки таблицы
      list.innerHTML = '';

      // Перерисовать таблицу с отсортированными данными
      renderContacts(list, data);
    };

    thead.addEventListener('click', e => {
      const target = e.target;

      if (target.closest('.th-name')) {
        // Клик на заголовок Имя
        if (sortOrder === 'asc') {
          // Сортировка по возрастанию
          data.sort((a, b) => a.name.localeCompare(b.name));
          sortOrder = 'desc'; // порядок сортировки на убывание
        } else {
          // Сортировка по убыванию
          data.sort((a, b) => b.name.localeCompare(a.name));
          sortOrder = 'asc'; // порядок сортировки на возрастание
        }
      }

      if (target.closest('.th-surname')) {
        // Клик на заголовок Фамилия
        if (sortOrder === 'asc') {
          data.sort((a, b) => a.surname.localeCompare(b.surname));
          sortOrder = 'desc';
        } else {
          data.sort((a, b) => b.surname.localeCompare(a.surname));
          sortOrder = 'asc';
        }
      }

      // Обновить таблицу с учетом отсортированных данных
      updateTable();
    });
  };

  window.phoneBookInit = init;
}

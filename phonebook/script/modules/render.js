/* eslint-disable object-curly-spacing */
import ASC, { getSortData } from './control.js';
import * as c from './createElements.js';

export const renderPhoneBook = (app, title) => {
  const header = c.createHeader();
  const logo = c.createLogo(title);
  const main = c.createMain();
  const buttonGroup = c.createButtonsGroup([
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
  const table = c.createTable();
  const { form, overlay } = c.createForm();
  const footer = c.createFooter(title);

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

export const renderContacts = (elem, data) => {
  elem.innerHTML = '';

  const { sortOrder, sortField } = getSortData();

  const sortedData = [...data];

  sortedData.sort((a, b) => {
    if (a[sortField] === undefined || b[sortField] === undefined) {
      return 0;
    }
    return sortOrder === ASC ?
      a[sortField].localeCompare(b[sortField]) :
      b[sortField].localeCompare(a[sortField]);
  });

  const allRows = sortedData.map(c.createRow);
  elem.append(...allRows);

  return allRows;
};

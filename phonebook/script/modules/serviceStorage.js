/* eslint-disable object-curly-spacing */
export const getStorage = key => JSON.parse(localStorage.getItem(key)) ?? [];

export const setStorage = (key, obj) =>
  localStorage.setItem(key, JSON.stringify(obj));

export const removeStorage = (phoneNumber, key) => {
  const existingData = getStorage(key);

  const updatedData = existingData.filter(contact =>
    contact.phone.toString() !== phoneNumber.toString());

  setStorage(key, updatedData);
};

export const addContactData = (contact, key) => {
  const data = getStorage(key);
  const updatedData = [...data, contact];
  setStorage(key, updatedData);
};

import storage from './Storage';

export const add = (key, data) => {
  storage.setItem(key, JSON.stringify(data));
};

export const get = (key) => {
  try {
    return JSON.parse(storage.getItem(key));
  } catch (err) {
    return null;
  }
};

export const remove = (key) => {
  try {
    storage.removeItem(key);
  } catch (err) {
    //
  }
};

export const clear = () => storage.clear();

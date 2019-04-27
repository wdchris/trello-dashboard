const TOKEN_KEY = "trello_token";

const trelloAuth = {
  getToken(key = TOKEN_KEY) {
    if (localStorage && localStorage.getItem(key)) {
      return localStorage.getItem(key) || null;
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return sessionStorage.getItem(key) || null;
    }

    return null;
  },

  setToken(value, key = TOKEN_KEY, isLocalStorage) {
    if (isEmpty(value)) {
      return null;
    }

    if (isLocalStorage && localStorage) {
      return localStorage.setItem(key, value);
    }

    if (sessionStorage) {
      return sessionStorage.setItem(key, value);
    }

    return null;
  }
};

export default trelloAuth;

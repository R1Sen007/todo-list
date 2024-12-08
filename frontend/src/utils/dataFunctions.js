export const getToken = () => {
  return localStorage.getItem('token');
}

export const removeToken = () => {
  localStorage.removeItem('token');
}

export const setToken = (val) => {
  localStorage.setItem('token', val);
}

export const getUserData = () => {
  return JSON.parse(localStorage.getItem('userData'));
}

export const removeUserData = () => {
  localStorage.removeItem('userData');
}

export const setUserData = (value) => {
  const jsonString = JSON.stringify(value);
  localStorage.setItem('userData', jsonString);
}
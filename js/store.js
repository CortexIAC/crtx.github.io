const state = {
  theme: 'dark',
  searchOpen: false,
  searchQuery: '',
  previousRoute: '/',
};

const listeners = [];

export function getState(key) {
  return key ? state[key] : { ...state };
}

export function setState(key, value) {
  state[key] = value;
  listeners.forEach(fn => fn(key, value));
}

export function subscribe(fn) {
  listeners.push(fn);
  return () => {
    const idx = listeners.indexOf(fn);
    if (idx > -1) listeners.splice(idx, 1);
  };
}

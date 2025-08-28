export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function load(key, defaultValue = []) {
  return JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValue));
}

export function clear(key) {
  localStorage.removeItem(key);
}

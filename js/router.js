const routes = [];

export function register(pattern, handler) {
  routes.push({ pattern, handler, regex: patternToRegex(pattern) });
}

function patternToRegex(pattern) {
  if (pattern === '/*') {
    return { test: () => false }; // never matches via regex — handled as fallback
  }
  const parts = pattern.split('/');
  const regexParts = parts.map(p => {
    if (p.startsWith(':')) return '([^/]+)';
    return p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  });
  return new RegExp('^' + regexParts.join('/') + '$');
}

function match(path) {
  let fallback = null;
  for (const route of routes) {
    if (route.pattern === '/*') {
      fallback = route;
      continue;
    }
    const m = path.match(route.regex);
    if (m) {
      const params = {};
      const patternParts = route.pattern.split('/');
      let idx = 1;
      patternParts.forEach(p => {
        if (p.startsWith(':')) {
          params[p.slice(1)] = m[idx++];
        }
      });
      return { handler: route.handler, params };
    }
  }
  if (fallback) {
    return { handler: fallback.handler, params: {} };
  }
  return null;
}

let currentCleanup = null;

export function navigate(path) {
  const hash = path.startsWith('#') ? path.slice(1) : path;
  window.location.hash = hash || '/';
}

export function init() {
  function resolve() {
    const hash = window.location.hash.slice(1) || '/';
    const route = match(hash);

    if (currentCleanup && typeof currentCleanup === 'function') {
      currentCleanup();
      currentCleanup = null;
    }

    if (route) {
      const result = route.handler(route.params);
      if (result && typeof result.then === 'function') {
        result.then(cleanup => { currentCleanup = cleanup; });
      } else {
        currentCleanup = result;
      }
    }
  }

  window.addEventListener('hashchange', resolve);
  window.addEventListener('load', resolve);
}

export function getCurrentPath() {
  return window.location.hash.slice(1) || '/';
}

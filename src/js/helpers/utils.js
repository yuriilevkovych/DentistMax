export const getElementBySelector = selector => {
  let el = selector;

  if (typeof selector === 'string') {
    el = document.querySelector(selector);
  }

  return el;
};

const getAllElementsBySelector = selector => {
  let el = [selector];

  if (typeof selector === 'object') {
    return selector;
  }

  if (typeof selector === 'string') {
    el = document.querySelectorAll(selector);
  }

  return el;
};

export const hasClass = (selector, className) => {
  const el = getElementBySelector(selector);
  return el.classList.contains(className);
};

export const removeClass = (selector, className) => {
  if (selector) {
    const el = getAllElementsBySelector(selector);

    el.forEach(el => {
        el.classList.remove(className);
    });
  }
};

export const toggleClass = (selector, className) => {
  const el = getElementBySelector(selector);
  el.classList.toggle(className);
};

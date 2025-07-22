import { hasClass, removeClass, toggleClass } from '../helpers/utils.js';
import { OPEN } from '../helpers/classes.js';

const CLASSES = {
  CONTAINER: 'dropdown-container',
  BODY: 'dropdown-body',
  TITLE: 'dropdown-title',
};

const DROPDOWN_BUTTON = '[data-dropdown-button]';

const closeAllDropdowns = () => {
  removeClass(`.${CLASSES.CONTAINER}`, OPEN);
  removeClass(DROPDOWN_BUTTON, OPEN);
};

const getContainer = (e) => {
  return e.target.closest('.' + CLASSES.CONTAINER);
}

const closeDropdown = (e) => {
  const container = getContainer(e);
  removeClass(container, OPEN);
  removeClass(container.querySelector(DROPDOWN_BUTTON), OPEN);
};

document.addEventListener("DOMContentLoaded", function(e) {
  const dataDropdownButton = document.querySelector(DROPDOWN_BUTTON);
  const bodyLinks = document.querySelectorAll(`.${CLASSES.BODY} a`);

  dataDropdownButton.addEventListener('click', function(e){
    const el = e.target;
    if (!hasClass(el, OPEN)) {
      closeAllDropdowns();
    }
    toggleClass(el, OPEN);
    toggleClass(el.closest(`.${CLASSES.CONTAINER}`), OPEN);
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.' + CLASSES.CONTAINER)) {
      closeAllDropdowns();
    }
  });

  bodyLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      closeDropdown(e);
      const container = getContainer(e);
      const title = container.querySelector(`.${CLASSES.TITLE}`);
      const value = e.target.textContent.trim();
      const langValue = e.target.dataset.lang;

      if (langValue) {
        title.dataset.lang = langValue;
      }
      title.textContent = value;
    });
  });

  document.addEventListener('keydown', function(e) {
    if (e.keyCode === 27) {
      closeAllDropdowns();
    }
  });
});

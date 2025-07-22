import { removeClass, toggleClass } from '../helpers/utils.js';
import { ACTIVE } from '../helpers/classes.js';
import { renderNextSection } from '../helpers/renderNextSection.js';

window.state = {};

document.addEventListener("DOMContentLoaded", function(e) {
  document.addEventListener('change', function(e) {
    if (e.target.classList.contains('radio-input')) {
      window.state[e.target.name] = e.target.value;
      if (e.target.dataset.doctorsIds) {
        window.state['doctorsIds'] = e.target.dataset.doctorsIds;
      }

      if (e.target.dataset.examinations) {
        window.state['examination'] = e.target.dataset.examinations;
      }

      removeClass(e.target.closest('.cards').querySelectorAll('.card'), ACTIVE);
      toggleClass(e.target.closest('.card'), ACTIVE);
      renderNextSection(e.target.closest('[data-content]'));
    }
  });
});

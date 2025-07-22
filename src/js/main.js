import BaseHelpers from './helpers/base-helpers.js';
import './modules/custom-select.js';
import './modules/redirectToNextPage.js';
import './modules/sendFeedback.js';

BaseHelpers.addLoadedClass();

window.is_iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

document.addEventListener("DOMContentLoaded", function(e) {
  const flash = document.querySelectorAll('.flash');
  const clinicCards = document.querySelectorAll('.cards.clinics .clinic');

  if (clinicCards.length === 1) {
    setTimeout(() => {
      clinicCards[0].querySelector('.radio-input').click();
    }, 0)
  } else {
    if (clinicCards.length) {
      document.querySelector('.clinic-content').classList.remove('hidden');
    }
  }

  if (flash.length) {
    flash.forEach(el => {
      el.addEventListener('click', function() {
        el.remove();
      })
    })
  }
});

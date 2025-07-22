import { sendOrder } from './api.js';

const textValidator = value => {
  return value.length > 0;
}

const numberValidator = value => {
  return value.match(
    /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
  );
}

const emailValidator = value => {
  return value.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

const VALIDATORS = {
  text: textValidator,
  tel: numberValidator,
  number: numberValidator,
  email: emailValidator,
};


document.addEventListener("DOMContentLoaded", function() {
  const feedbackButton = document.querySelector('#js-send-feedback');
  const feedbackForm = document.querySelector('#feedback');
  if (feedbackForm) {
    const requiredInputs = feedbackForm.querySelectorAll('[required]');
    const feedbackInputs = feedbackForm.querySelectorAll('input');

    requiredInputs.forEach(input => {
      input.addEventListener('focus', function () {
        this.closest('.form__group').classList.remove('has-error');
      });
    });

    feedbackButton.addEventListener('click', function(e) {
      let isValid = true;

      requiredInputs.forEach(input => {
        const {
          type, value,
        } = input;
        const isValidInput = VALIDATORS[type](value);

        if (!isValidInput) {
          isValid = false;
          input.closest('.form__group').classList.add('has-error');
        } else {
          input.closest('.form__group').classList.remove('has-error');
        }
      });

      if (isValid) {
        let data = {};
        for (let i = 0; i < feedbackInputs.length; i++) {
          const {
            name, value
          } = feedbackInputs[i];
          data[name] = value;
        }
        const {
          doctorId,
          examination,
          doctorsIds,
          doctor,
          ...rest
        } = window.state;

        const doctorIndex = doctorsIds.split(',').findIndex(id => id === doctorId);
        const examinationId = examination.split(',')[doctorIndex];


        return sendOrder({
          ...data,
          ...rest,
          examination: examinationId,
          doctor: doctorId,
        })
          .then((data) => {
            if (data.terminId) {
              window.location.href = `/order/${data.terminId}`;
            }
          })
      }
    });
  }
});

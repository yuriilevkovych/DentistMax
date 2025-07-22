import { initCalendar } from '../modules/calendar.js';
import { getDoctorsData, getPlansData, getSpecData } from '../modules/api.js';

const renderSpecs = (data) => {
  return data.map(spec => (
    `<div class="card spec">
      <input value="${spec.id}" aria-label="${spec.name}" type="radio" name="specialization" class="radio-input"/>
      <p class="spec__title">${spec.name}</p>
    </div>`
  )).join('');
}

const renderPlans = (data) => {
  return data.map(plan => {
    const id = plan.examinations_doctors.map(el => el.examination_id);
    const doctorsIds = plan.examinations_doctors.map(el => el.doctor_id);

    return (`<div class="card plan">
      <input value="${id}" data-doctors-ids="${doctorsIds}" aria-label="plan" type="radio" name="examination" class="radio-input"/>
      <h3 class="plan__title">${plan.name} (${plan.duration}min.)</h3>
      ${plan.description ? `<p class="plan__description">${plan.description}</p>` : ''}
      ${plan.price > 0 ? `<p class="plan__price">${window.priceTranslation}: ${plan.price} €</p>` : ''}
    </div>`)
  }).join('');
};

const renderDoctors = (data) => {
  return data.map(doctor => {
    let examinations = window.state.examination;

    if (!doctor.doctors) {
      const docId = window.state.doctorsIds.split(',').findIndex(id => id == doctor.id);
      examinations = examinations.split(',')[docId];
    }

    return (
      `<div class="card doctor">
      <input value="${doctor.doctors || doctor.id}" data-examinations="${examinations}" aria-label="doctor" type="radio" name="doctor" class="radio-input"/>
      <h3 class="doctor__title">${doctor.title_before || ''} ${doctor.title_after || ''} ${doctor.name_first || ''} ${doctor.name_last || ''}</h3>
      <div class="doctor__media">
        <img width="160" height="160" src="${doctor.photo || '/img/doctor-photo.png'}" alt="${doctor.title_before || ''} ${doctor.title_after || ''} ${doctor.name_first || ''} ${doctor.name_last || ''}" class="doctor__photo"/>
      </div>
    </div>`
    )
  }).join('');
};

const renderDate = data => {
  initCalendar(data);
  const activeDoc = document.querySelector('.card.doctor.active').innerHTML;
  return `<div class="card doctor active">${activeDoc}</div>`;
}

const renderFeedback = () => {
  // const clinicName = document.querySelector('.js-clinic-name');
  // const specName = document.querySelector('.js-spec-name');
  // const planName = document.querySelector('.js-plan-name');
  // const doctorName = document.querySelector('.js-doctor-name');
  // const dateName = document.querySelector('.js-date');
  //
  // clinicName.innerText = document.querySelector('.radio-input[name="hcenter"]:checked').nextElementSibling.innerText;
  // specName.innerText = document.querySelector('.radio-input[name="specialization"]:checked').nextElementSibling.innerText;
  // planName.innerText = document.querySelector('.radio-input[name="examination"]:checked').nextElementSibling.innerText;
  // doctorName.innerText = document.querySelector('.radio-input[name="doctor"]:checked').nextElementSibling.innerText;
  // dateName.innerHTML = `${document.querySelector('.calendar__input').value} <br /> ${document.querySelector('.slot__input[name="time"]:checked').nextElementSibling.innerText}`;
}

const configData = [
  {
    getData: getSpecData,
    render: renderSpecs,
    place: '.cards'
  },
  {
    getData: getPlansData,
    render: renderPlans,
    place: '.cards'
  },
  {
    getData: getDoctorsData,
    render: renderDoctors,
    place: '.cards'
  },
  {
    getData: () => Promise.resolve([]),
    render: renderDate,
    place: '.cards',
  },
  {
    getData: () => Promise.resolve([]),
    render: renderFeedback,
    place: null,
  }
];

export const renderContentData = (index, section) => {
  if (configData[index]) {
    const getData = configData[index].getData;

    getData().then(data => {
      const html = configData[index].render(data);
      const place = section.querySelector(configData[index].place);
      const countData = data.length;

      if (countData !== 1 || index === 2) {
        section.classList.remove('hidden');
      }

      const visibleSections = document.querySelectorAll('[data-content]:not(.hidden)');

      if (place) {
        place.innerHTML = html;
        place.closest('[data-content]').querySelector('.step.active .step__circle').innerText = visibleSections.length;
      } else {
        document.querySelector('.feedback-content').querySelector('.step.active .step__circle').innerText = visibleSections.length;
      }

      if (countData === 1 && place) {
        setTimeout(() => {
          place.querySelector('.radio-input').click();
        }, 0)
      } else {
        section.scrollIntoView();
      }
    });
  }
};

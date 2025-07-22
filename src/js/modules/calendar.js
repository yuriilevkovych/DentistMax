import datepicker from 'js-datepicker'
import { getAvailableSlots, getStartMonth } from './api.js';
import { removeClass, toggleClass } from '../helpers/utils.js';
import { ACTIVE, DISABLED, LOADING } from '../helpers/classes.js';
import { renderNextSection } from '../helpers/renderNextSection.js';

let picker;

const today = (new Date()).setHours(0,0,0,0)

const formatDateSelected = date => {
  if (!date) return;

  const [year, month, day] = date.split("-").map(Number);

  return new Date(year, month - 1, day);
}

const calculatedAvailableDates = (dates) => {
  return dates
    .map(date => formatDateSelected(date.date))
    .filter(date => date >= today);
};

const getInstanceDate = instance => {
  const {
    currentMonth,
    currentYear,
    dateSelected,
  } = instance;

  return {
    year: currentYear,
    month: currentMonth + 1 < 10 ? `0${currentMonth + 1}` : currentMonth + 1,
    day: dateSelected.getDate() < 10 ? `0${dateSelected.getDate()}` : dateSelected.getDate(),
  }
}

const calculateTimes = (times, doctors) => {
  const beforeSlotsTime = [];
  const afterSlotsTime = [];

  for (let i = 0; i < times.length; i++) {
    const startHour = +times[i].split(':')[0];
    if (startHour < 12) {
      beforeSlotsTime.push([times[i], doctors[i]]);
    } else {
      afterSlotsTime.push([times[i], doctors[i]]);
    }
  }

  return [beforeSlotsTime, afterSlotsTime];
}

const renderSlot = ([time = '', doctor = ''] = []) => (
  `<div class="slot">
    <input type="radio" data-doctor-id="${doctor}" name="time" value="${time}" class="slot__input" aria-label="choose ${time}" >
    <p class="slot__time">${time}</p></div>`
)

const atachSlotEvent = () => {
  const slotInputs = document.querySelectorAll('.slot__input');
  const slots = document.querySelectorAll('.slots .slot');

  slotInputs.forEach(slotInput => {
    slotInput.addEventListener('change', function(e) {
      removeClass(slots, ACTIVE);
      toggleClass(this.closest('.slot'), ACTIVE);
      window.state['time'] = this.value;
      window.state['doctorId'] = this.dataset.doctorId;
      renderNextSection(this.closest('[data-content]'));
    })
  })

}

const renderPeriod = ({
  times = [],
  doctors = [],
} = {}) => {
  const beforePeriod = document.querySelector('#js-time-before');
  const afterPeriod = document.querySelector('#js-time-after');
  const beforeSlots = beforePeriod.querySelector('.slots__inner');
  const afterSlots = afterPeriod.querySelector('.slots__inner');
  let beforeSlotsTime = [];
  let afterSlotsTime = [];

  if (times.length) {
    const [beforeSlotsArr, afterSlotsArr] = calculateTimes(times, doctors);
    beforeSlotsTime = beforeSlotsArr;
    afterSlotsTime = afterSlotsArr;
  }

  if (beforeSlotsTime.length === 0) {
    beforePeriod.classList.add('hidden');
    beforeSlots.innerHTML = renderSlot([]);
  } else {
    beforePeriod.classList.remove('hidden');
    beforeSlots.innerHTML = beforeSlotsTime.map(renderSlot).join('');
  }

  if (afterSlotsTime.length === 0) {
    afterPeriod.classList.add('hidden');
    afterSlots.innerHTML = renderSlot([]);
  } else {
    afterPeriod.classList.remove('hidden');
    afterSlots.innerHTML = afterSlotsTime.map(renderSlot).join('');
  }

  atachSlotEvent();
}

let SLOTS_BY_MONTH = {};

const updateSlotsByMonth = slots => {
  SLOTS_BY_MONTH = {};

  return slots
    .filter(slot => formatDateSelected(slot.date) >= today)
    .forEach(slot => {
      SLOTS_BY_MONTH[slot.date] = {
        date: formatDateSelected(slot.date),
        times: SLOTS_BY_MONTH[slot.date]?.times ? SLOTS_BY_MONTH[slot.date].times.concat(slot.time) : [slot.time],
        doctors: SLOTS_BY_MONTH[slot.date]?.doctors ? SLOTS_BY_MONTH[slot.date].doctors.concat(slot.doctors[0]) : [slot.doctors[0]],
      };
    });
}

const formatAvailableDates = dates => {
  if (!dates.length) {
    return '';
  }

  const year = dates[0].getFullYear();
  const month = dates[0].getMonth() + 1;
  const day = dates[0].getDate();

  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
}

export const initCalendar = ({ slots, dates }) => {
  const {
    customDays,
    customMonths,
  } = window.calendarConfig;
  let availableDates = [];
  let formattedDate = '';

  if (picker) {
    picker.remove();
  }

  picker = datepicker('.calendar__input', {
    customDays,
    customMonths,
    startDay: 1,
    alwaysShow: true,
    dateSelected: new Date(),
    minDate: new Date(),
    respectDisabledReadOnly: true,
    disableYearOverlay: true,
    showAllDates: true,
    formatter: (input, date, instance) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      input.value = `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}.${year}`;
    },
    disabler: date => (
      !availableDates.find(availableDate =>
        availableDate.getTime() === date.getTime()
      )
    )
  })

  const calendar = picker.calendar;
  const beforePeriod = document.querySelector('#js-time-before');
  const afterPeriod = document.querySelector('#js-time-after');

  const renderMonth = (year, month) => {
    Promise.resolve()
      .then(() => {
        toggleClass(calendar, LOADING);
        toggleClass(afterPeriod, LOADING);
        toggleClass(beforePeriod, LOADING);
      })
      .then(() => getStartMonth(year, month))
      .then(({ year, month, day, dates }) => {
        if (dates.length) {
          availableDates = calculatedAvailableDates(dates);
          if (availableDates.length) {
            formattedDate = formatAvailableDates(availableDates);
            picker.setDate(availableDates[0]);
          }
        }
        toggleClass(calendar, LOADING);
        toggleClass(calendar, DISABLED);

        return getAvailableSlots(year, month, day, dates);
      })
      .then(({ slots }) => {
        if (slots.length) {
          updateSlotsByMonth(slots);
          if (availableDates.length) {
            renderPeriod(SLOTS_BY_MONTH[formattedDate]);
          } else {
            renderPeriod({});
          }
        } else {
          renderPeriod({});
        }
      })
      .then(() => picker.disabled = false)
      .finally(() => {
        toggleClass(calendar, DISABLED);
        toggleClass(afterPeriod, LOADING);
        toggleClass(beforePeriod, LOADING);
      })
  }

  renderMonth();

  picker.onSelect = instance => {
    const {
      year,
      month,
      day,
    } = getInstanceDate(instance);
    const formattedDate = `${year}-${month}-${day}`;
    window.state['date'] = formattedDate;

    Promise.resolve()
      .then(() => {
        toggleClass(afterPeriod, LOADING);
        toggleClass(beforePeriod, LOADING);
      })
      .then(() => getAvailableSlots(year, month, day))
      .then(({ slots }) => {
        updateSlotsByMonth(slots);
        renderPeriod(SLOTS_BY_MONTH[formattedDate])
      })
      .finally(() => {
        toggleClass(afterPeriod, LOADING);
        toggleClass(beforePeriod, LOADING);
      })
  }

  picker.onMonthChange = instance => {
    const {
      year,
      month,
    } = getInstanceDate(instance);

    renderMonth(year, month);
  }
}


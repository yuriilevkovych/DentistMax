const isLocal = window.location.hostname === 'localhost';

// https://testbooking.navstevalekara.sk/api
// https://bookingnl.intelliweb.tech/api
const host = isLocal ? 'https://bookingnl.intelliweb.tech/api' : '/api';
const date = new Date();

export const getAvailableDates = (year, month) => {
  return fetch(`${host}/get-doctor-slots?doctor=${window.state.doctor}&year=${year}&month=${month}`)
    .then(response => response.json())
    .then(res => res.slots)
    .catch(console.error)
}

const getDoctorsParam = () => window.state.doctor.split(',').reduce((acc, item) => {
  return `${acc}&doctors[]=${item}`
}, '');

const getExaminationsParam = () => {
  return `&examinations=${window.state.examination}`;
}

export const getAvailableSlots = (year, month, day, dates) => {
  const monthStr = Number(month) < 10 ? `0${Number(month)}` : month;
  const dayStr = Number(day) < 10 ? `0${Number(day)}` : day;

  if (!year || !month || !day) {
    return Promise.resolve({ slots: [], dates: [] });
  }

  return fetch(`${host}/get-doctor-free-slots?&date=${year}-${monthStr}-${dayStr}${getExaminationsParam()}`)
    .then(response => response.json())
    .then(res => ({
      slots: res.slots || [],
      dates: dates || [],
    }))
    .catch(console.error)
}

const today = (new Date()).setHours(0,0,0,0)

const formatDateSelected = date => {
  if (!date) return;

  const [year, month, day] = date.split("-").map(Number);

  return new Date(year, month - 1, day);
}

export const getStartMonth = (
  year = date.getFullYear(),
  month = (date.getMonth() + 1)
) => {
  return fetch(`${host}/get-doctor-slots?&year=${year}&month=${Number(month)}${getExaminationsParam()}`)
    .then(response => response.json())
    .then(res => {
      if (!res.slots.length) {
        return Promise.resolve({ slots: [], dates: [] });
      }
      const filterSlots = res.slots
        .filter(slot => {
          return formatDateSelected(slot.date) >= today
        });
      const firstSlot = filterSlots[0].date;
      const [year, month, day] = firstSlot.split('-');

      return {
        year, month, day, dates: filterSlots
      }

      return getAvailableSlots(year, month, day, filterSlots);
    })
    .catch(console.error)
}

export const getSpecData = () => {
  return fetch(`${host}/get-specializations?hcenter=${window.state.hcenter}`)
    .then(response => response.json())
    .then(res => Object.values(res.data))
    .catch(console.error)
}

export const getPlansData = () => {
  return fetch(`${host}/get-examinations?hcenter=${window.state.hcenter}&specialization=${window.state.specialization}`)
    .then(response => response.json())
    .then(res => {
      return res.data
    })
    .catch(console.error);
}

export const getDoctorsData = () => {
  return fetch(`${host}/get-doctors?hcenter=${window.state.hcenter}${getExaminationsParam()}`)
    .then(response => response.json())
    .then(res => Object.values(res.data))
    .catch(console.error);
}

export const sendOrder = (data) => {
  return fetch(`${host}/create-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(console.error)
}
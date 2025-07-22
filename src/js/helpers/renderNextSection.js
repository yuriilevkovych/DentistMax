import { renderContentData } from './contentData.js';

export const renderNextSection = (section) => {
  const nextSection = section.nextElementSibling;
  const dataContent = document.querySelectorAll('[data-content]');
  const index = Array.from(dataContent).indexOf(section);
  section.classList.add('active');

  for (let i = 0; i < dataContent.length; i++) {
    if (i > index) {
      dataContent[i].classList.add('hidden');
    }

  }

  renderContentData(index, nextSection);
};
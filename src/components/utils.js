export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const random = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const formatDuration = (duration) => {
  const date = new Date(0);
  date.setSeconds(duration);

  const format = [];
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  if (hours) {
    format.push(`${hours}h`);
  }

  if (minutes) {
    format.push(`${minutes}m`);
  }

  return format.join(` `);
};

export const decimalRandom = (min, max, decimalPlaces) => {
  const rand = Math.random() < 0.5 ? ((1 - Math.random()) * (max - min) + min) : (Math.random() * (max - min) + min);
  const power = Math.pow(10, decimalPlaces);
  return Math.floor(rand * power) / power;
};

export const randomArrayItem = (array) => array[random(0, array.length - 1)];

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const onOutsideClick = (element, callback) => {
  const handleClick = (evt) => {
    const isClickInside = element.contains(evt.target);

    if (!isClickInside) {
      callback(() => document.removeEventListener(`click`, handleClick));
    }
  };

  document.addEventListener(`click`, handleClick);

  return () => document.removeEventListener(`click`, handleClick);
};

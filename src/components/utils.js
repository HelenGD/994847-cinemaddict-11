export const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

export const random = function (min, max) {
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

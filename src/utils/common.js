const ESC_KEYCODE = 27;

export const formatDuration = (duration) => {
  const date = new Date(0);
  date.setMinutes(duration);

  const formats = [];
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  if (hours) {
    formats.push(`${hours}h`);
  }

  if (minutes) {
    formats.push(`${minutes}m`);
  }

  return formats.join(` `);
};

export const checkEscPress = (evt, action) => {
  if (evt.keyCode === ESC_KEYCODE) {
    action();
  }
};

export const isOnline = () => navigator.onLine;

export const toClamp = (fullText, maxLength) => {
  const shortText = fullText.substring(0, maxLength);

  return shortText.length < fullText.length
    ? `${shortText}...`
    : shortText;
};

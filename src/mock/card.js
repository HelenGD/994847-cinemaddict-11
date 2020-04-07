import {random, formatDuration} from '../components/utils';

const COMMENT_COUNT = 5;

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const titles = [
  `Унесенные ветром`,
  `Магазинчик за углом`,
  `Зеленая миля`,
  `1 + 1`,
  `Мост Ватерлоо`,
  `Начало`,
  `Паразиты`,
  `Ла-ла-лэнд`,
  `Вестсайдская история`,
  `Завтрак у Тиффани`,
  `Дневная красавица`,
  `Мечтатели`,
  `Укрошение строптивого`,
  `Моя прекрасная леди`,
  `Шарада`
];

const ratings = [
  `8.4`,
  `7.9`,
  `9.1`,
  `8.8`,
  `8.0`,
  `8.7`,
  `8.1`,
  `8.0`,
  `7.5`,
  `8.1`,
  `7.5`,
  `7.4`,
  `8.4`,
  `7.8`,
  `8.0`
];

const posters = [
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`
];

const years = [
  `1939`,
  `1940`,
  `1999`,
  `2011`,
  `1940`,
  `2010`,
  `2019`,
  `2016`,
  `1961`,
  `1961`,
  `1967`,
  `2003`,
  `1980`,
  `1964`,
  `1963`
];

const durations = [
  `3h 42m`,
  `1h 39m`,
  `3h 09m`,
  `1h 52m`,
  `1h 48m`,
  `2h 28m`,
  `2h 11m`,
  `2h 08m`,
  `2h 33m`,
  `1h 55m`,
  `1h 40m`,
  `1h 56m`,
  `1h 47`,
  `2h 45m`,
  `1h 53m`
];

const genres = [
  `melodrama`,
  `drama`,
  `fantasy`,
  `drama`,
  `drama`,
  `fantasy`,
  `thriller`,
  `musical`,
  `musical`,
  `drama`,
  `drama`,
  `drama`,
  `comedy`,
  `musical`,
  `thriller`
];

const generateCard = (_, index) => {
  const randomIndex = random(0, descriptions.length - 1);
  const description = descriptions[randomIndex];
  const comment = random(0, COMMENT_COUNT);

  return {
    title: titles[index],
    rating: ratings[index],
    poster: posters[index],
    year: years[index],
    duration: formatDuration(random(3600, 7200)),
    genre: genres[index],
    description,
    comment,
  };
};

const generateDetailsOfFilm = () => {
  const randomIndex = random(0, descriptions.length - 1);
  const description = descriptions[randomIndex];

  return {
    title: `Унесенные ветром`,
    rating: 5.5,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
    duration: formatDuration(random(3600, 7200)),
    year: years[random(0, years.length - 1)],
    directors: [`Виктор Флеминг`, `Джордж Кьюкор`, `Сэм Вуд`],
    writers: [`Маргарет Митчелл`, `Сидни Ховард`],
    actors: [`Вивьен Ли`, `Кларк Гейбл`, `Лесли Говард`, `Оливия Де Хэвилленд`],
    release: `15 Декабря 1939`,
    countries: [`USA`],
    genres: [`drama`, `melodrama`],
    originalTitle: `Gone with the Wind`,
    ratingAge: [`0+`, `6+`, `12+`, `16+`, `18+`],
    poster: `./images/posters/santa-claus-conquers-the-martians.jpg`,
  };
};

// const generateComment = () => {
//   return {
//     text: `Норм`,
//     emotion: `./images/enoji/snile.jpg`,
//     author: `Ваня`,
//     date: `2019/12/31 23:59`,
//   };
// };


const generateCards = (count) => {
  return Array(count)
    .fill(``)
    .map(generateCard);
};

// const generateComments = (count) => {
//   return Array(count)
//     .fill(``)
//     .map(generateCard);
// };

export {generateCard, generateCards, generateDetailsOfFilm};

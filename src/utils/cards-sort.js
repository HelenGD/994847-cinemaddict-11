export const SortType = {
  DEFAULT: `default`,
  DATE_RELEASE: `date-release`,
  RATING: `rating`,
};

export const cardsSort = (cards, sortType = SortType.DEFAULT) => {
  const sortedCards = cards.slice();

  switch (sortType) {
    case SortType.DATE_RELEASE:
      sortedCards.sort((a, b) => b.releaseYear - a.releaseYear);
      break;
    case SortType.RATING:
      sortedCards.sort((a, b) => b.rating - a.rating);
      break;
    default:
      sortedCards.sort((a, b) => {
        if (b.title === a.title) {
          return 0;
        }
        return b.title > a.title ? 1 : -1;
      });
  }

  return sortedCards;
};

export const SortType = {
  DEFAULT: `default`,
  DATE_RELEASE: `date-release`,
  RATING: `rating`,
};

export const cardsSort = (cards, sortType) => {
  const sortedCards = cards.slice();

  switch (sortType) {
    case SortType.DATE_RELEASE:
      sortedCards.sort((a, b) => b.date - a.date);
      break;
    case SortType.RATING:
      sortedCards.sort((a, b) => b.rating - a.rating);
      break;
  }

  return sortedCards;
};

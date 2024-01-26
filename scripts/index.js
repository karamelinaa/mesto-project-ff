const content = document.querySelector(".content");
const cardPlace = content.querySelector(".places__list");
const addButton = content.querySelector(".profile__add-button");
const cardTemplate = document.querySelector("#card-template");

let cardIndex = 0;

function createCard(linkValue, nameValue) {
  const cardElement = cardTemplate.content
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__image").src = linkValue;
  cardElement.querySelector(".card__image").alt = nameValue;
  cardElement.querySelector(".card__title").textContent = nameValue;

  cardPlace.prepend(cardElement);

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => {
      deleteCard(cardElement);
    });

  return cardElement;
}

initialCards.forEach((card) => {
    createCard(card.link, card.name);
});

function deleteCard(cardElement) {
  cardElement.remove();
  if (cardPlace.children.length === 0) {
    cardIndex = 0;
  }
}

addButton.addEventListener("click", function () {
  if (cardIndex < initialCards.length) {
    createCard(initialCards[cardIndex].link, initialCards[cardIndex].name);
    cardIndex++;
  }
});
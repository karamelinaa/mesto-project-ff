// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template");

// @todo: DOM узлы
const content = document.querySelector(".content");
const cardPlace = content.querySelector(".places__list");

// @todo: Функция создания карточки

function createCard(card, deleteCard) {
  const cardElement = cardTemplate.content
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => {
      deleteCard(cardElement);
    });

  return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Добавление карточeк на страницу

function renderCard(card) {
  cardPlace.append(createCard(card, deleteCard));
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  renderCard(card);
});
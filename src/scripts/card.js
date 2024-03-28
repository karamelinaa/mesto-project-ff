//Функция создания карточки
export function createCard(card, deleteCard, likeCard, openImage) {
  const cardTemplate = document.querySelector("#card-template");
  const cardElement = cardTemplate.content
    .querySelector(".places__item")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardElement.querySelector(".card__title").textContent = card.name;

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => {
      deleteCard(cardElement);
    });

  cardLikeButton.addEventListener("click", function (evt) {
    likeCard(evt);
  });

  cardImage.addEventListener("click", (evt) => {
    openImage(evt, card);
  });

  return cardElement;
}

//лайк карточки

export function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

// Функция удаления карточки

export function deleteCard(cardElement) {
  cardElement.remove();
}
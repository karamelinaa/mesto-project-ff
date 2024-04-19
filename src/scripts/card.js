import { addLike, deleteLike, removeCard } from "./api.js";

//создания карточки

export function createCard(card, userId, deleteCard, likeCard, openImage) {
  const cardTemplate = document.querySelector("#card-template");
  const cardElement = cardTemplate.content
    .querySelector(".places__item")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardId = card._id;

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  cardLikeCounter.textContent = card.likes.length;

  cardImage.addEventListener("click", (evt) => {
    openImage(evt, card);
  });

  cardLikeButton.addEventListener("click", () => {
    likeCard(cardLikeButton, cardLikeCounter, cardId);
  });

  const myLike = card.likes.some((like) => like._id === userId);
  if (myLike) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  if (card.owner._id !== userId) {
    cardDeleteButton.remove();
  } else {
    cardDeleteButton.addEventListener("click", () => {
      deleteCard(cardId, cardElement);
    });
  }

  return cardElement;
}

//лайк

export function likeCard(cardLikeButton, cardLikeCounter, cardId) {
  const likeApi = cardLikeButton.classList.contains(
    "card__like-button_is-active"
  )
    ? deleteLike
    : addLike;
  likeApi(cardId)
    .then((data) => {
      cardLikeCounter.textContent = data.likes.length;
      cardLikeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.log("Ошибка при нажатии лайка:" + err);
    });
}

//удаление карточки

export function deleteCard(cardId, cardElement) {
  removeCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log("Ошибка при удалении карточки:" + err);
    });
}
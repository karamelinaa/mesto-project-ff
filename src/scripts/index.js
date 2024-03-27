import "../pages/index.css";
import { openPopup, closePopup } from "./modal.js";
import { createCard, deleteCard, likeCard } from "./card.js";
import { initialCards } from "./cards.js";

const content = document.querySelector(".content");
const cardPlace = document.querySelector(".places__list");

const popupEdit = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");
const closeButtonEdit = popupEdit.querySelector(".popup__close");

const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");

const popupNewCard = document.querySelector(".popup_type_new-card");
const addButton = document.querySelector(".profile__add-button");
const closeButtonCard = popupNewCard.querySelector(".popup__close");

const formPlace = document.forms["new-place"];
const placeInput = document.querySelector(".popup__input_type_card-name");
const urlInput = document.querySelector(".popup__input_type_url");

//Функция открытия изображения

function openImage(evt, card) {
  if (!evt.target.classList.contains("card__delete-button")) {
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupPlace.textContent = card.name;
    openPopup(popupTypeImg);
    closePopup(popupTypeImg);
  }
};

//открыть и закрыть попап для редактирования профиля

editButton.addEventListener("click", () => {
  openPopup(popupEdit);
});

closeButtonEdit.addEventListener("click", function () {
  closePopup(popupEdit);
});

//открыть и закрыть попап для новой карточки

addButton.addEventListener("click", () => {
  openPopup(popupNewCard);
});

closeButtonCard.addEventListener("click", function () {
  closePopup(popupNewCard);
});

//редактирование профиля

function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;

  popupEdit.classList.remove("popup_is-opened");
}

formElement.addEventListener("submit", handleFormSubmit);

//добавление новой карточки

formPlace.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const card = {
    link: urlInput.value,
    name: placeInput.value,
  };

  cardPlace.prepend(createCard(card, deleteCard));

  popupNewCard.classList.remove("popup_is-opened");
  formPlace.reset();
});

//лайк

cardPlace.addEventListener("click", function (evt) {
  likeCard(evt);
});

// Добавление карточeк на страницу

function renderCard(card) {
  cardPlace.append(createCard(card, deleteCard));
};

//  Вывести карточки на страницу

initialCards.forEach((card) => {
  renderCard(card);
});
import "../pages/index.css";
import { openPopup, closePopup } from "./modal.js";
import { createCard, deleteCard, likeCard } from "./card.js";
import { initialCards } from "./cards.js";

const content = document.querySelector(".content");
const cardPlace = document.querySelector(".places__list");

const popupEdit = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileEditForm = popupEdit.querySelector(".popup__form");
const nameInput = profileEditForm.querySelector(".popup__input_type_name");
const jobInput = profileEditForm.querySelector(
  ".popup__input_type_description"
);

const popupNewCard = document.querySelector(".popup_type_new-card");
const addButton = document.querySelector(".profile__add-button");
const buttonCloseList = document.querySelectorAll(".popup__close");

const formPlace = document.forms["new-place"];
const placeInput = document.querySelector(".popup__input_type_card-name");
const urlInput = document.querySelector(".popup__input_type_url");

const popupTypeImg = document.querySelector(".popup_type_image");
const popupImage = popupTypeImg.querySelector(".popup__image");
const popupPlace = popupTypeImg.querySelector(".popup__caption");

//  Анимация попапов при загрузке

document.addEventListener("DOMContentLoaded", function () {
  const popups = document.querySelectorAll(".popup");
  popups.forEach(function (popup) {
    popup.classList.add("popup_is-animated");
  });
});

//Функция открытия изображения

function openImage(evt, card) {
  if (!evt.target.classList.contains("card__delete-button")) {
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupPlace.textContent = card.name;
    popupTypeImg.style.background = "rgba(0, 0, 0, 0.9)";
    openPopup(popupTypeImg);
  }
}

//открыть попап для редактирования профиля

editButton.addEventListener("click", () => {
  fillFormInputs();
  openPopup(popupEdit);
});

//открыть попап для новой карточки

addButton.addEventListener("click", () => {
  openPopup(popupNewCard);
});

// заполнить попап для редактирования
function fillFormInputs() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

//закрыть попап

buttonCloseList.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => closePopup(popup));
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});

//редактирование профиля

function handleFormSubmitEdit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closePopup(popupEdit);
}

profileEditForm.addEventListener("submit", handleFormSubmitEdit);

//добавление новой карточки

formPlace.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const card = {
    link: urlInput.value,
    name: placeInput.value,
  };

  cardPlace.prepend(createCard(card, deleteCard, likeCard, openImage));

  closePopup(popupNewCard);

  formPlace.reset();
});

// Добавление карточeк на страницу

function renderCard(card) {
  cardPlace.append(createCard(card, deleteCard, likeCard, openImage));
}

//  Вывести карточки на страницу

initialCards.forEach((card) => {
  renderCard(card);
});
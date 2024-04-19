import "../pages/index.css";
import { openPopup, closePopup } from "./modal.js";
import { createCard, deleteCard, likeCard } from "./card.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getUserInfo,
  getCards,
  editUser,
  postCard,
  changeAvatarLink
} from "./api.js";

const content = document.querySelector(".content");
const cardPlace = document.querySelector(".places__list");

const popupNewCard = document.querySelector(".popup_type_new-card");
const popupCardForm = popupNewCard.querySelector(".popup__form");
const cardButton = document.querySelector(".profile__add-button");
const buttonCloseList = document.querySelectorAll(".popup__close");

const popupTypeImg = document.querySelector(".popup_type_image");
const popupImage = popupTypeImg.querySelector(".popup__image");
const popupPlace = popupTypeImg.querySelector(".popup__caption");
const imageSection = document.querySelector(".profile__image-section");
const profileImage = document.querySelector(".profile__image");

const popupEdit = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");
const profileEditForm = popupEdit.querySelector(".popup__form");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popupAvatar = document.querySelector(".popup_type_avatar");
const popupAvatarForm = popupAvatar.querySelector(".popup__form");
const avatarInput = document.querySelector(".popup__input_type_avatar");

const popupButtonCard = popupNewCard.querySelector(".popup__button");
const popupButtonEdit = popupEdit.querySelector(".popup__button");
const popupButtonAvatar = popupAvatar.querySelector(".popup__button");

//кнопка сохранить

function loadingSave(loading, button) {
  button.textContent = loading ? "Сохранение..." : "Сохранить";
}

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

    openPopup(popupTypeImg);
  }
}

//открыть попап для редактирования профиля

editButton.addEventListener("click", () => {
  clearValidation(profileEditForm, validationConfig);
  openPopup(popupEdit);

  profileEditForm.name.value = profileTitle.textContent;
  profileEditForm.description.value = profileDescription.textContent;
});

//открыть попап для новой карточки

cardButton.addEventListener("click", () => {
  popupCardForm.reset();

  clearValidation(popupNewCard, validationConfig);
  openPopup(popupNewCard);
});

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

  loadingSave(true, popupButtonEdit);

  editUser(evt.target.name.value, evt.target.description.value)
    .then((user) => {
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about;

      closePopup(popupEdit);
      profileEditForm.reset();
    })
    .catch((err) => {
      console.log("Ошибка при редактировании профиля:" + err);
    })
    .finally(() => {
      loadingSave(false, popupButtonEdit);
    });
}

profileEditForm.addEventListener("submit", handleFormSubmitEdit);

//добавление новой карточки

function handleFormSubmitCard(evt) {
  evt.preventDefault();

  loadingSave(true, popupButtonCard);

  postCard(evt.target.place.value, evt.target.link.value)
    .then((card) => {
      cardPlace.prepend(
        createCard(card, card.owner._id, deleteCard, likeCard, openImage)
      );
      closePopup(popupNewCard);
    })
    .catch((err) => {
      console.log("Ошибка при добавлении карточки:" + err);
    })
    .finally(() => {
      loadingSave(false, popupButtonCard);
    });
}

popupCardForm.addEventListener("submit", handleFormSubmitCard);

//изменить аватар

function handleFormSubmitAvatar(evt) {
  evt.preventDefault();

  loadingSave(true, popupButtonAvatar);

  changeAvatarLink(evt.target.link.value)
    .then((photo) => {
      profileImage.src = photo.avatar;
      closePopup(popupAvatar);
      popupAvatarForm.reset();
    })
    .catch((err) => {
      console.log("Ошибка при обновлении аватара:" + err);
    })
    .finally(() => {
      loadingSave(false, popupButtonAvatar);
    });
}

popupAvatarForm.addEventListener("submit", handleFormSubmitAvatar);

imageSection.addEventListener("click", () => {
  avatarInput.value = "";
  clearValidation(popupAvatarForm, validationConfig);
  openPopup(popupAvatar);
});

// валидация

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  inputErrorClassVisible: "popup__error_visible",
  errorClass: "popup__input-error",
};

enableValidation(validationConfig);

Promise.all([getUserInfo(), getCards()])
  .then(([user, cards]) => {
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.src = user.avatar;

    cards.forEach((card) => {
      cardPlace.append(
        createCard(card, user._id, deleteCard, likeCard, openImage)
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
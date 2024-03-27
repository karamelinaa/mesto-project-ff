//Функция создания карточки
export function createCard(card, deleteCard, likeCard, openImage) {
    const cardTemplate = document.querySelector("#card-template");
    const cardElement = cardTemplate.content
        .querySelector(".places__item")
        .cloneNode(true);

    const cardImage = cardElement.querySelector(".card__image");

    cardImage.src = card.link;
    cardImage.alt = card.name;

    cardElement.querySelector(".card__title").textContent = card.name;

    cardElement
        .querySelector(".card__delete-button")
        .addEventListener("click", () => {
            deleteCard(cardElement);
        });   

    cardImage.addEventListener("click", (evt) => {
        openImage(evt, card);
    });

    return cardElement;
}

// Функция удаления карточки

export function deleteCard(cardElement) {
    cardElement.remove();
}

//лайк карточки

export function likeCard(evt) {
    if (evt.target.classList.contains("card__like-button")) {
        evt.target.classList.toggle("card__like-button_is-active");
    }
}

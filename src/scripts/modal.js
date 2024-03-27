//открыть попап для редактирование профиля

export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    popup.classList.add('popup_is-animated');
    document.addEventListener('keydown', (evt) => closeEsc(evt, popup));
    popup.addEventListener('click', (evt) => closeOverlay(evt, popup));
}; 


export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    popup.classList.add('popup_is-animated');
    document.removeEventListener('keydown', (evt) => closeEsc(evt, popup));
    popup.removeEventListener('click', (evt) => closeOverlay(evt, popup));
}

function closeOverlay(evt, popup) {
    if (evt.target === popup) {
        closePopup(popup);
    }
}
  
function closeEsc(evt, popup) {
    if (evt.key === 'Escape') {
        closePopup(popup);
    }
}
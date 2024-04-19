const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-11",
  headers: {
    authorization: "d43e5c95-e666-4796-94b8-8b7619f6b044",
    "Content-Type": "application/json",
  },
};

export function handleResponse(res, message) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${message}: ${res.status}`);
}

//запрос данных пользователя

export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    return handleResponse(res, "Ошибка при запросе данных пользователя");
  });
}

//запрос карточек

export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    return handleResponse(res, "Ошибка при получении карточек");
  });
}

//запрос на редактирование профиля

export function editUser(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => {
    return handleResponse(res, "Ошибка при редактировании профиля");
  });
}

//запрос на добавление карточки

export function postCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => {
    return handleResponse(res, "Ошибка при добавлении карточки");
  });
}

export function removeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return handleResponse(res, "Ошибка при удалении карточки");
  });
}

export function addLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    return handleResponse(res, "Ошибка при нажатии лайка");
  });
}

export function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return handleResponse(res, "Ошибка при удалении лайка");
  });
}

export function changeAvatarLink(link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then((res) => {
    return handleResponse(res, "Ошибка при обновлении фото");
  });
}
// Блок profile
let profile = document.querySelector('.profile');
// Кнопка редактировать данные из профиля
let editBtn = profile.querySelector('.profile__edit-btn');
// Данные из профиля
let titleName = profile.querySelector('.profile__title-name');
let subtitleDoes = profile.querySelector('.profile__subtitle-does');

// Блок popup
let popup = document.querySelector('.popup');
// Данные пользователя
let popupFormName = document.querySelector('.popup__form-input-text_value_name');
let popupFormDoes = document.querySelector('.popup__form-input-text_value_does');
// Кнопка закрытие попапа
let popupBtn = popup.querySelector('.popup__btn');

// Блок form
let form = popup.querySelector('.popup__form');

function editProfile() {
  titleName.textContent = popupFormName.value;
  subtitleDoes.textContent = popupFormDoes.value;
}

/* Открытие попапа */
function openPopup() {
  popup.classList.add('popup_opened');

  /* Вынес повторяющий код в отдельную функцию */
  editProfile();
}

editBtn.addEventListener('click', openPopup);

/* Закрытие попапа */
function closePopup() {
  popup.classList.remove('popup_opened');

  /* Есть условие в брифе. Если пользователь закрывает попап нажав на крестик, то введённые значения не сохраняются. */
  popupFormName.value = titleName.textContent;
  popupFormDoes.value = subtitleDoes.textContent;
}

popupBtn.addEventListener('click', closePopup);

/* Форма редактирования профиля */
function formSubmitHandler (event) {
  event.preventDefault();

  popup.classList.remove('popup_opened');

  /* Вынес повторяющий код в отдельную функцию */
  editProfile();
}

form.addEventListener('submit', formSubmitHandler);

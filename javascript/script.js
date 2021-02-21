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

/* Сохраняет данные из формы в блок профиля */
function editProfile() {
  titleName.textContent = popupFormName.value;
  subtitleDoes.textContent = popupFormDoes.value;
}

/* Меняет класс в зависимости от условия */
function toggleClass() {
  if (popup.classList.contains('popup_opened')) {
    popup.classList.toggle('popup_opened');
    /* Чтобы popup не скролился */
    document.body.setAttribute('style', 'overflow: auto');
  } else {
    popup.classList.toggle('popup_opened');
    /* Чтобы popup не скролился */
    document.body.setAttribute('style', 'overflow: hidden');
  }
}

/* Открытие попапа */
function openPopup() {
  /* Вынес повторяющий код в отдельную функцию */
  toggleClass();

  /* Вынес повторяющий код в отдельную функцию */
  editProfile();
}

editBtn.addEventListener('click', openPopup);

/* Закрытие попапа */
function closePopup() {
  /* Вынес повторяющий код в отдельную функцию */
  toggleClass();

  /* Есть условие в брифе. Если пользователь закрывает попап нажав на крестик, то введённые значения не сохраняются. */
  popupFormName.value = titleName.textContent;
  popupFormDoes.value = subtitleDoes.textContent;
}

popupBtn.addEventListener('click', closePopup);

/* Форма редактирования профиля */
function formSubmitHandler (event) {
  event.preventDefault();

  /* Вынес повторяющий код в отдельную функцию */
  editProfile();

  /* Вынес повторяющий код в отдельную функцию */
  toggleClass();
}

form.addEventListener('submit', formSubmitHandler);

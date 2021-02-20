let name = 'Жак-Ив Кусто';
let does = 'Исследователь океана';

// Блок profile
let profile = document.querySelector('.profile');
// Кнопка редактировать данные из профиля
let editBtn = profile.querySelector('.profile__edit-btn');

// Блок popup
let popup = document.querySelector('.popup');
// Данные пользователя
let popupFormName = document.querySelector('#popup__form-name');
let popupFormDoes = document.querySelector('#popup__form-does');
// Кнопка закрытие попапа
let popupBtn = popup.querySelector('.popup__btn');

// Блок form
let form = popup.querySelector('.popup__form');

/* Функция всплывет при компиляции кода */
editProfile();

// Записывает текст из переменных name и does в профиль с данными пользователя. Меняет value у текстовых полей
function editProfile() {
  // Данные из профиля
  let titleName = profile.querySelector('.profile__title-name');
  let subtitleDoes = profile.querySelector('.profile__subtitle-does');

  titleName.textContent = name;
  subtitleDoes.textContent = does;

  popupFormName.value = name;
  popupFormDoes.value = does;

  return 'Профиль успешно изменен';
}

/* Открытие попапа */
function openPopup(event) {
  event.preventDefault();

  popup.classList.add('popup_opened');
}

editBtn.addEventListener('click', openPopup);

/* Закрытие попапа */
function closePopup(event) {
  event.preventDefault();

  popup.classList.remove('popup_opened');

  popupFormName.value = name;
  popupFormDoes.value = does;
}

popupBtn.addEventListener('click', closePopup);

/* Форма редактирования профиля */
function formSubmitHandler (event) {
  event.preventDefault();

  name = popupFormName.value;
  does = popupFormDoes.value;

  editProfile();

  popup.classList.remove('popup_opened');
}

form.addEventListener('submit', formSubmitHandler);

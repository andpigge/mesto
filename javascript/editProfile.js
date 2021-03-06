const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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


/* Список карточек с местами */
const place = document.querySelector('.place');
const placeList = document.querySelector('.place__list');

/* Шаблон карточек с местами */
const placeListTemplate = document.querySelector('.place-list-template');


/* Функция скрывает код */
const editProfile = () => {

  /* Сохраняет данные из формы в блок профиля */
  function editProfile() {
    titleName.textContent = popupFormName.value;
    subtitleDoes.textContent = popupFormDoes.value;
  }

  /* Сохраняет данные из блока профиля в форму  */
  function editInputValue() {
    popupFormName.value = titleName.textContent;
    popupFormDoes.value = subtitleDoes.textContent;
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

    /* Есть условие в брифе. Если пользователь закрывает попап нажав на крестик, то введённые значения не сохраняются. */
    /* Решение: при открытии popup, данные из профиля, заносятся в форму */
    /* editInputValue(); */
  }

  editBtn.addEventListener('click', openPopup);

  /* Закрытие попапа */
  popupBtn.addEventListener('click', toggleClass);

  /* Форма редактирования профиля */
  function formSubmitHandler (event) {
    event.preventDefault();

    editProfile();

    /* Вынес повторяющий код в отдельную функцию */
    toggleClass();
  }

  form.addEventListener('submit', formSubmitHandler);

};

/* Функция скрывает код */
const placeShow = () => {

  /* При загрузке страницы данные в карточки заносятся из массива */
  showCards();

  /* Клонирует элемент шаблона, и выводит в карточку с местами данные из массива.
  Ничего не возвращает, так как данные из массива будут подгружаться при загрузке страницы */
  function showCards() {
    return initialCards.forEach(item => {
      const placeItem = placeListTemplate.content.querySelector('.place__item').cloneNode('true');

      placeItem.querySelector('.card-place__img').src = item.link;
      placeItem.querySelector('.card-place__title').textContent = item.name;

      placeList.append(placeItem);
    });
  }

};

const placeAdd = () => {

  

}

/* Модуль редактирования профиля */
editProfile();

/* Модуль подгрузки данных из массива в карточки с местами */
placeShow();



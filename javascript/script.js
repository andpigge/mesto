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
const profile = document.querySelector('.profile');
// Кнопка редактировать данные из профиля
const editBtn = profile.querySelector('.profile__edit-btn');
// Данные из профиля
const titleName = profile.querySelector('.profile__title-name');
const subtitleDoes = profile.querySelector('.profile__subtitle-does');
/* Кнопка добавляет карточки с местами */
const btnAddCard = profile.querySelector('.profile__add-card-place');

// Попап редактирования профиля
const popupEditProfile = document.querySelector('.popup_edit_profile');
// Попад добавления карточек
const popupAddCard = document.querySelector('.popup_add_card');
/* Попап просмотр картинки */
const popupShowImg = document.querySelector('.popup_review_img');
// Кнопки закрытие попапа
const popupBtns = document.querySelectorAll('.popup__btn');

// Форма редактирует профиль
const formEditProfile = popupEditProfile.querySelector('.popup__form');
// Данные пользователя, из формы редактирования профиля
const inputEditName = formEditProfile.querySelector('.popup__form-input-text_value_name');
const inputEditDoes = formEditProfile.querySelector('.popup__form-input-text_value_does');

/* Форма создание карточек */
const formAddCard = popupAddCard.querySelector('.popup__form');
// Данные пользователя, из формы добавления карточки
const inputAddName = formAddCard.querySelector('.popup__form-input-text_value_name');
const inputAddSrcImg = formAddCard.querySelector('.popup__form-input-text_value_does');


/* Список карточек с местами */
const place = document.querySelector('.place');
const placeList = place.querySelector('.place__list');

/* Шаблон карточек с местами */
const placeListTemplate = document.querySelector('.place-list-template');


/* Добавляет класс открытия попапа, на переданный в параметрах попап */
function addPopup(popupType) {
  popupType.classList.add('popup_opened');
}

/* При нажатии на крестик или сохранить, открытый попап закрывается. Принимает параметром событие event, с помощью event узнаем какой попап нужно закрыть, с помощью closest зыкрываем попап дочерней кнопки */
function removePopup(event) {
  event.target.closest('.popup').classList.remove('popup_opened');
}


/* Сохраняет данные из формы в блок профиля */
function editProfile() {
  titleName.textContent = inputEditName.value;
  subtitleDoes.textContent = inputEditDoes.value;
}

/* Сохраняет данные из блока профиля в форму  */
function editInputValue() {
  inputEditName.value = titleName.textContent;
  inputEditDoes.value = subtitleDoes.textContent;
}

/* Открытие попапа редактирования профиля */
function openPopupEditProfile() {
  addPopup(popupEditProfile);

  editInputValue();
}

editBtn.addEventListener('click', openPopupEditProfile);

/* Закрытие попапов нажатие на крестик */
popupBtns.forEach(button => {
  button.addEventListener('click', removePopup);
});

/* Форма редактирования профиля */
function formSubmitHandlerEditProfile (event) {
  event.preventDefault();

  editProfile();

  removePopup(event);
}

formEditProfile.addEventListener('submit', formSubmitHandlerEditProfile);


/* При загрузке страницы данные в карточки заносятся из массива */
showCards();

/* Клонирует элемент шаблона, и выводит в карточку с местами, данные из массива */
function showCards() {
  initialCards.forEach(item => {

    /* В переменную присваивается возвращаемое значение функции */
    const placeItem = createCard(item.name, item.link);

    placeList.append(placeItem);
  });
}

/* Создаст одну карточку с местами. Принимает в параметры имя карточки, и ссылку на картинку */
function createCard(nameCard, linkImg) {
  const placeItem = placeListTemplate.content.querySelector('.place__item').cloneNode('true');

  placeItem.querySelector('.card-place__title').textContent = nameCard;
  placeItem.querySelector('.card-place__img').src = linkImg;

  return placeItem;
}


/* Открытие попапа создания карточки */
function openPopupAddCard() {
  addPopup(popupAddCard);
}

btnAddCard.addEventListener('click', openPopupAddCard);

/* Очищает форму. Первый параметр формы инпуты которые нужно очистить */
function clearFormInput(...inputs) {
  inputs.forEach(input => {
    input.value = '';
  });
}

/* Форма добавления карточки */
function formSubmitHandlerAddCard (event) {
  event.preventDefault();

  const inputAddNameValue = inputAddName.value;
  const inputAddSrcImgValue = inputAddSrcImg.value;

  const objCard = {name: inputAddNameValue, link: inputAddSrcImgValue};

  initialCards.push(objCard);

  /* В переменную присваивается возвращаемое значение функции */
  const placeItem = createCard(inputAddNameValue, inputAddSrcImgValue);

  placeList.prepend(placeItem);

  clearFormInput(inputAddName, inputAddSrcImg);

  removePopup(event);

  /* Эти функции работают с новым созданым DOM */
  findAllBtnDeleteCards();
  findAllImgShow();
  findLikeBtn();
}

formAddCard.addEventListener('submit', formSubmitHandlerAddCard);

/* Меняет класс в кнопке */
function likeCard(event) {
  event.target.classList.toggle('card-place__like-btn_active');
}

/* Ищет все кнопки с лайками, вешает на них события клика */
function findLikeBtn() {
  /* Кпопки лайки)) сердечки */
  const likeBtns = place.querySelectorAll('.card-place__like-btn');

  likeBtns.forEach(btn => {
    btn.addEventListener('click', likeCard);
  });
}

findLikeBtn();

/* Удаляет карточку с верстки и с массива */
function deleteCard(event) {
  event.target.closest('.place__item').remove();
}

/* Находит все кнопки удаления в карточке, и вешает событие click. Понадобится при создании новой карточки */
function findAllBtnDeleteCards() {
  /* Кпопки удаления корточки */
  const deleteBtns = place.querySelectorAll('.card-place__delete-btn');

  deleteBtns.forEach(btn => {
    btn.addEventListener('click', deleteCard);
  });
}

findAllBtnDeleteCards();

/* Просмотр картинки */
function showImg(event) {
  const imgEll = popupShowImg.querySelector('.popup__img');
  imgEll.src = event.target.src;

  const titleCard = event.target.nextElementSibling.textContent;
  popupShowImg.querySelector('.popup__img-text').textContent = titleCard;

  imgEll.alt = titleCard;

  console.log(imgEll)
  addPopup(popupShowImg);
}

/* Находит все имеющие картинки в карточке, и вешает на них событие click */
function findAllImgShow() {
  /* Картинки в карточке */
  const cardImgs = place.querySelectorAll('.card-place__img');

  /* Находит все картинки в карточке, и вешает событие click. Понадобится при создании новой карточки */
  cardImgs.forEach(btn => {
    btn.addEventListener('click', showImg);
  });
}

findAllImgShow();

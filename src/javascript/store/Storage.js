import { api } from '../../pages/index.js';

export default class Storage {

  getCards() {
    return api.getInitialCards().then(dataCards => {
      return dataCards.reduce((acc, card) => {
        acc.unshift(
          { name: card.name,
            link: card.link,
            likes: card.likes,
            idCard: card._id,
            userId: card.owner._id }
        );
        return acc;
      }, []);
    })
  }

  // Не буду удалять Storage. Здесь например данные приходят неправильно. Вместо about приходит name, и наоборот. Все же удобнее данные формировать здесь, и вызывать тоже, так как приближает больше к декларированному программированию. Ну тоесть я здесь все данные с сервера контролирую.
  getUser() {
    return api.getInitialUser().then(user => {
      return {
        profession: user.name,
        name: user.about,
        userId: user._id,
        avatar: user.avatar
      }
    })
  }

  createCard(link, name) {
    return api.postAddCard(link, name).then(card => {
      return {
        name: card.name,
        link: card.link,
        idCard: card._id,
        userId: card.owner._id
      }
    });
  }

  updateProfile(name, about) {
    return api.patchUpdateProfile(name, about).then(updateProfile => {
      return {
        does: updateProfile.name,
        name: updateProfile.about
      }
    });
  }

  deleteCard(id) {
    return api.deleteCard(id);
  }

  likeCard(id) {
    return api.putAppendLike(id).then(like => like);
  }

  deleteLike(id) {
    return api.deleteLike(id);
  }

  updateImgProfile(url) {
    return api.patchUpdateUserAvatar(url).then(profile => profile);
  }
}

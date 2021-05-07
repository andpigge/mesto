import gitPreloader from '../../images/gif/preloaderProfileImg.gif';

export default class RenderLoading {
  constructor(preloaderContainerSelector) {
    this._preloaderContainer = document.querySelector(preloaderContainerSelector);
    this._preloaderContainerTextContent = this._preloaderContainer.textContent;
    this._resultClassVisible = 'plase__result_visible';
  }

  renderLoadingChangeText(isLoading) {
    if (isLoading) {
      this._preloaderContainer.textContent = this._preloaderContainerTextContent.concat('...');
    } else {
      this._preloaderContainer.textContent = this._preloaderContainerTextContent;
    }
  }

  renderLoadingChangeImg() {
    this._preloaderContainer.src = gitPreloader;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._preloaderContainer.classList.add(this._resultClassVisible)
    } else {
      this._preloaderContainer.classList.remove(this._resultClassVisible)
    }
  }
}

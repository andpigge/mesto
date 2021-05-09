import gitPreloader from '../../images/gif/preloaderProfileImg.gif';

export default class RenderLoading {
  constructor(preloaderContainerSelector) {
    this._preloaderContainer = document.querySelector(preloaderContainerSelector);
    this._preloaderContainerTextContent = this._preloaderContainer.textContent;
    this._resultClassVisible = 'plase__result_visible';
  }

  _createHtmlResult() {
    const result = document.createElement('div');
    result.classList.add('plase__result');
    return result;
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
      this._preloaderContainer.append(this._createHtmlResult());
      this._preloaderContainer.querySelector('.plase__result').classList.add(this._resultClassVisible);
    } else {
      this._preloaderContainer.querySelector('.plase__result').classList.remove(this._resultClassVisible);
    }
  }
}

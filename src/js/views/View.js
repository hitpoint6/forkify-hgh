
import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

    // This algorithm may not be efficient enough for real life project
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    // This function will create a dom like object from a string
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // Asterisks can select all the elements
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Update changed TEXT
      if (
        // nodeValue returns null if element, content if text, the question mark is optional chaining
        !newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('********', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Update changed Attributes
      if (!newEl.isEqualNode(curEl)) {
        // console.log(newEl.attributes);
        Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
      }
    });
  }


  _clear() {
    this._parentElement.innerHTML = '';
  }




  renderSpinner = function () {
    const markup = `
            <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
      </div>`
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
       <div class="message">
       <div>
         <svg>
           <use href="${icons}#icon-smile"></use>
         </svg>
       </div>
       <p>${message}</p>
       </div>`
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }


}
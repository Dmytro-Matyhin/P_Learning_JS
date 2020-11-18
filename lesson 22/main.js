export class AlertComponent extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = `<p>${this.message}</p>`
  }

  disconectedCallback() {}

  static get observedAttributes() {
    return ['type', 'message'];
  }

  attributeChangedCallback(name, prev, curr) {
    switch (name) {
      case 'message': 
      this.message = curr;
      break;
      case 'type': {
        switch (curr) {
          case 'error': 
          this.style.cssText = 'border-color: rgb(252, 128, 175); background-color: rgb(241, 178, 202); color: rgb(128, 60, 86);';
          break;
          case 'success': 
          this.style.cssText = 'border-color: rgb(39, 221, 136); background-color: rgb(118, 233, 179); color: rgb(0, 92, 49);';
          break;
          case 'info': 
          this.style.cssText = 'border-color: rgb(2, 179, 202); background-color: rgb(150, 211, 219); color: rgb(6, 54, 61);'
          break;
        }
      }
    }
  }

}
 
customElements.define('alert-component', AlertComponent);
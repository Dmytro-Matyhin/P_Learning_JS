export class AlertComponent extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.attachShadow({
      mode: "open"
    });

    this.shadowRoot.innerHTML = `
    <p>${this.message}</p>
    <style>
      :host {
        padding: 15px;
        font-size: 18px;
        font-family: 'Roboto', sans-serif;
        width: 50%;
        display: block;
        margin: 20px 0;
        border-radius: 5px;
        padding: 0 10px;
        border: 1px solid;
      }
    </style>
  `
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
          this.style =
           `
          border-color: rgb(252, 128, 175); 
          background-color: rgb(241, 178, 202); 
          color: rgb(128, 60, 86);
          `
          break;
          case 'success': 
          this.style = 
          `
          border-color: rgb(39, 221, 136); 
          background-color: rgb(118, 233, 179); 
          color: rgb(0, 92, 49);
          `
          break;
          case 'info': 
          this.style =
          `
          border-color: rgb(2, 179, 202);
          background-color: rgb(150, 211, 219);
          color: rgb(6, 54, 61);
          `
          break;
        }
      }
    }
  }
}
 
customElements.define('alert-component', AlertComponent);
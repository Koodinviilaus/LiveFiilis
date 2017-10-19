import {bind, wire} from 'hyperhtml';

export default class Messenger {

  constructor(element) {
    this.element=element;
  }

  render() {
    console.log(`Render Messenger '`);

    const chatField = wire()`<div style="width: 100%;" ></div>`;
    
    const messages = ["moi", "hei","heippati","rallaa"];

    return bind(this.element)`

      <ul style="max-height:">
      ${ messages.map((message) => `<li>${message}</li>`)}
     </ul>
     ${ chatField }

    `;
  }


}

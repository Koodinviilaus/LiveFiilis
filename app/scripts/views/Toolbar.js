import {bind, wire} from 'hyperhtml';

/**
 * The HyperHTML view displaying toolbar and program image background.
 */
export default class Toolbar {
  /**
   * Default constructor for setting the values
   *
   * @param {HTMLElement} element - The HTML element to bind/adopt
   * @param {Array<Object>} [channels=null] - The channels to show in the guide
   */
  constructor(element, channels) {
    this.element = element;
    this.channels = channels;

    // We handle the elements separately because HyperHTML computes the delta bad.

    this.tabBar = element.querySelector('.mdc-tab-bar');
  }

  /**
   * Infer the tab style for a given channel.
   *
   * @param {Object} channel - The channel POJO to pick the channel from
   * @return {String} Style (mdc-tab with or without mdc-tab--active)
   */
  tabStyle(channel) {
    return `mdc-tab ${ channel.id === this.program.channelId ? 'mdc-tab--active' : ''}`;
  }

  /**
   * Renders the toolbar.
   *
   * @return {HTMLElement} The rendered element
   */
  render() {
    console.log('Render toolbar');
    // Render the elements
    bind(this.tabBar)`${
      this.channels.map((c) => wire(c)`
        <a class="${ this.tabStyle(c) }" href="${ `#channels/${c.id}` }">${ c.title }</a>
      `)
    }`;

    return this.element;
  }
}

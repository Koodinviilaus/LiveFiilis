import { bind, wire } from 'hyperhtml';
// import Hls from 'hls.js'
import valechatti from '../../../valechatti.json';

/**
 * The HyperHTML view displaying the video player and channel details.
 */
export default class Player {
  /**
   * Default constructor for setting the values
   *
   * @param {HTMLElement} element - The HTML element to bind/adopt
   * @param {String} [url=null] - The URL to use
   * @param {Object} [program=null] - The program to render
   */
  constructor(element, url = null, program = null) {
    this.element = element;
    this.url = url;
    this.program = program;
  }

  parceMessages() {
    //return ['testmsg1', 'testmsg']
    return valechatti;
  }
  /**
   * Renders the player.
   *
   * @return {HTMLElement} The rendered element
   */
  render() {
    console.log(`Render Player with url '${this.url}'`);

    const messages = this.parceMessages();
    const start = this.program.startTime;
    const startSeconds = start.getTime() / 1000;
    console.log(startSeconds);
    const currentTimeSeconds = Date.now() / 1000 | 0;
    console.log('currenttimesecond: ' + currentTimeSeconds + 'startSeconds' + startSeconds);
    const timeSeconds = (currentTimeSeconds - startSeconds)-51;
    // const time = `${start.getHours()}:${String(start.getMinutes()).padStart(2, '0')}`;
    const video = wire() `<video style="width: 100%;" ></video>`;
    console.log('timeseconds ' + timeSeconds);
    let config = {
      startPosition: timeSeconds,
    };
    if (Hls.isSupported()) {
      const hls = new Hls(config);
      hls.loadSource(this.url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED,
      function () {
          console.log('Try to play video');
          video.play();
          console.log('should be playing');
        });
    }

    return bind(this.element) `
      ${ video}
      <ul class="chat-messages">
      ${ messages.map((message) => `<li>${message.msg}</li>`)}
     </ul>
    `;
  }
}

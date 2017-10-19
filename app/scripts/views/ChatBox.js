// import { wire, bind } from 'hyperhtml'
import { bind } from 'hyperhtml'
import { Socket } from 'phoenix'

export default class ChatBox {
    constructor(element) {
        console.log("component mouning...")
        this.element = element

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)

        this.connectToSocket()
        console.log(this)

        this._input = "";

        this._messages = []
        console.log("state from constructor:")
        console.log(this.state)
    }

    connectToSocket() {
        const channelsUrl = 'ws://localhost:4000/socket'
        let channel
        const socket = new Socket(channelsUrl, {
        logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data); }
        });
        socket.connect()
        channel = socket.channel("stream_channel:yle")
        channel.join()
        .receive("ok", ({messages}) => console.log("joined stream_channel:yle", messages) )
        .receive("error", ({reason}) => console.log("failed join", reason) )
        .receive("timeout", () => console.log("Networking issue. Still waiting..."))

        channel.on("shout", (message) => {
            console.log("Message received")
            console.log(message)
            this.messages = [...this.messages, message.message]
        })
    }

    set formInput(newInput) {
        console.log("input called with params: " + newInput)
        this._input = newInput;
        console.log("new input: " + this._input)
        this.render();
    }

    get formInput() {
        return this._input;
    }

    set messages(newMessages) {
        this._messages = newMessages;
        this.render();
    }

    get messages() {
        return this._messages;
    }

    handleChange(event) {
        console.log("handleChange")
        console.log(event.target.value)
        this.formInput = event.target.value
        console.log("new this.input:" + this.formInput)
    }

    handleSubmit() {
        console.log("submit")
        console.log("handleSubmit input:" + this.formInput)
        console.log(this)
        event.preventDefault()
        event.stopPropagation()
    }



    render() {
        const that = this
        const submit = document.querySelector("#send-message-form")
        console.log("submit element")
        console.log("render called")
        console.log(this)
        console.log("state:")
        console.log(this.state)
        return bind(this.element)`
            <div id="chat-master">
                <div id="chat-stream">
                    <ul class="chat-list mdl-list">
                        ${ this.messages.map(message => `<li class="chat-item mdl-list__item">${message}<li>`)}
                        <li class="chat-item">Ensimmäinen viesti</li>
                        <li class="mdl-list__item chat-item">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut felis arcu. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin in blandit libero. Duis id metus porta, rhoncus ex nec, auctor mauris. Vestibulum in diam erat. Donec a maximus lacus. Vivamus congue lectus vitae nisi venenatis tincidunt. Curabitur dignissim, neque molestie suscipit feugiat, enim diam pulvinar dui, tempor placerat nunc eros non tellus. Quisque posuere pellentesque massa, id pellentesque ipsum maximus in. Nunc ornare bibendum arcu, id dignissim sapien. Suspendisse id magna vestibulum, pretium velit at, facilisis risus. Vivamus tempor lectus at lacus rhoncus, vel pharetra nisl vulputate. Maecenas at ultricies urna. Maecenas pharetra nibh eu ex eleifend ultricies. Praesent lectus felis, scelerisque vel sem quis, vulputate viverra neque.
                        </li>
                        <li class="mdl-list__item chat-item">
                          Curabitur commodo augue at scelerisque tincidunt. Nulla in porttitor risus. Curabitur urna lacus, vulputate a suscipit a, tincidunt vel justo. Etiam eget rhoncus nisi, vitae lobortis mauris. Mauris non erat dolor. Praesent maximus lobortis ligula sit amet tincidunt. Nunc odio sapien, commodo id quam ac, faucibus venenatis nunc. Nulla facilisi. Cras consectetur nibh consectetur ante tincidunt, ac lobortis quam suscipit. Duis hendrerit, urna ut ultrices dapibus, ex libero accumsan arcu, non consectetur eros tortor non magna. Aliquam a lorem accumsan enim vehicula scelerisque.
                        </li>
                        <li class="mdl-list__item chat-item">
                          Ut imperdiet purus eget laoreet euismod. Aenean id semper risus. Ut eu ex ac ipsum aliquet fringilla sit amet quis elit. In vulputate lectus non felis bibendum ultrices. Nam sollicitudin ipsum leo, a semper est posuere eget. Sed ligula diam, ullamcorper nec dolor at, egestas laoreet libero. Nullam malesuada arcu ac lacus posuere auctor. Sed et congue turpis. Nullam lacinia vitae tortor nec cursus. Praesent nec porttitor enim. Nulla sit amet turpis a est faucibus interdum a nec erat. Ut porttitor eget mi non interdum. Nam tincidunt, ligula sit amet imperdiet tincidunt, metus ex aliquet purus, id pretium sem libero eget ipsum. Maecenas quis augue pellentesque, tristique leo vel, eleifend dolor. Integer sollicitudin tincidunt libero ac gravida.
                        </li>
                        <li class="mdl-list__item chat-item">
                          Nulla in feugiat nisi, nec ornare metus. Vivamus tortor est, sagittis in pellentesque at, commodo et sem. Vivamus placerat justo sed convallis lacinia. Integer sit amet laoreet massa, molestie elementum leo. Donec lectus urna, condimentum ac consectetur in, dignissim vitae lacus. Pellentesque hendrerit, ex in lobortis sollicitudin, turpis mauris malesuada erat, ut lobortis risus est sed nulla. Morbi posuere suscipit bibendum. Donec mattis dolor non sodales rhoncus. In hac habitasse platea dictumst. Pellentesque sollicitudin ullamcorper odio, at sagittis neque mattis nec. Nam maximus eros rhoncus, efficitur leo in, suscipit ex. In convallis consequat quam, at fringilla metus lobortis quis. Sed ullamcorper varius orci ut venenatis.
                        </li>
                        <li class="mdl-list__item chat-item">
                          Sed cursus tempus leo, sit amet imperdiet ante. Morbi quis lorem sed dolor convallis blandit. Pellentesque non est facilisis, cursus lorem id, imperdiet lectus. Mauris ultricies enim vel mauris dictum, eu fringilla purus porta. Sed tristique nisl sit amet libero fringilla auctor. Sed eget massa vitae sapien molestie gravida. Nunc eu dolor sollicitudin, ornare leo sit amet, vestibulum lacus. Cras sit amet vulputate nisl, vel dapibus libero. Donec interdum, est eu feugiat bibendum, mauris sem bibendum velit, sed faucibus est orci sed ligula. Fusce vulputate pellentesque sapien a egestas. Donec placerat ultrices hendrerit. Sed viverra augue justo, ac fermentum sem scelerisque nec. Nam est lacus, sollicitudin ac justo eu, interdum gravida sapien.
                        </li>
                    </ul>
                    <form action="#" id="send-message-from" onSubmit=${that.handleSubmit}>
                    <div class="mdc-textfield chat-form-div">
                        <input type="text" id="chat-input" class="mdc-textfield__input" oninput=${that.handleChange}>
                        <label class="mdc-textfield__label" for="my-textfield">Kirjoita viesti...</label>
                        <input type="submit" value="submit">
                  </div>
                  </form>
                </div>
            </div>
        `
    }
}

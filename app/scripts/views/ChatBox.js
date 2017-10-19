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

        this.channel
        console.log("state from constructor:")
        console.log(this.state)
    }

    connectToSocket() {
        const channelsUrl = 'ws://localhost:4000/socket'
        // let channel
        const socket = new Socket(channelsUrl, {
        logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data); }
        });
        socket.connect()
        this.channel = socket.channel("stream_channel:yle")     
        this.channel.join()
        .receive("ok", ({messages}) => console.log("joined stream_channel:yle", messages) )
        .receive("error", ({reason}) => console.log("failed join", reason) )
        .receive("timeout", () => console.log("Networking issue. Still waiting..."))

        this.channel.on("shout", (message) => {
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
        this.channel.push('shout', { message: this.formInput })
        this.formInput = ""
        event.preventDefault()
        event.stopPropagation()
    }



    render() {
        // const that = this
        const submit = document.querySelector("#send-message-form")
        console.log("submit element")
        console.log("render called")
        console.log(this)
        console.log("state:")
        console.log(this.state)
        return bind(this.element)`
            <div id="chat-master">
                <div id="chat-stream">
                    <ul class="chat-list">
                        ${ this.messages.map(message => `<li class="chat-item">${message}<li>`)}
                        <li class="chat-item">Ensimmäinen viesti</li>
                    </ul>
                    <form action="#" id="send-message-from" onSubmit=${this.handleSubmit}>
                    <div class="mdc-textfield chat-form-div">
                        <input type="text" id="chat-input" class="mdc-textfield__input" value=${this.formInput} oninput=${this.handleChange}>
                        <label class="mdc-textfield__label" for="my-textfield">Kirjoita viesti...</label>
                        <input type="submit" value="submit">
                  </div>
                  </form>
                </div>
            </div>
        `
    }
}
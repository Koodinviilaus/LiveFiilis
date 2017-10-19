// import { wire, bind } from 'hyperhtml'
import { bind } from 'hyperhtml'
import { Socket } from 'phoenix'

export default class ChatBox {
    constructor(element) {
        console.log("component mouning...")
        this.element = element
        
        this.connectToSocket()
        console.log(this)

        this._state = [];
        console.log("state from constructor:")
        console.log(this.state)
    }

    set state(newState) {
        this._state = newState;
        this.render();
    }

    get state() {
        return this._state;
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
            this.state = this.state.concat([message.message]);
            console.log("koko state: " + this.state)
        })
    }



    render() {
        console.log("state:")
        console.log(this.state)
        return bind(this.element)`
            <div id="chat-master">
                <div id="chat-stream">
                    <ul>
                        ${ this.state.map(message => {
                            if (message) {
                            return `<li>${message}<li>`
                        }}) }
                    </ul>
                </div>
            Hello Tuomo
            
            </div>
        `
    }
}
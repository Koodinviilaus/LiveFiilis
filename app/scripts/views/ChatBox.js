import { wire, bind } from 'hyperhtml'
import { Socket } from 'phoenix'


// function ChatBox(props) {
//     console.log("Tilakomponentti")
//     console.log(props)
//     return bind(props)`
//     <h1>Hello, Tuomo</h1>`;
//   }

class ChatBox {
    constructor(props) {
        // super(props)
        console.log("component mouning...")
        this.props = props

        this.connectToSocket()

        this.state = []
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
            this.setState([...this.state, message])
        })
    }







    render() {
        return bind(this.props)`
        <div>Hello Tuomo</div>
        `
    }
}
 
export default ChatBox
import { ChatRoom } from "./components/ChatRoom";
import { HubConnectionBuilder } from "@microsoft/signalr";

function App() {
  const [connection, setConnection] = useState(null);
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState([]);

  const join = async (user, chatGroup) => {
    //let's create a connection
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:3000/chathub")
      .withAutomaticReconnect()
      .build();
    connection.on("GetMessage", (user, message) => {
      setMessages((messages) => [...messages, { user, message }]);
      console.log(message);
    }); // Subscribe to the method
    // Start connection
    await connection
      .start()
      .then(() => console.log("Connected!"))
      .catch((err) => console.error("Connection failed: ", err));

    await connection
      .invoke("Join", { user, chatGroup })
      .then(() => console.log("You've joined the chat!"))
      .catch(() => console.log("Error occured by joining the chat!"));
    setConnection(connection);
    setChat(chatGroup);
    console.log(connection);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {connection ? (
        <Chat chat={chat} messages={messages} />
      ) : (
        <ChatRoom join={join} />
      )}
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";

export const Chat = ({ room }) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);

  let uid
  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
        setMessages(messages);
        uid = doc.id
      });
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: room,
    });

    setNewMessage("");
  };

  return (
    <>
      <div className="flex flex-col h-[75vh] w-[50vw] bg-blue-400 rounded-lg mb-4 items-center">
        <div className="bg-green-100 h-3/4 m-2 rounded-lg w-11/12 overflow-auto flex-grow relative">
          {messages.map((message) => (
            <div className={`bg-gray-100 flex flex-col p-2 m-2 w-[20vw] overflow-auto`} key={message.id}>
              <span className="text-left text-purple-700">{message.user} </span>
              <span className="text-left">{message.text}</span>
            </div>
          ))}
        </div>
        <div className="bg-green-100 h-16 p-4 m-2 rounded-lg">
          <form onSubmit={handleSendMessage} className="flex flex-row items-center justify-center rounded-lg">
            <input
              className="h-8 px-4 mr-2" 
              placeholder="Type your message here.."
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}
              value={newMessage}
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-8 rounded-lg shadow-lg w-16 ">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;

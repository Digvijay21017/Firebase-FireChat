import { useState, useRef } from "react";
import "./App.css";
import Auth from "../src/components/Auth";
import Cookies from "universal-cookie";
import Chat from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef();

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };
  if (!isAuth) {
    return (
      <>
        <Auth setIsAuth={setIsAuth} />
      </>
    );
  } else {
    return (
      <>
        <div>
          {room ? (
            <Chat room={room} />
          ) : (
            <div className="flex items-center justify-center m-4 flex-col border-black rounded-md bg-blue-600 text-white font-bold h-[50vh] w-[25vw]">
              <label className="p-2 mb-3 bg-blue-400 rounded-sm m-2 w-1/2">Enter Room Name to Join</label>
              <div className="flex items-center justify-center m-4 flex-col bg-gray-100 border-black rounded-md h-2/3 w-2/3 mb-8">
                <input ref={roomInputRef} className="m-3 p-2 bg-green-200 text-black w-1/2" placeholder="Ex. Room1" />
                <button
                  onClick={() => {
                    setRoom(roomInputRef.current.value);
                  }}
                  className="bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-4 rounded-lg shadow-lg m-3 p-2 w-1/2"
                >
                  Enter Chat Room
                </button>
              </div>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={signUserOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
          >
            Sign Out
          </button>
        </div>
      </>
    );
  }
}

export default App;

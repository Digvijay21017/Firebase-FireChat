import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import logo from '../assets/fire-chat-logo.png'
import googleLogo from '../assets/google-logo.png'

const cookies = new Cookies();

const Auth = ({ setIsAuth }) => {
  const handleGoogleLogin = async () => {
    try {
      const results = await signInWithPopup(auth, provider);
      cookies.set("auth-token", results.user.refreshToken);
      setIsAuth(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center border-2 border-black rounded-lg h-96 w-80 bg-gray-200">
        <div className="p-4 pt-0">
          <h3 className="font-semibold mb-4 text-lg text-red-700">Welcome to Fire-Chat</h3>
          <p className="mb-10 font-serif">Sign In with Google to continue...</p>
          <img src={logo} className="w-40 ml-8 mb-5 " alt="logo" />
          <button
            onClick={handleGoogleLogin}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex"
          >
            <img src={googleLogo} className="w-7 mr-4"/>
            Sign In with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Auth;

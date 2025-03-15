import { useState } from "react";
import { signInWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user.emailVerified) {
        alert("Login successful");
        navigate('/home');
      } else {
        alert("Please verify your email");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const onGoogleSubmit = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center gap-5 text-white bg-black min-h-screen">
      <div>
       
      </div>
      <div className="flex flex-col gap-5 justify-center items-center bg-gray-900 p-10 rounded-lg shadow-lg">
        <p className="font-bold text-3xl text-white transition-all duration-300 hover:tracking-wider">
          Iv8.Tog
        </p>
        <div className="flex flex-col gap-4">
          <input
            className="px-5 py-3 border-2 w-80 rounded-lg border-[#605ffc] text-black bg-white"
            placeholder="Email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="px-5 py-3 border-2 w-80 rounded-lg border-[#605ffc] text-black bg-white"
            placeholder="Password"
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="self-end">
          <a className="text-[#605ffc]" href="/reset-password">Forgot Password?</a>
        </div>
        <div className="flex flex-col gap-2 w-80">
          <button className="bg-[#605ffc] text-white text-lg px-5 py-2 rounded-lg hover:bg-[#4a4ae6]" onClick={onSubmit}>
            Login
          </button>
          <div 
            className="bg-white flex items-center justify-center gap-5 text-black text-lg px-5 py-2 rounded-lg cursor-pointer hover:shadow-md"
            onClick={onGoogleSubmit}
          >
            <img className="w-8 bg-cover object-cover" src="https://pngimg.com/uploads/google/google_PNG19635.png" alt="Google" />
            <span className="text-black">Login using Google</span>
          </div>
        </div>
        <a href="/register" className="text-[#605ffc]">Go to Register</a>
      </div>
    </div>
  );
}

export default Login;

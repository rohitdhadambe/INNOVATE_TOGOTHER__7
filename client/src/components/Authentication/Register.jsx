import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return false;
    }
    if (password.length < 6) {
      setError("Password should be at least 6 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    setError(""); // Clear previous errors if validation passes
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);
      alert("Please check your email to verify your account.");

      await signOut(auth);

      setSuccess("Verification email sent! Please check your inbox.");
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error("Error:", error.code, error.message);
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
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <input
          className="px-5 py-3 border-2 w-80 border-[#605ffc] rounded-lg text-black bg-white"
          placeholder="Email"
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="px-5 py-3 border-2 w-80 border-[#605ffc] rounded-lg text-black bg-white"
          placeholder="Password"
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="px-5 py-3 border-2 w-80 border-[#605ffc] rounded-lg text-black bg-white"
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          className="bg-[#605ffc] text-white font-bold px-5 py-2 w-80 rounded-lg hover:bg-[#4a4ae6]"
          onClick={onSubmit}
        >
          Register Now
        </button>
        <a href="/" className="text-[#605ffc]">Go to Login</a>
      </div>
    </div>
  );
}

export default Register;

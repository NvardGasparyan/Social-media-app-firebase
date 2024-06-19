"use client";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

import { useRouter } from "next/navigation";
import { auth, db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      if (password !== confirmpassword) {
        throw new Error("Passwords do not match");
      }

      const userCredential = await createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        firstName: firstname,
        lastName: lastname,
        avatarUrl: "",
      });

      console.log("User signed up and data saved:", user);

      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      router.push("/");

      sessionStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-110">
        <form onSubmit={handleSignUp}>
          <h1 className="text-white text-5xl mb-9">Sign Up</h1>
          <input
            type="text"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="w-full p-5 mb-8 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="w-full p-5 mb-8 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-5 mb-8 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-5 mb-8 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-5 mb-8 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
          />

          <button className="w-full p-5 bg-indigo-600 rounded text-white hover:bg-indigo-500">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
} from "firebase/auth";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible" },
        auth
      );
    }
  };

  const handlePhoneOtp = async () => {
    if (!name || !phone) return toast.error("Enter name & phone number");

    setupRecaptcha();

    try {
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, "+91" + phone, appVerifier);
      setConfirmationResult(result);
      setStep(2);
      toast.success("OTP sent to your phone");
    } catch (err) {
      console.error("OTP error:", err);
      toast.error("Failed to send OTP");
    }
  };

  const verifyPhoneOtp = async () => {
    if (!otp) return toast.error("Enter the OTP");

    try {
      const result = await confirmationResult.confirm(otp);
      await updateProfile(result.user, { displayName: name });
      setUser({ name, uid: result.user.uid, phoneNumber: result.user.phoneNumber });
      toast.success("Login successful");
      navigate("/"); // ✅ Redirect to homepage
    } catch (err) {
      toast.error("Invalid or expired OTP");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">Login / Register</h2>

      {step === 1 && (
        <>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full mb-3"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input input-bordered w-full mb-3"
          />
          <button onClick={handlePhoneOtp} className="btn btn-primary w-full">
            Send OTP
          </button>
          <div id="recaptcha-container" />
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="input input-bordered w-full mb-4"
          />
          <button onClick={verifyPhoneOtp} className="btn btn-success w-full">
            Verify & Login
          </button>
        </>
      )}
    </div>
  );
};

export default LoginPage;

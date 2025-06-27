import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {RecaptchaVerifier,signInWithPhoneNumber,updateProfile,} from "firebase/auth";
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
  try {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth, // ✅ First argument must be auth
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA verified");
          },
          "expired-callback": () => {
            toast.error("reCAPTCHA expired. Please try again.");
          },
        }
      );

      window.recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
      });
    }
  } catch (error) {
    console.error("reCAPTCHA setup failed:", error);
    toast.error("reCAPTCHA initialization failed");
  }
};

  const handlePhoneOtp = async () => {
    if (!name.trim()) return toast.error("Please enter your name");
    if (!/^\d{10}$/.test(phone)) return toast.error("Enter a valid 10-digit phone number");

    setupRecaptcha();

    try {
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, `+91${phone}`, appVerifier);
      setConfirmationResult(result);
      setStep(2);
      toast.success("OTP sent to your phone");
    } catch (err) {
      console.error("OTP error:", err);
      toast.error(err.message || "Failed to send OTP");
    }
  };

  const verifyPhoneOtp = async () => {
    if (!otp.trim()) return toast.error("Enter the OTP");

    try {
      const result = await confirmationResult.confirm(otp);
      await updateProfile(result.user, { displayName: name });
      setUser({
        name,
        uid: result.user.uid,
        phoneNumber: result.user.phoneNumber,
      });
      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      console.error("OTP verification error:", err);
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

          {/* Phone input with +91 prefix */}
          <div className="flex mb-3">
            <span className="px-3 py-2 bg-gray-200 rounded-l text-black text-sm border border-r-0 border-gray-300">
              +91
            </span>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              className="input input-bordered w-full rounded-l-none"
            />
          </div>

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

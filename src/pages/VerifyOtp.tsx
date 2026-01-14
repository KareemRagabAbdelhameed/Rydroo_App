import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/auth/hooks";
import actAuthVerifyOtp from "../store/auth/act/actAuthVerifyOtp";
import type { RootState } from "../store/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useAppSelector((state: RootState) => state.auth);
  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return; // يقبل رقم واحد فقط

    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);

    // لو كتب رقم ينتقل للبعده
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otp = otpValues.join("");
    if (otp.length < 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    if (!user?.email) {
      toast.error("No email found, please register again");
      return;
    }

    const result = await dispatch(actAuthVerifyOtp({ email: user.email, otp }));
    if (actAuthVerifyOtp.fulfilled.match(result)) {
      toast.success(result.payload.message ||"OTP Verified!", { autoClose: 3000 });
      setTimeout(() => navigate("/login"), 3000);
    } else {
      toast.error(result.payload as string, { autoClose: 3000 });
    }
  };

  return (
    <div className="w-[90%] mx-auto space-y-16">
      <h1 className="text-3xl font-bold text-secondMainColor mb-2 mt-10">Almost there</h1>
      <p className="text-mainColor mb-4">
        Please enter the 6 digits code sent to your email{" "}
        <span className="font-semibold text-maincolor">{user?.email}</span> for verification
      </p>

      {/* OTP Inputs */}
      <div className="flex justify-center gap-4 mb-4">
  {otpValues.map((digit, index) => (
    <input
      key={index}
      type="text"
      maxLength={1}
      value={digit}
      onChange={(e) => handleChange(e.target.value, index)}
      onKeyDown={(e) => handleKeyDown(e, index)}
      ref={(el) => {
        if (el) inputsRef.current[index] = el;
      }}
      className="w-10 h-12 text-center text-lg rounded-md bg-thirdMainColor focus:outline-none focus:ring-2 focus:ring-mainColor"
    />
  ))}
</div>


      <button
        onClick={handleVerify}
        disabled={loading === "pending"}
        className="w-full mt-4 bg-maincolor text-white p-6 rounded-xl"
      >
        {loading === "pending" ? "Verifying..." : "Verify"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* <p className="mt-4 text-gray-600">
        Didn't receive any code?{" "}
        <button className="text-mainColor underline" onClick={() => toast.info("Resend OTP clicked")}>
          Resend Again
        </button>
      </p> */}
    </div>
  );
};

export default VerifyOtp;

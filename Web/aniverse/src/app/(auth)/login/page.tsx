import React from "react";
import Otp from "@/components/otp";

const LoginPage = () => {
  return (
    <div className="flex justify-center flex-col items-center h-[100dvh] ">
      <h1 className="primary ">Login Page</h1>
      <form className="flex flex-col justify-center w-[400px] items-center ">
        <div className="flex flex-col -gap-2">
          <label htmlFor="email" className="secondary text-sm">Email:</label>
          <input className="border" type="email" id="email" name="email" required />
        </div>
        <div className="flex flex-col -gap-2 mt-4 justify-center items-center" >
          <label htmlFor="email" className="secondary text-sm self-start" >OTP:</label>
          <Otp /> 
        </div>
        <button type="submit" className="border rounded-2xl text-white  mt-4 p-2 w-[80px] mx-auto"   > Login </button>
      </form>
      <p className="secondary mt-4">
        Don't have an account? <a href="/auth/signup">Sign up</a>
      </p>
    </div>
  );
};

export default LoginPage;

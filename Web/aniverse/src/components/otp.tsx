"use client";
import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const Otp = ({
  onComplete,
  onChange,
}: {
  onComplete?: ((...args: any[]) => unknown) | undefined;
  onChange?: ((...args: any[]) => unknown) | undefined;
}) => {
  return (
    <div className="scale-75">
      <InputOTP maxLength={6} onComplete={onComplete} onChange={onChange}>
        <InputOTPGroup>
          <InputOTPSlot index={0} className="ring-purple-600" />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};

export default Otp;

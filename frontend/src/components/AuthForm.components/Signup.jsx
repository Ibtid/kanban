import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import * as z from "zod";


const signupSchemas = [
  z.object({
    email: z.string().email("Provide a valid email"),
  }),
  z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
  z.object({
    confirmPassword: z.string(),
  }),
];



export function SignupForm() {
  const [step, setStep] = useState(0);
  const [parent] = useAutoAnimate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(
      signupSchemas[step].superRefine((data, ctx) => {
        if (step === 2) {
          const password = watch("password");
          if (data.confirmPassword !== password) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Passwords must match",
              path: ["confirmPassword"],
            });
          }
        }
      })
    ),
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    if (step < 2) setStep(step + 1);
    else console.log("Signup Data", data);
  };

  return (
    <div>
      <div className="h-2 w-full bg-gray-500 rounded mb-4">
        <motion.div
          initial={{ width: `${(step / 2) * 100}%` }}
          animate={{ width: `${((step + 1) / 3) * 100}%` }}
          className="h-2 bg-green-500 rounded"
        />
      </div>

      <br />
      {step === 0 && <div>Sign up with your email</div>}
      {step === 1 && <div>Select a six-character password</div>}
      {step === 2 && <div>Confirm your password</div>}
      <br />
      <form
      ref={parent}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col"
      >
        {step === 0 && (
          <input
            {...register("email")}
            placeholder="Email"
            className="border border-gray-400 p-2 rounded-md bg-transparent text-white focus:outline-none"
          />
        )}
        {step === 1 && (
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="border border-gray-400 p-2 rounded-md bg-transparent text-white focus:outline-none"
          />
        )}
        {step === 2 && (
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            className="border border-gray-400 p-2 rounded-md bg-transparent text-white focus:outline-none"
          />
        )}
        {errors[Object.keys(errors)[0]] && (
          <p className="text-red-500">
            {errors[Object.keys(errors)[0]].message}
          </p>
        )}
        <br />
        <button
          type="submit"
          disabled={!isValid}
          className="bg-white text-neutral-900 p-2 rounded-md transition duration-300 hover:bg-primary-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {step < 2 ? "Next" : "Signup"}
        </button>
        {
          step != 0 &&<button
          type="button"
          onClick={() => setStep(step - 1)}
          className="border-white-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-gray-700 cursor-pointer"
        >
          Back
        </button>
        }
        
      </form>
    </div>
  );
}




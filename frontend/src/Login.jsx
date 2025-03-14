import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import * as z from "zod";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchemas = [
  z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
  }),
  z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
  z.object({
    confirmPassword: z.string(),
  }),
];

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-neutral-800 rounded-xl shadow-lg">
      <h1 className="text-xl mx-auto w-full text-center">Task Manager</h1>
      <br />
      {isLogin ? <LoginForm /> : <SignupForm />}
      <br />
      {isLogin ? "Are you a new user?" : "Are you an old user?"}
      <button
        className="mt-4 text-primary-500 underline ml-4"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Switch to Signup" : "Switch to Login"}
      </button>
    </div>
  );
}

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(loginSchema), mode: "onChange" });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
      <div>Name</div>
      <input
        {...register("username")}
        placeholder="Type your username"
        className="border border-gray-400 p-2 rounded-md bg-transparent text-white focus:outline-none"
      />
      {errors.username && (
        <p className="text-red-500">{errors.username.message}</p>
      )}
      <div>Password</div>
      <input
        type="password"
        {...register("password")}
        placeholder="Type your 6-digit password here..."
        className="border border-gray-400 p-2 rounded-md bg-transparent text-white focus:outline-none"
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}
      <button
        type="submit"
        disabled={!isValid}
        className="bg-white text-neutral-900 p-2 rounded-md transition duration-300 hover:bg-primary-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Login
      </button>
    </form>
  );
}

function SignupForm() {
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
    mode: "onChange",
  });

  const onSubmit = (data) => {
    if (step < 2) setStep(step + 1);
    else console.log("Signup Data", data);
  };

  return (
    <div ref={parent}>
      <div className="h-2 w-full bg-gray-500 rounded mb-4">
        <motion.div
          initial={{ width: `${(step / 2) * 100}%` }}
          animate={{ width: `${((step + 1) / 3) * 100}%` }}
          className="h-2 bg-green-500 rounded"
        />
      </div>

      <br />
      {step === 0 && <div>Select a username</div>}
      {step === 1 && <div>Select a six-character password</div>}
      {step === 2 && <div>Confirm your password</div>}
      <br />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col"
      >
        {step === 0 && (
          <input
            {...register("username")}
            placeholder="Username"
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




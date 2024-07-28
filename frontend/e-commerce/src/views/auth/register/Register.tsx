import { useForm, SubmitHandler } from "react-hook-form";
import { SignUpUser } from "@/api/auth/authApi";
import { useEffect, useState } from "react";
import { useSignUpMutation } from "@/hooks/auth/useSignUpMutation";

type SignUpUserWithConfirm = SignUpUser & {
  confirmPassword: string;
};

const Register = () => {
  const {
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SignUpUserWithConfirm>();
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  

  const signUpMutation = useSignUpMutation();

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
    } else {
      clearErrors("confirmPassword");
    }
  }, [password, confirmPassword, setError, clearErrors]);

  const onSubmit: SubmitHandler<SignUpUserWithConfirm> = (data: SignUpUser) => {
    signUpMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <label htmlFor="username">
          <span className="label-text">Your username:</span>
        </label>
        <input
          {...register("username", { required: true })}
          type="text"
          id="username"
          className="input input-bordered"
          placeholder="Username"
        />
        <label htmlFor="email">
          <span className="label-text">Your email:</span>
        </label>
        <input
          {...register("email", { required: true })}
          type="text"
          id="email"
          className="input input-bordered"
          placeholder="Email"
        />
        <label htmlFor="name">
          <span className="label-text">Your name:</span>
        </label>
        <input
          {...register("name")}
          type="text"
          id="name"
          className="input input-bordered"
          placeholder="Name"
        />
        <label htmlFor="password">
          <span className="label-text">Your password:</span>
        </label>
        <input
          {...register("password", { required: true })}
          type={showPassword ? "text" : "password"}
          id="password"
          className="input input-bordered"
          placeholder="Password"
        />
        <label className="label cursor-pointer">
          <span
            className="label-text-alt"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"} password
          </span>
        </label>
        <label htmlFor="confirmPassword">
          <span className="label-text">Confirm your password:</span>
        </label>
        <input
          {...register("confirmPassword", {
            required: "Confirm password is required",
            validate: (value) => value === password || "Passwords do not match",
          })}
          type="password"
          id="confirmPassword"
          className="input input-bordered"
          placeholder="Password"
        />
        <label htmlFor="age">
          <span className="label-text">Your age:</span>
        </label>
        <input
          type="number"
          id="age"
          min={12}
          className="input input-bordered"
          placeholder="Age"
        />
        {errors.confirmPassword && (
          <p className="text-red-900">{errors.confirmPassword.message}</p>
        )}
      </div>
      <div className="form-control mt-6">
        <button className="btn btn-primary" type="submit" disabled={!isValid || signUpMutation.isPending}>
          {signUpMutation.isPending ? (
            <span className="loading loading-spinner"></span>
          ): "Sign Up"}
        </button>
      </div>
    </form>
  );
};
export default Register;

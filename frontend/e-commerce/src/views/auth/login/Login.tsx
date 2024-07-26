import { SignInUser } from "@/api/auth/authApi";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useSignInMutation } from "@/hooks/auth/useSignInMutation";

const Login = () => {
  const { register, handleSubmit, formState: { isValid} } = useForm<SignInUser>();
  const [showPassword, setShowPassword] = useState(false);

  const signInMutation = useSignInMutation();

  const onSubmit: SubmitHandler<SignInUser> = (data) => {
    signInMutation.mutate(data);
  };

  return (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label" htmlFor="username">
                <span className="label-text">Username or Email</span>
              </label>
              <input
                {...register("username", { required: true })}
                type="text"
                id="username"
                className="input input-bordered"
                placeholder="Username or Email"
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", { required: true })}
                type={showPassword ? "text" : "password"}
                id="password"
                className="input input-bordered"
                placeholder="Password"
              />
              <label className="label cursor-pointer">
                <span className="label-text-alt" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide" : "Show"} password
                </span>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit" disabled={!isValid || signInMutation.isPending}>Login</button>
            </div>
          </form>
  );
};
export default Login;

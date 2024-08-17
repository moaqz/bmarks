import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useForm } from "~/hooks/useForm";
import { useAuth } from "~/hooks/useAuth";

interface LoginData {
  email: string;
  password: string;
}

export function LoginView() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    data,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    try {
      await login(data.email, data.password);
      navigate("/bookmarks");
    }
    catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  };

  return (
    <div className="flex flex-col gap-y-6">
      <h1 className="text-3xl font-extrabold">Login</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(onSubmit);
        }}
        className="flex flex-col gap-y-3"
      >
        <div className="form-item">
          <label className="label">
            Email
          </label>
          <input
            type="email"
            required
            name="email"
            value={data.email}
            onChange={handleChange}
            className="input-text"
            placeholder="Enter your email address"
          />
        </div>

        <div className="form-item">
          <label className="label">
            Password
          </label>
          <input
            type="password"
            required
            name="password"
            minLength={8}
            value={data.password}
            onChange={handleChange}
            className="input-text"
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="button" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="text-sm text-gray-11">
        <span className="mr-1"> Don't have an account?</span>
        <Link to="/sign-up" className="text-blue-12 underline">Sign up</Link>
      </div>
    </div>
  );
}

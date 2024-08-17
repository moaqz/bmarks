import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useForm } from "~/hooks/useForm";
import { useAuth } from "~/hooks/useAuth";

interface SignUpData {
  email: string;
  password: string;
  password_confirmation: string;
}

export function SignUpView() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const {
    data,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useForm<SignUpData>();

  const onSubmit = async (data: SignUpData) => {
    try {
      if (data.password !== data.password_confirmation) {
        toast.error("Passwords do not match");
        return;
      }

      await register(data.email, data.password);
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
      <h1 className="text-3xl font-extrabold">
        Sign up
      </h1>

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

        <div className="form-item">
          <label className="label">
            Password Confirmation
          </label>
          <input
            type="password"
            required
            name="password_confirmation"
            minLength={8}
            value={data.password_confirmation}
            onChange={handleChange}
            className="input-text"
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="button" disabled={isSubmitting}>
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <div className="text-sm text-gray-11">
        <span className="mr-1"> Already have an account?</span>
        <Link to="/login" className="text-blue-12 underline">Login</Link>
      </div>
    </div>
  );
}

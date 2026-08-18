import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  // ⭐ Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ⭐ Password visibility
  const [showPassword, setShowPassword] = useState(false);

  // ⭐ Error message
  const [error, setError] = useState("");

  // ⭐ ADDED: Loading state
  const [isLoading, setIsLoading] = useState(false);

  // ⭐ Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  // ⭐ CHANGED: Handle login using backend API
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // ⭐ ADDED: Send login request to backend
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      // ⭐ ADDED: Handle backend error
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ⭐ ADDED: Save JWT token
      localStorage.setItem("token", data.token);

      // ⭐ ADDED: Save logged-in user
      localStorage.setItem("user", JSON.stringify(data.user));

      // ⭐ ADDED: Update AuthContext immediately
      login(data.user);

      // ⭐ Go to profile after successful login
      navigate("/profile");

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="section">
      <div className="container">

        <div className="mx-auto max-w-md">

          {/* Header */}
          <div className="text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pink-50 text-pink-500">
              <LogIn size={26} />
            </div>

            <h1 className="mt-5 text-3xl font-bold text-gray-900">
              Welcome Back
            </h1>

            <p className="mt-2 text-gray-500">
              Login to continue shopping.
            </p>

          </div>

          {/* Login Card */}
          <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-pink-500"
                />
              </div>

              {/* Password */}
              <div>

                <div className="flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>

                  {/* Placeholder for now */}
                  <button
                    type="button"
                    onClick={() =>
                      setError(
                        "Forgot password functionality will be added later."
                      )
                    }
                    className="text-xs font-medium text-pink-500 hover:text-pink-600"
                  >
                    Forgot Password?
                  </button>

                </div>

                <div className="relative mt-2">

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 pr-12 text-sm outline-none transition focus:border-pink-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-500"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

              </div>

              {/* Error */}
              {error && (
                <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-md bg-pink-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>

            </form>

            {/* Register Link */}
            <div className="mt-6 border-t border-gray-200 pt-6 text-center">

              <p className="text-sm text-gray-500">
                Don't have an account?
              </p>

              <Link
                to="/register"
                className="mt-2 inline-block text-sm font-semibold text-pink-500 hover:text-pink-600"
              >
                Create Account
              </Link>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}

export default Login;
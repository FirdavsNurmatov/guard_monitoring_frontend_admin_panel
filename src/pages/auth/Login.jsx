import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../config/axios-instance";
import Cookies from "js-cookie";
import { useAuthStore } from "../../store/useAuthStore";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [showError, setShowError] = useState("");
  const { setUser, setToken } = useAuthStore((store) => store);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await instance.post("/auth/login", { username, password });

      const accessToken = res.data?.data?.access_token;
      const role = res?.data?.data?.role;

      if (role != "ADMIN") {
        throw new Error("Access Denied for " + role);
      }

      setUser({
        username: res.data?.data?.username,
        role: role,
      });
      setToken(accessToken);

      Cookies.set("accessToken", accessToken);

      return navigate("/object", { replace: true });
    } catch (error) {
      if (!error.message.startsWith("Access Denied"))
        setShowError("Username yoki parol noto'g'ri! Qayta urinib ko'ring!");
      else if (!error.message.includes("not found")) {
        setShowError("Bunday user mavjud emas");
      } else setShowError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <div className="mb-5">
          <label className="block mb-2 font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            name="username"
          />
        </div>

        <div className="mb-5 relative">
          <label className="block mb-2 font-medium text-gray-700">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            name="password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-[35px] right-3 p-2 text-gray-500 hover:text-gray-800"
            tabIndex={-1}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 
                     4.057-5.064 7-9.542 7-4.477 
                     0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 
                     19c-4.478 0-8.268-2.943-9.542-7a9.964 
                     9.964 0 013.02-4.568m2.442-1.628A9.935 
                     9.935 0 0112 5c4.478 0 8.268 2.943 
                     9.542 7a9.96 9.96 0 01-1.357 
                     2.572M15 12a3 3 0 11-6 0 3 
                     3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3l18 18"
                />
              </svg>
            )}
          </button>
        </div>

        {showError && (
          <p className="text-red-500 text-center text-sm mb-4">{showError}</p>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

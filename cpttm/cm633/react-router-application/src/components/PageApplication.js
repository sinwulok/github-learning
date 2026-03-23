import {
  Link,
  Form,
  useActionData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

function PageApplication() {
  const [locationState, setLocationState] = useState(null);
  const actionData = useActionData();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(location.state);
    setLocationState(location.state);
    navigate(location.pathname, { replace: true });
  }, []);

  return (
    <div className="min-h-screen p-2 flex">
      <div className="max-w-5xl bg-slate-200 rounded-lg m-4 flex gap-x-4 overflow-hidden flex-1 mx-auto">
        <div className="w-1/3 p-2">
          <ul className="text-slate-600 flex flex-col gap-y-1 w-full text-lg">
            <li>
              <Link
                to="/"
                className="block text-slate-600 hover:text-slate-800 rounded px-2 py-1"
              >
                Getting Started
              </Link>
            </li>
            <li>
              <Link
                to="/application"
                className="block bg-slate-300 text-slate-600 hover:text-slate-800 font-bold rounded px-2 py-1"
              >
                Application
              </Link>
            </li>
            <li>
              <Link
                to="/review"
                className="block text-slate-600 hover:text-slate-800 rounded px-2 py-1"
              >
                Review
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-2/3 py-3 pr-3 text-slate-900">
          {/* validate error for empty input */}
          {locationState?.error && (
            <div className="p-4 bg-red-200">{locationState?.error}</div>
          )}

          <Form method="POST" action="/review">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="password_confirmation"
              >
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Gender
              </label>
              <div>
                <label htmlFor="gender-male" className="mr-4">
                  <input
                    id="gender-male"
                    type="radio"
                    name="gender"
                    value="male"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label htmlFor="gender-female" className="mr-4">
                  <input
                    id="gender-female"
                    type="radio"
                    name="gender"
                    value="female"
                  />
                  <span className="ml-2">Female</span>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between mt-12">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Review
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="reset"
              >
                Reset
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default PageApplication;

import { Link, useActionData, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PageReview() {
  const actionData = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!actionData?.name) {
      navigate("/application", {
        state: {
          error: "Please fill in all required fields",
        },
      });
    }
  }, [actionData]);
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
                className="block text-slate-600 hover:text-slate-800 rounded px-2 py-1"
              >
                Application
              </Link>
            </li>
            <li>
              <Link
                to="/review"
                className="block bg-slate-300 text-slate-600 font-bold rounded px-2 py-1"
              >
                Review
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-2/3 py-3 pr-3 text-slate-900">
          <form>
            <div className="mb-4">
              <div
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                Name
              </div>
              <div className="text-xl text-slate-900">{actionData?.name}</div>
            </div>
            <div className="mb-4">
              <div
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email"
              >
                Email
              </div>
              <div className="text-xl text-slate-900">{actionData?.email}</div>
            </div>
            <div className="mb-4">
              <div className="block text-gray-700 font-bold mb-2">Gender</div>
              <div className="text-xl text-slate-900">{actionData?.gender}</div>
            </div>
            <div className="flex items-center justify-between mt-12">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
              <Link
                to={"/"}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PageReview;

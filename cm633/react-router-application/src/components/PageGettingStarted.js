import { Link } from "react-router-dom";

function PageGettingStarted() {
  return (
    <div className="min-h-screen p-2 flex">
      <div className="max-w-5xl bg-slate-200 rounded-lg m-4 flex gap-x-4 overflow-hidden flex-1 mx-auto">
        <div className="w-1/3 p-2">
          <ul className="text-slate-600 flex flex-col gap-y-1 w-full text-lg">
            <li>
              <Link
                to="/"
                className="block bg-slate-300 text-slate-600 font-bold rounded px-2 py-1"
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
                className="block text-slate-600 hover:text-slate-800 rounded px-2 py-1"
              >
                Review
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-2/3 py-3 pr-3 text-slate-900">
          <p className="mb-3 text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            sint molestiae in praesentium quaerat nihil voluptates qui velit
            totam obcaecati ullam distinctio sed et fugiat maiores, ipsam
            eveniet vel dignissimos.
          </p>

          <p className="mb-3 text-lg">
            Vel, officiis cumque quibusdam neque vero fuga ullam, est aspernatur
            nihil harum aperiam quidem nulla debitis, sequi nemo eius sint in
            dolorum nam tempora tempore possimus animi. Quos, sint velit.
            Repellendus, laboriosam placeat. Fugit quod eum, placeat quia
            accusamus id est dolores voluptas ullam, mollitia nesciunt nobis
            nostrum magni fuga ad. Est, magni modi perspiciatis molestias eius
            laborum dicta doloribus.
          </p>

          <p className="mb-3 text-lg">
            Cumque, maiores in. Tenetur pariatur nesciunt odio quam ab nemo
            nulla aut dolor, fuga nostrum in quibusdam cumque consequatur iste
            voluptates debitis commodi libero, similique excepturi architecto
            exercitationem natus! Ratione!
          </p>

          <p className="mb-3 text-lg">
            Explicabo impedit ipsam ea earum deserunt similique voluptates
            doloremque perferendis praesentium alias ipsa quo, laudantium,
            consequuntur eum natus neque, quis dolores maiores ducimus voluptate
            ut aperiam ipsum aliquid? Earum, saepe!
          </p>
        </div>
      </div>
    </div>
  );
}

export default PageGettingStarted;

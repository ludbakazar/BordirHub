export default function Navbar() {
  return (
    <div className="navbar bg-base-100 flex justify-between items-center p-4 shadow-md">
      <div>
        <a className="btn btn-ghost text-xl text-white hover:text-gray-300 transition duration-200">
          daisyUI
        </a>
      </div>
      <div>
        <ul className="flex flex-row gap-6">
          <li>
            <a
              href="/"
              className="text-white hover:text-gray-300 transition duration-200"
            >
              Home
            </a>
          </li>

          <li>
            <a
              href="/transaction"
              className="text-white hover:text-gray-300 transition duration-200"
            >
              Transaction
            </a>
          </li>

          <li>
            <a
              href="/services"
              className="text-white hover:text-gray-300 transition duration-200"
            >
              Services
            </a>
          </li>
          <li>
            <h1 className="text-white hover:text-gray-300 transition duration-200">
              Contact
            </h1>
          </li>
        </ul>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User  Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
          >
            <li>
              <a className="justify-between text-white hover:bg-gray-200 transition duration-200">
                Profile
              </a>
            </li>
            <li>
              <a className="text-white hover:bg-gray-200 transition duration-200">
                Settings
              </a>
            </li>
            <li>
              <a className="text-white hover:bg-gray-200 transition duration-200">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { handleLogout } = useAuthContext();
  return (
    <div className="flex justify-between items-center py-4 px-10">
      <div className="flex gap-4 justify-between items-center">
        <div className="font-bold text-3xl text-slate-700">
          <span className=" text-blue-800">Uni</span>chat
        </div>
        <div className="list">
          <ul className="flex gap-2">
            <li className="hover:text-blue-800 cursor-pointer">About</li>
            <div className="font-bold">|</div>
            <li className="hover:text-blue-800 cursor-pointer">Page-One</li>
            <div className="font-bold">|</div>
            <li className="hover:text-blue-800 cursor-pointer">Contact</li>
          </ul>
        </div>
      </div>

      <div className="profile">
        <div className="flex gap-2">
          <div className="search">
            <input
              type="text"
              placeholder="Enter your search"
              className="px-4 py-1 outline-none"
            />
          </div>
          <div className="">
            <img
              src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="profile"
              className="w-11 rounded-3xl"
            />
          </div>
          <button
            className="text-sm font-bold bg-slate-800 text-white px-3 py-1 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

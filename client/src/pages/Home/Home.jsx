import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";

function Home() {
  const Navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/verify", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setUserName(res.data.name);
    } catch (error) {
      console.log(error);
    }
  };

  const getOnlineUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/onlineUsers", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = res.data;
      // console.log(data);
      setOnlineUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log(token);
    if (!token) {
      Navigate("/signin");
    }
    getData();
    getOnlineUsers();
  }, []);
  return (
    <>
      <div className="mainContainer border-2 flex flex-col justify-between gap-2 overflow-hidden">
        <Navbar />
        <div className="container flex justify-between h-full w-full rounded-xl p-5 gap-2">
          <div className="sidebar w-80 flex flex-col justify-between p-7 gap-4 bg-slate-700 text-white border rounded-l-lg border-gray-200">
            <div className="user_profile-box flex flex-col justify-center items-center gap-2 py-7 bg-slate-100 rounded-lg text-gray-700">
              <img
                src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="profile"
                className=" w-36 rounded-2xl"
              />
              <div className="userContainer flex flex-col justify-center items-center">
                <div className="user">{userName}</div>
                <div className="userinfo">SoftWare Developer</div>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-white rounded-full peer dark:bg-gray-200 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-400"></div>
                  <span className="ms-3 text-sm font-medium text-slate-900 dark:text-gray-300">
                    Active
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your search"
                  className="px-4 py-1 outline-none bg-gray-100"
                />
              </div>
            </div>
            <div className="online bg-slate-100 text-gray-700 rounded-lg flex flex-col p-4 gap-4">
              <div>Online users</div>
              <ul className="flex flex-col justify-center items-start gap-1">
                {onlineUsers.map((user) => (
                  <li className="flex justify-around gap-4" key={user._id}>
                    <div className="name-logo bg-red-400 px-3 rounded-xl">
                      A
                    </div>
                    <div className="username text-gray-600">{user.name}</div>
                  </li>
                ))}
              </ul>
              {/* <ul className="flex flex-col justify-center items-center gap-1">
                <li className="flex justify-around gap-4">
                  <div className="name-logo bg-red-400 px-3 rounded-xl">A</div>
                  <div className="username text-gray-600">Ankit</div>
                </li>
                <li className="flex justify-around gap-4">
                  <div className="name-logo bg-red-400 px-3 rounded-xl">A</div>
                  <div className="username">Ankit</div>
                </li>
                <li className="flex justify-around gap-4">
                  <div className="name-logo bg-red-400 px-3 rounded-xl">A</div>
                  <div className="username">Ankit</div>
                </li>
                <li className="flex justify-around gap-4">
                  <div className="name-logo bg-red-400 px-3 rounded-xl">A</div>
                  <div className="username">Ankit</div>
                </li>
                <li className="flex justify-around gap-4">
                  <div className="name-logo bg-red-400 px-3 rounded-xl">A</div>
                  <div className="username">Ankit</div>
                </li>
              </ul> */}
            </div>
            <div className="date_time">
              <ul>
                <li>2021-01-01</li>
                <li>03:53pm</li>
              </ul>
            </div>
          </div>

          {/* <div className="flex flex-col flex-auto h-full p-6"> */}
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-r-2xl bg-gray-100 h-full w-1/3 p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  <div className="col-start-1 col-end-8 p-3 rounded-lg">
                    <div className="flex flex-row items-center">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-500 font-semibold text-white flex-shrink-0">
                        A
                      </div>
                      <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                        <div>Hey How are you today?</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-1 col-end-8 p-3 rounded-lg">
                    <div className="flex flex-row items-center">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-500 font-semibold text-white flex-shrink-0">
                        A
                      </div>
                      <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                        <div>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Vel ipsa commodi illum saepe numquam maxime
                          asperiores voluptate sit, minima perspiciatis.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-6 col-end-13 p-3 rounded-lg">
                    <div className="flex items-center justify-start flex-row-reverse">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-500 font-semibold text-white flex-shrink-0">
                        A
                      </div>
                      <div className="relative mr-3 text-sm bg-slate-400 py-2 px-4 shadow rounded-xl">
                        <div>I am ok what about you?</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-6 col-end-13 p-3 rounded-lg">
                    <div className="flex items-center justify-start flex-row-reverse">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-500 font-semibold text-white flex-shrink-0">
                        A
                      </div>
                      <div className="relative mr-3 text-sm bg-slate-400 py-2 px-4 shadow rounded-xl">
                        <div>
                          Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-1 col-end-8 p-3 rounded-lg">
                    <div className="flex flex-row items-center">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-500 font-semibold text-white flex-shrink-0">
                        A
                      </div>
                      <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                        <div>Lorem ipsum dolor sit amet !</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-6 col-end-13 p-3 rounded-lg">
                    <div className="flex items-center justify-start flex-row-reverse">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-500 font-semibold text-white flex-shrink-0">
                        A
                      </div>
                      <div className="relative mr-3 text-sm bg-slate-400 py-2 px-4 shadow rounded-xl">
                        <div>
                          Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                        </div>
                        <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
                          Seen
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-1 col-end-8 p-3 rounded-lg">
                    <div className="flex flex-row items-center">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-500 font-semibold text-white flex-shrink-0">
                        A
                      </div>
                      <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                        <div>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Perspiciatis, in.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              <div>
                <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    className="flex w-full border rounded-xl focus:outline-none focus:border-slate-300 pl-4 h-10"
                  />
                  <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="ml-4">
                <button className="flex items-center justify-center bg-slate-600 hover:bg-slate-900 rounded-lg text-white px-4 py-2 flex-shrink-0">
                  <span>Send</span>
                  <span className="ml-2">
                    <svg
                      className="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default Home;

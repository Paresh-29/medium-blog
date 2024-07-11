// import { Link, useNavigate } from "react-router-dom";
// import { Avatar } from "./BlogCard";
// import { useEffect, useState } from "react";
// import { BACKEND_URL } from "../config";
// import axios from "axios";

// interface User {
//   name: string;
// }

// export const Appbar = () => {
//   const [user, SetUSer] = useState<User | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchUSer();
//   },[])

//      const fetchUSer = async () => {
//        const token = localStorage.getItem("token");
//        if (token) {
//          try {
//            const response = await axios(`${BACKEND_URL}/api/v1/user/me`, {
//              headers: {
//                Authorization: `Bearer ${token}`,
//              },
//            });
//            SetUSer(response.data.user);
//          } catch (error) {
//            console.log("Error fetching user: ", error);
//          }
//        }
//      };

//      const handleLogout = () => {
//       localStorage.removeItem("token");
//       SetUSer(null);
//       navigate("/signin");
//      }

//   return (
//     <div className="border-b flex justify-between items-center px-10 py-4">
//       <Link
//         to={"/blogs"}
//         className="flex flex-col justify-center cursor-pointer"
//       >
//         Medium
//       </Link>
//       <div>
//         <Link to={"/publish"}>
//           <button
//             type="button"
//             className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
//           >
//             New
//           </button>
//         </Link>
//         {user ? (
//           <div className="flex items-center ml-auto">
//             <Avatar size={"big"} name={user?.name || "Anonymous"} />
//             <button onClick={handleLogout}
//             className="ml-2 text-gray-600 hover:text-gray-800 focus:outline-none "
//             >
//               Logout
//             </button>
//           </div>
//         ):(
//           <Link to={"/signin"}>
//             <button className="ml-2 text-gray-600 hover:text-gray-800 focus:outline-none">
//             </button>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };


import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface User {
  name: string;
}

export const Appbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
      } catch (error) {
        console.log("Error fetching user: ", error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/signin");
  };

  return (
    <div className="border-b flex justify-between items-center px-10 py-4">
      <Link
        to={"/blogs"}
        className="flex flex-col justify-center cursor-pointer"
      >
        Medium
      </Link>
      <div className="flex items-center ml-auto">
        <Link to={"/publish"}>
          <button
            type="button"
            className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            New
          </button>
        </Link>
        {user ? (
          <>
            <Avatar size={"big"} name={user.name || "Anonymous"} />
            <button
              onClick={handleLogout}
              className="ml-2 text-gray-600 hover:text-gray-800 focus:outline-none bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to={"/signin"}>
            <button className="ml-2 text-gray-600 hover:text-gray-800 focus:outline-none bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

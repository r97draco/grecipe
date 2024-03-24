import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { UserContext, backendUrl } from "../App";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";

function Nav() {
  const [top, setTop] = useState(true);
  const location = useLocation();
  const isLinkActive = (path) => location.pathname === path;

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    console.log(user);
  }, [user]);
  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Result of SignIn", result);
      const userName = result.user.displayName;
      const email = result.user.email;
      const photoURL = result.user.photoURL;
      const token = await result.user.getIdToken();
      setUser({ userName, email, photoURL });
      localStorage.setItem("self_care_token", token);
      const response = await axios
        .get(`${backendUrl}/api/user/getuser`, {
          headers: {
            Authorization: token,
            email: email,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data, "data");
            setUser(res.data);
          } else if (res.status === 409) {
            console.log("Create an account!");
          }
        })
        .catch((err) => {
          console.log("user doesn't exist");
        });
      // const response = await axios.post(`${backendUrl}/api/user/createuser`, { userName, email }, {headers: token});
      console.log("response", response);
      console.log(token);
      // navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const createUser = async () => {
    try {
      axios.post(`${backendUrl}/api/user/createuser`, {
        name: user.userName,
        email: user.email,
        photoURL: user.photoURL,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem("self_care_token");
      navigate("/");
      setUser({});
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const token = localStorage.getItem("self_care_token");
      if (token)
        try {
          const token = await user.getIdToken();
          const response = await axios.get(`${backendUrl}/api/user/getuser`, {
            headers: {
              Authorization: token,
              email: user.email,
            },
          });

          if (response.status === 200) {
            console.log(response.data, "data");
            setUser(response.data);
          } else if (response.status === 409) {
            console.log("Create an account!");
            // setUserDoesNotExist(true);
          }
        } catch (err) {
          console.error(err);
          console.log("user doesn't exist");
          // setUserDoesNotExist(true);
        }
      else {
        // Handle the case when the user is not logged in
        console.log("No user logged in");
        // setUser({});
      }
    });

    return unsubscribe;
  }, [setUser]);

  const links = [
    { to: "/", title: "Home" },
    { to: "/inventory", title: "Inventory" },
    { to: "/recipe", title: "Recipe" },
  ];
  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top && "bg-white backdrop-blur-sm shadow-lg"
      }`}
    >
      <div className="max-w-6xl px-5 mx-auto sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <Link to="/" className="block" aria-label="Cruip">
              Grecipe
            </Link>
          </div>

          {/* Site navigation */}
          <nav className="flex flex-grow">
            <ul className="flex flex-wrap items-center justify-end flex-grow">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`flex items-center px-5 py-3 font-medium transition duration-150 ease-in-out hover:text-gray-600 text-gray-700 ${
                      isLinkActive(link.to) && "text-gray-900"
                    }`}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}

              {user.userName ? (
                <ul className="flex items-center gap-3">
                  <li>
                    <img
                      className="w-12 h-12 rounded-full"
                      src={user.photoURL}
                      alt=""
                    />
                  </li>
                  <li onClick={signOut}>
                    <Link
                      // to="/signup"
                      className="ml-3 text-gray-200 bg-gray-900 btn-sm hover:bg-gray-800"
                    >
                      <span>Logout</span>
                      <FaGoogle className="flex items-center ml-2 text-gray-400" />
                    </Link>
                  </li>
                </ul>
              ) : (
                <>
                  <li onClick={signIn}>
                    <Link
                      // to="/signup"
                      className="ml-3 text-gray-200 bg-gray-900 btn-sm hover:bg-gray-800"
                    >
                      <span>Join </span>
                      <svg
                        className="flex-shrink-0 w-3 h-3 ml-2 -mr-1 text-gray-400 fill-current"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                          fillRule="nonzero"
                        />
                      </svg>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Nav;

import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { UserContext, backendUrl } from "../App";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";
import Logo from "../Assets/Grecipe-Logo.svg";
import { toast } from "react-toastify";

export const notify = (message, type) => {
  if (type === "success") {
    toast.success(message, {
      position: "bottom-right",
    });
  } else if (type === "error") {
    toast.error(message, {
      position: "bottom-right",
    });
  } else if (type === "warning") {
    toast.warn(message, {
      position: "bottom-right",
    });
  } else if (type === "info") {
    toast.info(message, {
      position: "bottom-right",
    });
  } else {
    toast(message, {
      position: "bottom-right",
    });
  }
};

function Nav() {
  const [top, setTop] = useState(true);
  const location = useLocation();
  const isLinkActive = (path) => location.pathname === path;

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.screenY > 10 ? setTop(false) : setTop(true);
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
      const { displayName: userName, email, photoURL } = result.user;
      const token = await result.user.getIdToken();
      console.log(token);
      localStorage.setItem("self_care_token", token);

      axios
        .get(`${backendUrl}/api/user/getuser`, {
          params: { email: email },
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async (res) => {
          if (res.status === 200 || res.status === 204) {
            console.log("User data fetched successfully", res.data);
            setUser(res.data);
            notify("User logged in successfully", "success");
            navigate("/inventory");
          }
        })
        .catch(async (error) => {
          console.log("User doesn't exist, creating user...");
          try {
            const createUserResponse = await axios.post(
              `${backendUrl}/api/user/createuser`,
              {
                userName,
                email,
                photoURL,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            if (createUserResponse.status === 201) {
              console.log("User created successfully", createUserResponse.data);
              notify("User created successfully", "success");
              setUser({ userName, email, photoURL }); // Adjust according to the actual response structure
              navigate("/inventory");
            }
          } catch (createUserError) {
            console.error("Error creating user", createUserError);
            notify("Error creating user", "error");
          }
        });
    } catch (signInError) {
      console.error(
        "Error text-transparent bg-clipduring sign-in",
        signInError
      );
      notify("Error during sign-in", "error");
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem("self_care_token");
      notify("User logged out successfully", "success");
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
            params: {
              email: user.email,
            },
            headers: {
              Authorization: token,
            },
          });

          if (response.status === 200) {
            console.log(response.data, "data");
            setUser(response.data);
          } else if (response.status === 409) {
            console.log("Create an account!");
          }
        } catch (err) {
          console.error(err);
          console.log("user doesn't exist");
        }
      else {
        console.log("No user logged in");
      }
    });

    return unsubscribe;
  }, [setUser]);

  const links = [
    { to: "/inventory", title: "Inventory" },
    { to: "/recipe", title: "Recipe" },
  ];
  return (
    <header
      className={`fixed w-full z-30 backdrop-blur-md  md:bg-opacity-90 transition duration-300 ease-in-out shadow-lg ${
        !top && "  "
      }`}
    >
      <div className="px-5 mx-auto max-w-8xl sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0 mr-4">
            <Link className=" nav-logo-container" to={"/"}>
              <img src={Logo} className="h-3/4" alt="" />
            </Link>
          </div>

          <nav className="flex flex-grow">
            <ul className="flex flex-wrap items-center justify-end flex-grow">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`flex items-center text-lg font-medium font-inter px-5 py-3 transition duration-150 ease-in-out hover:text-gray-600 text-gray-700 ${
                      isLinkActive(link.to) &&
                      "text-gray-900 underline-offset-4 underline"
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
                    <Link className="ml-3 text-gray-200 bg-primary-500 btn-sm hover:bg-primary-400">
                      <span>Logout</span>
                      <FaGoogle className="flex items-center ml-2 text-gray-200" />
                    </Link>
                  </li>
                </ul>
              ) : (
                <>
                  <li onClick={signIn}>
                    <Link className="ml-3 text-gray-200 bg-primary-500 btn-sm hover:bg-primary-400">
                      <span>Join </span>
                      <FaGoogle className="flex items-center ml-2 text-gray-200" />
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

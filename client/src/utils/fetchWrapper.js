import { backendUrl } from "../App";

const customFetch = async (pathname, options) => {
  const token = localStorage.getItem("self_care_token");

  try {
    const response = await fetch(`${backendUrl}/api${pathname}`, {
      ...options,
      ...(token
        ? {
            headers: {
              Authorization: token,
            },
          }
        : {}),
    });

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export default customFetch;

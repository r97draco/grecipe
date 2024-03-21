const customFetch = async (pathname, options) => {
  const token = localStorage.getItem("self_care_token");

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api${pathname}`,
      {
        ...options,
        ...(token
          ? {
              headers: {
                Authorization: token,
              },
            }
          : {}),
      }
    );

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export default customFetch;

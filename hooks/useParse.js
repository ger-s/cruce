import React, { useState, useEffect } from "react";

function useParse () {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      function parseJwt(token) {
        return JSON.parse(window.atob(token.split(".")[1]));
      }
      setUser(parseJwt(localStorage.getItem("token")));
    }
  }, []);
  return user;
};

export default useParse;

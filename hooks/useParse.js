import React, { useState, useEffect } from "react";

function useParse () {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      function parseJwt(token) {
        return JSON.parse(window.atob(token.split(".")[1]));
      }
     const tok=localStorage.getItem("token")
    tok?  setUser(parseJwt(localStorage.getItem("token"))):null
    }
  }, []);
  return user;
};

export default useParse;

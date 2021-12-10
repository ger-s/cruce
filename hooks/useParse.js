import React, { useState, useEffect } from "react";

function useParse () {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      function parseJwt(token) {
        return JSON.parse(window.atob(token.split(".")[1]));
      }
    () => {
      let timer1 = setTimeout(() => setShow(true), 2000);
      return () => {
        clearTimeout(timer1);}
      }
    const tok = localStorage.getItem("token")
    tok ? setUser(parseJwt(localStorage.getItem("token"))): setUser({dni: false})
    }
  }, []);
  return user;
};

export default useParse;

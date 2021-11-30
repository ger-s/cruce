import {useState, useEffect} from 'react'

// no existe window del lado del servidor (next es server side),
// por lo que necesitamos este hook
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // sólo ejecuta el siguiente código del lado del cliente
    if (typeof window !== 'undefined') {
      // handler para el resize
      function handleResize() {
        // setea altura y ancho desde el cliente usando window
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    
      // add event listener
      window.addEventListener("resize", handleResize);
     
      // call al handler así se actualizan los estados siempre que haya resize
      handleResize();
    
      // remueve el event listener
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
}

export default useWindowSize;
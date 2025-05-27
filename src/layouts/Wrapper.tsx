// Wrapper.tsx
import { useEffect } from "react";
import WOW from "wow.js";

const Wrapper = ({ children }: any) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js")
        .then(() => console.log("Bootstrap JS loaded"))
        .catch(error => console.error("Error loading Bootstrap JS:", error));
    }
  }, []);

  useEffect(() => {
    const wow = new WOW({ live: false });
    wow.init();
  }, []);

  return <>{children}</>;
};

export default Wrapper;

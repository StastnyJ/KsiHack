import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import {} from "@mui/material";
import { useLocation } from "react-router-dom";

// const themeStoredCode: string = localStorage.getItem("theme") || "light";

export default function Layout(props: { children?: React.ReactNode }) {
  // const [theme, setTheme] = useState<"dark" | "light">(themeStoredCode as "dark" | "light");
  const location = useLocation();

  // const changeAppTheme = (theme: "dark" | "light") => {
  //   document.body.style.backgroundColor = "";
  //   document.body.style.color = "";

  //   if (theme === "dark") {
  //     document.body.style.backgroundColor = "#212121";
  //     document.body.style.color = "#fafafa";
  //   }

  //   setTheme(theme);
  //   localStorage.setItem("theme", theme);
  // };

  // useEffect(() => {
  //   if (theme === "dark") {
  //     document.body.style.backgroundColor = "#212121";
  //     document.body.style.color = "#fafafa";
  //   }
  // });

  return (
    <div>
      {location.pathname.length > 1 && (
        <>
          <div style={{ flexGrow: 1 }}>
            <Header isAuthenticated={false} user={{}} logout={() => {}} />
          </div>
          <br />
        </>
      )}
      {props.children}
      <Footer hidden={false} />
    </div>
  );
}

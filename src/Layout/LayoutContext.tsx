import React, { useEffect, useState, createContext, useContext } from "react";
import { Snackbar, Alert } from "@mui/material";
import Layout from "./Layout";
import { deleteCookie, getCookie, setCookie } from "../Utils/Cookies";
import { apiFetch } from "../Utils/Api";

export const LayoutContext = createContext({
  success: (message: string) => {},
  error: (message: string) => {},
  warning: (message: string) => {},
  info: (message: string) => {},
  customAlert: (message: string, bg: string, color: string) => {},
  setIsLoading: (isLoading: boolean) => {},
  login: (name: string) => {},
  logout: () => {},
  isLoading: false,
  isLoggedIn: false,
  isAdmin: false,
  loggedName: "",
});

export enum AlertSeverity {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export function LayoutProvider(props: { children?: React.ReactNode }) {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [loggedName, setLoggedName] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState(AlertSeverity.SUCCESS);
  const [customAlertProps, setCustomAlertProps] = useState({
    message: "",
    color: "",
    bg: "",
  });

  useEffect(() => {
    apiFetch("/users/getLoggedUser.php", "GET", new FormData(), login);
  }, []);

  const success = (message: string) => {
    setAlertSeverity(AlertSeverity.SUCCESS);
    setAlertMessage(message);
  };
  const error = (message: string) => {
    setAlertSeverity(AlertSeverity.ERROR);
    setAlertMessage(message);
  };
  const warning = (message: string) => {
    setAlertSeverity(AlertSeverity.WARNING);
    setAlertMessage(message);
  };
  const info = (message: string) => {
    setAlertSeverity(AlertSeverity.INFO);
    setAlertMessage(message);
  };

  const customAlert = (message: string, bg: string, color: string) =>
    setCustomAlertProps({
      message: message,
      bg: bg,
      color: color,
    });

  const logout = () => {
    deleteCookie("userRole");
    setLoggedIn(false);
    setLoggedName("");
  };
  const login = (name: string) => {
    if (getCookie("userRole") === null) {
      setCookie("userRole", "user", 1);
    }
    setLoggedIn(true);
    setLoggedName(name);
  };

  const isAdmin = getCookie("userRole") === "admin";

  return (
    <LayoutContext.Provider
      value={{
        success: success,
        error: error,
        warning: warning,
        info: info,
        customAlert: customAlert,
        setIsLoading: setLoading,
        isLoading: loading,
        logout: logout,
        login: login,
        isAdmin: isAdmin,
        isLoggedIn: loggedIn === true,
        loggedName: loggedName,
      }}
    >
      <Layout>
        {props.children}
        <Snackbar
          open={Boolean(alertMessage)}
          onClose={() => setAlertMessage("")}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={() => setAlertMessage("")} severity={alertSeverity}>
            {alertMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          open={Boolean(customAlertProps.message)}
          onClose={() => setCustomAlertProps({ ...customAlertProps, message: "" })}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            style={{ color: customAlertProps.color, backgroundColor: customAlertProps.bg }}
            onClose={() => setCustomAlertProps({ ...customAlertProps, message: "" })}
            icon={false}
          >
            {customAlertProps.message}
          </Alert>
        </Snackbar>
        {/* <LinearProgress style={{ position: "fixed", bottom: "0", height: "4px", width: "100%" }} hidden={!loading} /> */}
      </Layout>
    </LayoutContext.Provider>
  );
}

export const useLayout = () => useContext(LayoutContext);

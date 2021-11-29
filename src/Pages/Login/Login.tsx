import React, { useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import styled from "@emotion/styled";
import { useLayout } from "../../Layout/LayoutContext";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../Utils/Api";

const Root = styled.div({
  display: "flex",
  height: "100vh",
  alignItems: "center",
  alignContent: "center",
});

export default function Login() {
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const layout = useLayout();
  const nav = useNavigate();

  const login = () => {
    const updateRequest = new FormData();
    updateRequest.append("userName", name);
    updateRequest.append("pwd", pwd);
    apiFetch(
      "/users/login.php",
      "POST",
      updateRequest,
      (n) => {
        layout.login(n);
        nav("/");
      },
      () => layout.error("Přihlášení nebylo úspěšné, překontrolujte jméno a heslo.")
    );
  };

  return (
    <Container maxWidth="xs">
      <Root>
        <div>
          <TextField
            variant="standard"
            label="Uživatelské jméno"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            variant="standard"
            label="Heslo"
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            fullWidth
          />
          <br />
          <br />
          <br />
          <Button
            disabled={name.length === 0 || pwd.length === 0}
            onClick={login}
            variant="contained"
            color="primary"
            fullWidth
          >
            Přihlásit se
          </Button>
        </div>
      </Root>
    </Container>
  );
}

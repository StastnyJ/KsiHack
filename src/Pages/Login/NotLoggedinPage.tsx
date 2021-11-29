import styled from "@emotion/styled";
import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  adminRequired?: boolean;
}

const Root = styled.div({
  display: "flex",
  height: "100vh",
  alignItems: "center",
  alignContent: "center",
});

export default function Home({ adminRequired }: IProps) {
  const navigation = useNavigate();
  return (
    <Container maxWidth="xs">
      <Root>
        <div>
          <Typography>
            Pro zobrazení této stránky je nutné se přihlásit{adminRequired ? " na účet s administrátorskými právy" : ""}.
          </Typography>
          <br />
          <br />
          <Button variant="contained" fullWidth color="primary" onClick={() => navigation("/login")}>
            Přejít na přihlášení
          </Button>
        </div>
      </Root>
    </Container>
  );
}

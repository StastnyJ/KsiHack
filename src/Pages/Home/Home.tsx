import React from "react";
import { Button, Card, CardActions, CardContent, CardHeader, Container, Tooltip, Typography } from "@mui/material";
import { useLayout } from "../../Layout/LayoutContext";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../Utils/Api";

const Root = styled.div({
  display: "flex",
  height: "100vh",
  width: "100%",
  alignItems: "center",
  alignContent: "center",
});

export default function Home() {
  const layout = useLayout();
  const nav = useNavigate();

  const logout = () => {
    apiFetch("/users/logout.php", "POST", new FormData(), () => nav("/login"));
  };

  return (
    <Container maxWidth="sm">
      <Root>
        <div style={{ width: "100%" }}>
          <Card>
            <CardHeader title="Informace o přihlášeném uživateli" />
            <CardContent>
              <Typography>
                Uživatelské jméno: <b>{layout.loggedName}</b>
              </Typography>
              <Typography>
                ID zaměstnanca: <b>prx1234653823d</b>
              </Typography>
              <Typography>
                Typ uživatela: <b>{layout.isAdmin ? "Administártor" : "Běžný uživatel"}</b>
              </Typography>
              {layout.isAdmin && (
                <Typography>
                  Servisní kód: <b>C93Ldd02DFvcx</b>
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button onClick={logout}>Odhlásit se</Button>
            </CardActions>
          </Card>
          <br />
          <Tooltip title={layout.isAdmin ? "Seznam vězňů" : "Pro použití této funkce jsou nutná administrátorská práva"}>
            <Button onClick={() => nav("/Prisoners")} fullWidth disabled={!layout.isAdmin} variant="contained" color="primary">
              Seznam vězňů
            </Button>
          </Tooltip>
          <br />
          <br />
          <Tooltip
            title={layout.isAdmin ? "Žádosti o propuštění" : "Pro použití této funkce jsou nutná administrátorská práva"}
          >
            <Button
              onClick={() => nav("/ReleaseRequests")}
              fullWidth
              disabled={!layout.isAdmin}
              variant="contained"
              color="secondary"
            >
              Žádost o propuštění vězňa
            </Button>
          </Tooltip>
        </div>
      </Root>
    </Container>
  );
}

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLayout } from "../../Layout/LayoutContext";
import { apiFetch } from "../../Utils/Api";
import CreateRequestModal from "./CreateRequestModal";

export interface Request {
  prisonerCode: string;
  author: string;
  description: string;
  createdDate: string;
  approved: boolean;
  approvedBy: boolean;
  approvedTime: string;
  validationCode: string;
}

export default function ReleaseRequests() {
  const [requests, setRequests] = useState<Request[]>([]);
  const layout = useLayout();

  useEffect(() => {
    apiFetch("/releaseRequests/getAll.php", "GET", new FormData(), (res) => setRequests(JSON.parse(res)));
  }, []);

  const approveRequest = (reqId: number) => {
    const data = new FormData();
    data.append("requestId", reqId.toString());
    data.append("userId", "219");
    // data.append("userId", "483");
    apiFetch(
      "/releaseRequests/approveRequest.php",
      "POST",
      data,
      (res) => setRequests(JSON.parse(res)),
      () => layout.error("Při schvalování došlo k chybě. Pravděpodobně nemáte dostatečná oprávnění")
    );
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h6">Aktuální žádosti</Typography>
      <br />
      {requests.length === 0 ? (
        <Typography>Momentálně nejsou žádné aktivní žádosti na propuštění vězňa.</Typography>
      ) : (
        <Grid container spacing={3}>
          {requests.map((r, i) => (
            <Grid key={i} item xs={12} md={4}>
              <Card>
                <CardHeader title={"Žádost o propuštění"} />
                <CardContent>
                  <Typography>Kód vězňa: {r.prisonerCode}</Typography>
                  <Typography>Autor: {r.author}</Typography>
                  <Typography>Vytvořeno: {new Date(r.createdDate).toLocaleString()}</Typography>
                  <br />
                  <Typography>
                    {r.approved ? (
                      <Chip label="Schváleno" color="success" />
                    ) : (
                      <Chip label="Čekání na schválení" color="warning" />
                    )}
                  </Typography>
                  <br />
                  {r.approved && (
                    <>
                      <Typography>Schváleno uživatelem: {r.approvedBy}</Typography>
                      <Typography>Čas schválení: {new Date(r.approvedTime).toLocaleString()}</Typography>
                      <Typography>Validační kód: {r.validationCode}</Typography>
                    </>
                  )}
                  <br />
                  <Typography>Důvod žádosti</Typography>
                  <Typography>{r.description}</Typography>
                </CardContent>
                {!r.approved && (
                  <CardActionArea>
                    <CardActions>
                      <Button onClick={() => approveRequest(i)}>Schválit</Button>
                    </CardActions>
                  </CardActionArea>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <br />
      <CreateRequestModal setRequests={setRequests} />
    </Container>
  );
}

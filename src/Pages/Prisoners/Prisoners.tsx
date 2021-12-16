import React, { useEffect, useState } from "react";
import {
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import { FileDownload, InfoOutlined } from "@mui/icons-material";
import { apiFetch, apiUrl } from "../../Utils/Api";

interface Prisoner {
  name: string;
  id: number;
  crime: string;
}

export default function Prisoners() {
  const [prisoners, setPrisoners] = useState<Prisoner[]>([]);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    apiFetch(
      "/prisoners/getAll.php",
      "GET",
      new FormData(),
      (d) => setPrisoners(JSON.parse(d)),
      (e) => console.log(e)
    );
  }, []);

  return (
    <Container maxWidth="lg">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Jméno</TableCell>
            <TableCell>Zločin</TableCell>
            <TableCell style={{ textAlign: "right" }}>
              Detailní informace{" "}
              <InfoOutlined onClick={() => setModalOpened(true)} style={{ cursor: "pointer" }} color="info" />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prisoners.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.crime}</TableCell>
              <TableCell style={{ textAlign: "right" }}>
                <Tooltip title="Stáhnout soubor s detaily">
                  <IconButton
                    onClick={() => (window.location.href = apiUrl + "/prisoners/getInfo.php?id=" + p.id.toString())}
                    color="primary"
                  >
                    <FileDownload />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog maxWidth="lg" open={modalOpened} onClose={() => setModalOpened(false)}>
        <DialogTitle>Informace o detailech</DialogTitle>
        <DialogContent>
          Detaily jsou uložené v souboru, který je zašifrovaný pomocí 8 Bytového klíče DES algoritmem v ECB módu. První 2 Byty
          klíče odpovídají id vězňa zakódovaného v bigEndian formátu. Další 3 Byty jsou bezpečnostní Byty, které byly zvoleny
          administrátorem aplikace v době vězňovi registrace. Poslední 3 Byty klíče odpovídají prvním 3 znakům vězňova jména v
          ASCII formátu.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpened(false)}>Zavřít</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

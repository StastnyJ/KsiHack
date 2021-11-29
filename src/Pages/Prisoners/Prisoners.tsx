import React, { useEffect, useState } from "react";
import { Container, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "@mui/material";
import { FileDownload } from "@mui/icons-material";
import { apiFetch, apiUrl } from "../../Utils/Api";

interface Prisoner {
  name: string;
  id: number;
  crime: string;
}

export default function Prisoners() {
  const [prisoners, setPrisoners] = useState<Prisoner[]>([]);

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
            <TableCell>Jméno</TableCell>
            <TableCell>Zločin</TableCell>
            <TableCell style={{ textAlign: "right" }}>Detailní informace</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prisoners.map((p) => (
            <TableRow key={p.id}>
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
    </Container>
  );
}

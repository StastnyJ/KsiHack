import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { apiFetch } from "../../Utils/Api";
import { Request } from "./ReleaseRequests";

interface IProps {
  setRequests: (r: Request[]) => void;
}

export default function CreateRequestModal({ setRequests }: IProps) {
  const [opened, setOpened] = useState(false);
  const [code, setCode] = useState("");
  const [reason, setReason] = useState("");

  const createRequest = () => {
    const data = new FormData();
    data.append("prisonerCode", code);
    data.append("description", reason);
    apiFetch("/releaseRequests/createRequest.php", "POST", data, (res) => {
      setRequests(JSON.parse(res));
      setOpened(false);
      setCode("");
      setReason("");
    });
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpened(true)}>
        Vytvořit žádost
      </Button>
      <Dialog maxWidth="lg" open={opened} onClose={() => setOpened(false)}>
        <DialogTitle>Vytvoření žádosti o propuštění vězňa</DialogTitle>
        <DialogContent>
          <TextField
            variant="standard"
            fullWidth
            value={code}
            onChange={(e) => setCode(e.target.value)}
            label="Bezpočnostní kód vězňa"
          />
          <br />
          <br />
          <TextField
            fullWidth
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            multiline
            rows={3}
            label="Důvod k propuštění"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpened(false)}>Cancel</Button>
          <Button disabled={code.length === 0 || reason.length === 0} onClick={createRequest}>
            Vytvořit žádost
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

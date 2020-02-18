import React, { useState, useEffect } from 'react';
import { Button, Container, TextField } from '@material-ui/core';
import { useApi } from './Api';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    "& > *": {
      margin: "10px"
    }
  }
})

export default function NewAccount() {
  const { api } = useApi();
  const { root } = useStyles();

  const useHexInput = (initial: string) => {
    const [value, set] = useState(initial);
    let isHex = /^([a-fA-F0-9]{2})*$/.test(value);

    return { value, onChange: (e: any) => set(e.target.value), error: !isHex }
  }
  const cert = useHexInput("");
  const sig = useHexInput("");
  const [log, setLog] = useState("");
  const create = () => {
    try {
      const submittable = api.tx.mynaChainModule.createAccount(
        Buffer.from(cert.value, "hex"),
        Buffer.from(sig.value, "hex")
      );
    } catch (e) {
      setLog(e.toString());
    }
  }
  return (
    <Container maxWidth="sm" className={root}>
      <TextField
        label="証明書"
        fullWidth={true}
        placeholder="16進数で"
        multiline
        {...cert}
      />
      <TextField

        label="署名"
        fullWidth={true}
        placeholder="16進数で"
        multiline
        {...sig}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth={true}
        onClick={create}
        disabled={cert.error || sig.error}
      >Create New Account</Button>
      <TextField
        label="ログ"
        fullWidth={true}
        multiline
        disabled
        value={log}
      />
    </Container>
  )
}
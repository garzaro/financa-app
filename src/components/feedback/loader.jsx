import * as React from 'react';
import Button from "@mui/material/Button";
import {Backdrop, CircularProgress, Typography} from "@mui/material";


export default function PanoDeFundo(
  {
    open= false,
    color,
    titulo, mensagem,
  })
{

  return (
    <div>
      <Backdrop
        sx={(theme) => ({color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <div style={{ textAlign: "center" }}>
          <CircularProgress color={color}/>
          <Typography
            variant="body2"
            // opacity-25
            className="text-slate-300 rounded py-14 from:bg-zinc-300 bg-linear-to-br " component="div"
          >
            <h1>{titulo}</h1>
            <p className=" text-red-100 px-2 py-2 rounded opacity-75 bg-zinc-800 ">
              {mensagem}
            </p>
          </Typography>
        </div>
      </Backdrop>
    </div>

  );
}
import * as React from 'react';
import Button from "@mui/material/Button";
import {Backdrop, CircularProgress, Typography} from "@mui/material";


export default function PanoDeFundo({open= false, color, titulo, mensagem,}){

    return (
        <div>
            <Backdrop
                xs={(theme) => ({color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={open}
            >
                <div style={{ textAlign: "center" }}>
                    <CircularProgress color={color}/>
                    <Typography variant="body2" color="white">
                        <h1>{titulo}</h1>
                        <p>{mensagem}</p>
                    </Typography>
                </div>
            </Backdrop>
        </div>

    );
}
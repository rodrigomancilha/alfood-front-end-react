import { useEffect, useState } from "react";
import IPrato from "../../../interfaces/IPrato";
import http from "../../../http";
import { Button, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const AdministracaoPratos = () => {
    const [pratos, setPratos] = useState<IPrato[]>([]);

    useEffect(() => {
        http.get<IPrato[]>('pratos/')
            .then(resposta => setPratos(resposta.data))
    }, [])

    const excluir = (pratoAserExcluido: IPrato) => {
        http.delete(`pratos/${pratoAserExcluido.id}/`)
            .then(() => {
                const listaPrato = pratos.filter(prato => prato.id !== pratoAserExcluido.id)
                setPratos([...listaPrato])
            })
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Nome
                            </TableCell>
                            <TableCell>
                                Tag
                            </TableCell>
                            <TableCell>
                                Imagem
                            </TableCell>
                            <TableCell>
                                Editar
                            </TableCell>
                            <TableCell>
                                Excluir
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pratos.map(prato => <TableRow key={prato.id}>
                            <TableCell>
                                {prato.nome}
                            </TableCell>
                            <TableCell>
                                {prato.tag}
                            </TableCell>
                            <TableCell>
                                [<a href={prato.imagem} target="_blank" rel="noreferrer">ver imagem</a>]
                            </TableCell>
                            <TableCell>
                                [<RouterLink to={`/admin/pratos/${prato.id}`}>editar</RouterLink>]
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={() => excluir(prato)}>
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default AdministracaoPratos

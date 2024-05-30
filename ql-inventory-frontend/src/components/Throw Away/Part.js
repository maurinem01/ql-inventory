import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Modal from '@mui/material/Modal';

// import Typography from '@mui/material/Typography';

export default function Part() {
    const paperStyle = {
        padding: '20px 20px', 
        width: 600, 
        margin: '20px auto'
    }
    
    const textStyle = {width: 350}
    
    const buttonStyle = {width: 150}
    
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px 20px', 
        width: 525,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4
    };

    const [parts, setParts] = useState([])
    const [openAdd, setOpenAdd] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);

    const id = useState()
    const [identifier, setIdentifier] = useState('')
    const [deprecated, setDeprecated] = useState(false)

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);
    const handleOpenUpdate = () => {
        setOpenUpdate(true)
        // console.log(id)
    }
    const handleCloseUpdate = () => setOpenUpdate(false);
    const handleClickAdd = (e) => {
        e.preventDefault()
        const part = {id, identifier, deprecated}
        fetch("http://localhost:8080/api/parts", {
            method:"POST", 
            headers:{"Content-Type":"application/json"}, 
            body:JSON.stringify(part)
        }).then(() => {
            console.log("NEW PART ADDED")
        })
        // reload component
        handleCloseAdd()
    }
    const handleClickUpdate = () => {
        // const part = {id, identifier, deprecated}
        // fetch("http://localhost:8080/api/parts", {
        //     method:"PUT", 
        //     headers:{"Content-Type":"application/json"}, 
        //     body:JSON.stringify(part)
        //     }
        // )

    }
    
    
    useEffect(() => {
        fetch("http://localhost:8080/api/parts")
            .then(res => {
                return res.json()
            })
            .then(result => {
                setParts(result)
            })
    }, [])

  return (
    <Container>
        <Paper elevation = {3} style = {paperStyle}>
            { parts?.map(part => (
            <Paper elevation = {0} style = {{margin:"10px", padding:"0px", textAlign:"left"}} key = { part.id }>
                <span style={{float:"left"}}>{ part.id } { part.identifier } { part.deprecated }</span>
                <span style={{float:"right"}}>
                    <Button onClick={handleOpenUpdate}>TRY</Button>
                    <CreateOutlinedIcon />
                    <DeleteOutlineOutlinedIcon />
                    {/* Deactivate delete if deprecated */}
                </span>                
                <br /><hr />
            </Paper>
            )) }
            <Button variant="contained" style={buttonStyle} onClick={handleOpenAdd}>+ ADD NEW</Button>

            <Modal
                open={openAdd}
                onClose={handleCloseAdd}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper elevation={3} style = {modalStyle}>
                    <h1 align="center">Add Part</h1>
                    <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    align="center"
                    >
                        <TextField id="standard-basic" label="Part Name" variant="standard" style={textStyle}
                            value={identifier} 
                            onChange={(e) => setIdentifier(e.target.value)}
                        /><br />
                        <Button variant="contained" style={buttonStyle} onClick={handleClickAdd}>Add</Button>
                    </Box>
                </Paper>
            </Modal>

            <Modal
                open={openUpdate}
                onClose={handleCloseUpdate}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper elevation={3} style = {modalStyle}>
                    <h1 align="center">Update Part</h1>
                    <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    align="center"
                    >
                        <TextField id="standard-basic" label="Part Name" variant="standard" style={textStyle}
                            value={identifier} 
                            onChange={(e) => setIdentifier(e.target.value)}
                        /><br />
                        <Button variant="contained" style={buttonStyle} onClick={handleClickUpdate}>Update</Button>
                    </Box>
                </Paper>
            </Modal>
        </Paper>
    </Container>
  );
}

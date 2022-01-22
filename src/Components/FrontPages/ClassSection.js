import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useHistory } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({id}) {
    const [open, setOpen] = React.useState(true);
    const [data, setData] = React.useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const history = useHistory()


    const getData = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/api/class-section/${id}/`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        }).then((result) => {
            result.json().then((resp) => {
                setData(resp)                
            })
        })
    }

    React.useEffect(() => {
        getData(id)
    }, [])


    const classFunc = (id) => {
        localStorage.setItem("classSection",id)
        history.push('./paymentsummery')
    }

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="row">
                        <div className="text-center ">
                            {
                                data.map((e) =>
                                    <div className="button_holder col-sm-5  d-flex">
                                        <a data-toggle='modal' className="btn btn-lg btn-primary square-button" data-dismiss="modal"
                                            onClick={() => classFunc(e.id)} id="ett">Class Section<br /><span>{e.newClass}<sup></sup></span>
                                        </a>

                                    </div>
                            )
                            }
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
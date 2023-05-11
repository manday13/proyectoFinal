import { useContext, useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import API_URL from '../../apiconfig';
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];


function LetterRecomendation({ userForLetter, notShowLetter }) {
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    };
    return (
        <Modal show={userForLetter} onHide={notShowLetter}>
            <Modal.Header closeButton>
                <Modal.Title><h3>Hola</h3></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <input type="file"/> */}
                <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
            </Modal.Body>
        </Modal>
    )
}

export default LetterRecomendation;
import { useContext, useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import GlobalContext from "../../GlobalContext";
import API_URL from '../../apiconfig';
import './LetterRecomendation.css';
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["PDF"];

function LetterRecomendation({ userForLetter, notShowLetter, closeAndRefresh, tokenExpired }) {
    const {token} = useContext(GlobalContext)
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    };

    const editLetter = () => {
        const fdata = new FormData()
        fdata.append("id", userForLetter.id)
        fdata.append("file", file);
        const requested = {
            method: 'PUT',
            headers: {authorization: token},
            body: fdata
        };
        fetch(API_URL + "users/letter", requested)
            .then(res => res.json())
            .catch(err => err)
            .then((res) => {
                if(res.ok){
                    closeAndRefresh();
                }
                else{
                    tokenExpired()
                }
            })
            .catch((err)=> err)
    }

    return (
        <Modal show={userForLetter} onHide={notShowLetter}>
            <Modal.Header closeButton>
                <Modal.Title><h3>Upload {userForLetter.letter ? "new" : ""} document</h3></Modal.Title>
            </Modal.Header>
            <Modal.Body>   
                <p>Please, do not include "-" in the name of the pdf file.</p>           
                <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
            </Modal.Body>
            <Modal.Footer>
                {userForLetter.letter && <Button variant="danger" size="m">Delete existent</Button>}
                <Button variant="primary" size="m" onClick={editLetter} >{userForLetter.letter ? "Edit" : "Upload"}</Button>
                <Button variant="secondary" size="m" onClick={notShowLetter}>Cancel</Button>    
            </Modal.Footer>
        </Modal>
    )
}

export default LetterRecomendation;
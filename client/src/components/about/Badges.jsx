import { useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';

import './about.css'
import './Badges.css'

function Badges() {

    const [showModal, setShowModal] = useState(false); // estado para controlar si se muestra o no el modal
    const [selectedBadge, setSelectedBadge] = useState({}); // estado para almacenar la información del badge seleccionado

    const toggleModal = (badge) => { // función que se encarga de abrir/cerrar el modal y establecer el badge seleccionado
        setSelectedBadge(badge);
        setShowModal(!showModal);
    };

    const badges = [
        {
            id: 1,
            nombre: 'asertividad',
            foto: 'asertividad.png',
            descripcion: 'Capacidad para expresarse y defender los propios derechos sin vulnerar los de los demás.'
        },
        {
            id: 2,
            nombre: 'asistencia',
            foto: 'asistencia.png',
            descripcion: 'Capacidad para proporcionar una presencia activa regular y sostenida'
        },
        {
            id: 3,
            nombre: 'comunicación',
            foto: 'comunicacion.png',
            descripcion: 'La capacidad de relacionarse con los demás, de transmitir un mensaje a alguien de un modo adecuado a la persona y a la circunstancias'
        },
        {
            id: 4,
            nombre: 'fiabilidad',
            foto: 'fiabilidad.png',
            descripcion: 'Capacidad para inspirar confianza en los demás a través de las acciones'
        },
        {
            id: 5,
            nombre: 'adaptabilidad',
            foto: 'adaptabilidad.png',
            descripcion: 'Capacidad para aceptar e integrar los cambios y adaptarse a ellos a las personas y al medio ambiente de forma positiva'
        },
        {
            id: 6,
            nombre: 'asertividad',
            foto: 'asertividad.png',
            descripcion: 'Capacidad para expresarse y defender los propios derechos sin vulnerar los de los demás.'
        },
        {
            id: 7,
            nombre: 'asistencia',
            foto: 'asistencia.png',
            descripcion: 'Capacidad para proporcionar una presencia activa regular y sostenida'
        },
        {
            id: 8,
            nombre: 'comunicación',
            foto: 'comunicacion.png',
            descripcion: 'La capacidad de relacionarse con los demás, de transmitir un mensaje a alguien de un modo adecuado a la persona y a la circunstancias'
        },
        {
            id: 9,
            nombre: 'fiabilidad',
            foto: 'fiabilidad.png',
            descripcion: 'Capacidad para inspirar confianza en los demás a través de las acciones'
        },
        {
            id: 10,
            nombre: 'adaptabilidad',
            foto: 'adaptabilidad.png',
            descripcion: 'Capacidad para aceptar e integrar los cambios y adaptarse a ellos a las personas y al medio ambiente de forma positiva'
        }
    ];

    // const badgesCards = badges.map((item, idx) => {
    //     return (
    //         <Card id={idx} bg="light" className="badges" style={{ width: '18rem' }}>
    //             <Card.Img variant="top" src="https://placekitten.com/200/300" />
    //             <Card.Body>
    //                 <Card.Title>{item.nombre}</Card.Title>
    //                 {/* <Card.Text>{item.descripcion}</Card.Text> */}
    //                 <Button variant="primary">+ info</Button>
    //             </Card.Body>
    //         </Card>
    //     )
    // });

    // return (
    //     <>
    //         <h1 className='titleAboutB'>Our Badges</h1>
    //         <div className='infoAboutB'>
    //             <p>Alongside the services we provide, we offer various badges upon the completion of the workshops and therapy services. Here is a list of our badges:</p>
    //         </div>
    //         <div className="bCards">
    //             {badgesCards}
    //         </div>
    //     </>
    // )


    const badgesCards = badges.map((item) => {
        return (
            <Card
                key={item.id}
                bg="light"
                className="badges"
                style={{ width: '18rem' }}
            >
                <Card.Img variant="top" src="https://placekitten.com/300/300" />
                <Card.Body>
                    <Card.Title>{item.nombre}</Card.Title>
                    <Button variant="primary" onClick={() => toggleModal(item)}>
                        + info
                    </Button>
                </Card.Body>
            </Card>
        );
    });

    return (
        <>
            <h1 className="titleAboutB">Our Badges</h1>
            <div className="infoAboutB">
                <p>
                    Alongside the services we provide, we offer various badges upon the
                    completion of the workshops and therapy services. Here is a list of
                    our badges:
                </p>
            </div>
            <div className="bCards">{badgesCards}</div>

            {/* Componente Modal de Bootstrap */}
            <Modal show={showModal} onHide={() => toggleModal({})}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedBadge.nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img
                        // src={`ruta-a-la-imagen/${selectedBadge.foto}`}
                        src={"https://placekitten.com/100/100"}
                        alt={selectedBadge.nombre}
                    />
                    <p>{selectedBadge.descripcion}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => toggleModal({})}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default Badges;
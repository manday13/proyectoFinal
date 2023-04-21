
import "./Support.css"
import { useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';

function Support() {
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
        }
        
    ];


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
            <h1 className='titleAboutS'>Our Support</h1>
            <div className='infoAbout'>
                <p>The role of a tutor in the organization where formerly incarcerated women participate in workshops to develop specific skills involves providing guidance and support to these women throughout their training. The tutor's primary responsibility is to help these women acquire the skills they need to succeed in their chosen field, whether it is through providing individualized coaching or facilitating group learning activities.

In addition, the tutor is responsible for assessing the progress of the participants and creating reports that highlight their strengths and areas for improvement. These reports can be used by the women as recommendations when seeking employment or applying for further training opportunities.

Overall, the tutor plays a crucial role in helping formerly incarcerated women develop their skills, gain confidence, and successfully transition into the workforce..</p>
                <p>Among all the different skills that we think that are needed at work, we have selected which we think that are essencial to have. If you achieve all of these skills, we will give you a verification that you have worked and succeed all the essential skills to be prepared to work. These skills are: </p>


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
    )

}

export default Support;
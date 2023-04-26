import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown, Container, Row, Col, Card } from 'react-bootstrap';

import './Services.css'

function Services() {

    const [date, setDate] = useState('');
    const [serviceType, setServiceType] = useState(0);
    const [workshopType, setWorkshopType] = useState(0);
    const [dades, setDades] = useState([]);
    const [dadesSeg, setDadesSeg] = useState([]);
    const [error, setError] = useState("");
    const [dis, setDis] = useState(false);

    //carga los datos iniciales
    useEffect(() => {
        loadData();
    }, [])

    //para poder des/habilitar el workshopType
    useEffect(() => {
        if (serviceType === 1) {
            setDis(true);
        } else {
            setDis(false);
        }
    }, [serviceType])

    // FUNCION PARA CARGAR LOS DATOS
    function loadData() {
        fetch("http://localhost:5000/api/services")
            .then(resultat => resultat.json())
            .then(retornat => {
                if (retornat.ok === true) {
                    setDades(retornat.data);
                    setDadesSeg(retornat.data);
                } else {
                    setError(retornat.error)
                }
            })
            .catch(error => setError(error))
    }

    // FUNCIONES PARA CAMBIAR LA INFO EN LOS SELECTORES DEL FILTER
    function EventTypeDisplay({ serviceType }) {
        const eventTypeOptions = ['Select Event Type', 'Group therapy', 'Workshop'];

        return <span>{eventTypeOptions[serviceType]}</span>;
    }
    function WorkshopTypeDisplay({ workshopType }) {
        const eventTypeOptions = ['Select Workshop Type', 'Painting', 'Sculpture', 'Kungfu', 'Ceramic'];

        return <span>{eventTypeOptions[workshopType]}</span>;
    }

    // FUNCION PARA MAPEAR Y MOSTRAR LAS CARDS DE LOS CURSOS
    const handleWorkshops = dades.map((el, i) => (
        <Card id='worksCard' key={i} style={{ width: '18rem' }}>
            <Card.Img id='imgCard' variant="top" src="https://placekitten.com/300/150" />
            <Card.Body>
                <Card.Title>{el.name}</Card.Title>
                <Card.Text id='descript'>{el.description}</Card.Text>
                <Card.Text>Fecha: {el.date}</Card.Text>
                <Button variant="primary">Más información</Button>
            </Card.Body>
        </Card>
    ));

    // FUNCION PARA FILTRAR LOS CURSOS CON LAS CONDICIONES DEL FILTER-NAV
    const handleFilter = () => {
        let datosFiltrados = dadesSeg;
        if (serviceType !== 0) {
            datosFiltrados = datosFiltrados.filter((dato) => dato.type === serviceType);
        }
        if (workshopType !== 0) {
            datosFiltrados = datosFiltrados.filter((dato) => dato.work_type === workshopType);
        }
        if (date !== "") {
            datosFiltrados = datosFiltrados.filter((dato) => dato.date === date);
        }

        setDades(datosFiltrados);
    };

    //resetea los filtros
    const handleDeleteFilter = () => {
        setDate("");
        setServiceType(0);
        setWorkshopType(0);
    };


    return (
        <>
            <div id='filter-nav' >
                <Container fluid>
                    <Row>
                        <Form id='filtraje'>
                            <Col md={3} className='filters'>
                                <Form.Group>
                                    <Form.Control id='dates' type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md={3} className='filters'>
                                <Form.Group>
                                    <Dropdown id='drop'>
                                        <Dropdown.Toggle variant="primary" id="dropdownEventType">
                                            <EventTypeDisplay serviceType={serviceType} />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => setServiceType(1)}>Group therapy</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setServiceType(2)}>Workshop</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>
                            </Col>
                            <Col md={3} className='filters'>
                                <Form.Group>
                                    <Dropdown id='drop'>
                                        <Dropdown.Toggle variant="primary" id="dropdownEventType" disabled={dis}>
                                            <WorkshopTypeDisplay workshopType={workshopType} />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => setWorkshopType(1)}>Painting</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setWorkshopType(2)}>Sculpture</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setWorkshopType(3)}>Kungfu</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setWorkshopType(4)}>Ceramic</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>
                            </Col>
                            <Col md={3} className='filters'>
                                <Button variant="primary" onClick={handleFilter}>Filter</Button>
                                <Button variant="danger" onClick={handleDeleteFilter}>Borrar filtros</Button>
                            </Col>
                        </Form>
                    </Row>
                </Container>
            </div>
            <div id='services'>
                {handleWorkshops}
            </div>
        </>
    );
}

export default Services;
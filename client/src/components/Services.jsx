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

    useEffect(() => {
        loadData();
        // setDadesSeg(dades);
    }, [])

    // useEffect(() => {
    //     loadData();
    // }, [date, serviceType, workshopType])

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

    // async function loadData() {
    //     try {
    //         const resultat = await fetch("http://localhost:5000/api/services");
    //         const retornat = await resultat.json();
    //         if (retornat.ok === true) {
    //             setDades(retornat.data);
    //         } else {
    //             setError(retornat.error);
    //         }
    //     } catch (error) {
    //         return setError(error);
    //     }
    // }

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
        // <Col key={i}>
        <Card id='worksCard' key={i} style={{ width: '18rem' }}>
            <Card.Img id='imgCard' variant="top" src="https://placekitten.com/300/150" />
            <Card.Body>
                <Card.Title>{el.name}</Card.Title>
                <Card.Text id='descript'>{el.description}</Card.Text>
                <Card.Text>Fecha: {el.date}</Card.Text>
                <Button variant="primary">Más información</Button>
            </Card.Body>
        </Card>
        // </Col>
    ));

    // FUNCION PARA FILTRAR LOS CURSOS CON LAS CONDICIONES DEL FILTER-NAV
    const handleFilter = () => {
        if (dadesSeg !== dades) {
            console.log("hola");
            setDades(null);
            console.log("adios");
            setDades(dadesSeg);
        }
        let datosFiltrados;
        if (serviceType !== 0) {
            datosFiltrados = dades.filter((dato) => dato.type === serviceType);
        }
        if (workshopType !== 0) {
            datosFiltrados = dades.filter((dato) => dato.work_type === workshopType);
        }
        if (date !== "") {
            datosFiltrados = dades.filter((dato) => dato.date === date);
        }

        setDades(datosFiltrados);
    };
    console.log(dades)
    console.log(dadesSeg)
    console.log(dades === dadesSeg)
    const handleButtonClick = (event) => {
        if (disabled) {
            event.preventDefault();
            event.stopPropagation();
        }
        // para que funcione hay que generar otra propiedad en el dropdown.toggle que se llame disabled y luego esta onClick={handleButtonClick} para
        //referenciar esta funcion
    }


    return (
        <>
            <div id='filter-nav' >
                <Container fluid>
                    <Row>
                        <Form id='filtraje'>
                            <Col md={3} id='filters'>
                                <Form.Group>
                                    <Form.Control id='dates' type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md={3} id='filters'>
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
                            <Col md={3} id='filters'>
                                {/* <fieldset disabled> */}
                                <Form.Group>
                                    <Dropdown id='drop'>
                                        <Dropdown.Toggle variant="primary" id="dropdownEventType">
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
                                {/* </fieldset> */}
                            </Col>
                            <Col md={3} id='filters'>
                                <Button variant="primary" onClick={handleFilter}>Filter</Button>
                            </Col>
                        </Form>
                    </Row>
                </Container>
            </div>
            <div id='services'>
                {handleWorkshops}
                {/* <Container>
                    <Row>{handleWorkshops}</Row>
                </Container> */}
            </div>
        </>
    );
}

export default Services;
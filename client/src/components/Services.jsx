import React, { useState } from 'react';
import { Form, Button, Dropdown, Container, Row, Col, Card } from 'react-bootstrap';

import './Services.css'

function Services() {

    const workshops = [
        {
            name: "taller de pintura",
            description: "taller de pintura para trabajar la comunicación",
            date: "2023-05-10",
            time: "16:00:00",
            type: 1,
        },
        {
            name: "taller de escultura",
            description: "taller de escultura para trabajar la asertividad",
            date: "2023-06-13",
            time: "17:00:00",
            type: 1,
        },
        {
            name: "taller de kungfu",
            description: "taller de kungfu para trabajar la fiabilidad",
            date: "2023-05-03",
            time: "19:00:00",
            type: 1,
        },
        {
            name: "grupo de terapia",
            description: "terapia grupal de tarde",
            date: "2023-04-22",
            time: "16:00:00",
            type: 0,
        },
        {
            name: "taller de cerámica",
            description: "taller de cerámica para trabajar la adaptabilidad",
            date: "2023-07-17",
            time: "20:00:00",
            type: 1,
        },
        {
            name: "taller de pintura",
            description: "taller de pintura para trabajar la comunicación",
            date: "2023-05-10",
            time: "16:00:00",
            type: 1,
        },
        {
            name: "taller de escultura",
            description: "taller de escultura para trabajar la asertividad",
            date: "2023-06-13",
            time: "17:00:00",
            type: 1,
        },
        {
            name: "taller de kungfu",
            description: "taller de kungfu para trabajar la fiabilidad",
            date: "2023-05-03",
            time: "19:00:00",
            type: 1,
        },
        {
            name: "grupo de terapia",
            description: "terapia grupal de tarde",
            date: "2023-04-22",
            time: "16:00:00",
            type: 0,
        },
        {
            name: "taller de cerámica",
            description: "taller de cerámica para trabajar la adaptabilidad",
            date: "2023-07-17",
            time: "20:00:00",
            type: 1,
        },
        {
            name: "taller de pintura",
            description: "taller de pintura para trabajar la comunicación",
            date: "2023-05-10",
            time: "16:00:00",
            type: 1,
        },
        {
            name: "taller de escultura",
            description: "taller de escultura para trabajar la asertividad",
            date: "2023-06-13",
            time: "17:00:00",
            type: 1,
        },
        {
            name: "taller de kungfu",
            description: "taller de kungfu para trabajar la fiabilidad",
            date: "2023-05-03",
            time: "19:00:00",
            type: 1,
        },
        {
            name: "grupo de terapia",
            description: "terapia grupal de tarde",
            date: "2023-04-22",
            time: "16:00:00",
            type: 0,
        },
        {
            name: "taller de cerámica",
            description: "taller de cerámica para trabajar la adaptabilidad",
            date: "2023-07-17",
            time: "20:00:00",
            type: 1,
        },
    ];

    const [date, setDate] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [workshopType, setWorkshopType] = useState('');

    const handleFilter = () => {
        // Lógica para filtrar los eventos según los valores seleccionados
    };

    const handleWorkshops = workshops.map((el, i) => (
        <Col md={3} key={i}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://placekitten.com/200/300" />
                <Card.Body>
                    <Card.Title>{el.name}</Card.Title>
                    <Card.Text id='descript'>{el.description}</Card.Text>
                    <Card.Text>Fecha: {el.date}</Card.Text>
                    <Button variant="primary">Más información</Button>
                </Card.Body>
            </Card>
        </Col>
    ));
    return (
        <>
            <div id='filter-nav' >
                <Container fluid>
                    <Row>
                        <Form id='filtraje'>
                            <Col md={3} id='filters'>
                                <Form.Group controlId="formDate">
                                    {/* <Form.Label>Date:</Form.Label> */}
                                    <Form.Control id='dates' type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md={3} id='filters'>
                                <Form.Group controlId="formEventType">
                                    {/* <Form.Label>Service type:</Form.Label> */}
                                    <Dropdown id='drop'>
                                        <Dropdown.Toggle variant="primary" id="dropdownEventType">
                                            {serviceType ? serviceType : 'Select Event Type'}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => setServiceType('therapy')}>Group therapy</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setServiceType('workshop')}>Workshop</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>
                            </Col>
                            <Col md={3} id='filters'>
                                <Form.Group controlId="formEventType">
                                    {/* <Form.Label>Workshop type:</Form.Label> */}
                                    <Dropdown id='drop'>
                                        <Dropdown.Toggle variant="primary" id="dropdownEventType">
                                            {workshopType ? workshopType : 'Select Event Type'}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => setWorkshopType('painting')}>Painting</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setWorkshopType('yoga')}>Yoga</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setWorkshopType('ceramic')}>Ceramic</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setWorkshopType('kungfu')}>Kungfu</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>
                            </Col>
                            <Col md={3} id='filters'>
                                <Button variant="primary" onClick={handleFilter}>Filter</Button>
                            </Col>
                        </Form>
                    </Row>
                </Container>
            </div>
            <div id='services'>
                <Container>
                    <Row>{handleWorkshops}</Row>
                </Container>
            </div>
        </>
    );
}

export default Services;
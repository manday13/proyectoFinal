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
            type: 2,
        },
        {
            name: "taller de kungfu",
            description: "taller de kungfu para trabajar la fiabilidad",
            date: "2023-05-03",
            time: "19:00:00",
            type: 3,
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
            type: 4,
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
            type: 2,
        },
        {
            name: "taller de kungfu",
            description: "taller de kungfu para trabajar la fiabilidad",
            date: "2023-05-03",
            time: "19:00:00",
            type: 3,
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
            type: 4,
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
            type: 2,
        },
        {
            name: "taller de kungfu",
            description: "taller de kungfu para trabajar la fiabilidad",
            date: "2023-05-03",
            time: "19:00:00",
            type: 3,
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
            type: 4,
        },
    ];

    const [date, setDate] = useState('');
    const [serviceType, setServiceType] = useState(0);
    const [workshopType, setWorkshopType] = useState(0);

    function EventTypeDisplay({ serviceType }) {
        const eventTypeOptions = ['Select Event Type', 'Group therapy', 'Workshop'];

        return <span>{eventTypeOptions[serviceType]}</span>;
    }
    function WorkshopTypeDisplay({ workshopType }) {
        const eventTypeOptions = ['Select Workshop Type', 'Painting', 'Sculpture', 'Kungfu', 'Ceramic'];

        return <span>{eventTypeOptions[workshopType]}</span>;
    }

    const handleWorkshops = workshops.map((el, i) => (
        // <Col key={i}>
        <Card id='works' style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://placekitten.com/200/300" />
            <Card.Body>
                <Card.Title>{el.name}</Card.Title>
                <Card.Text id='descript'>{el.description}</Card.Text>
                <Card.Text>Fecha: {el.date}</Card.Text>
                <Button variant="primary">Más información</Button>
            </Card.Body>
        </Card>
        // </Col>
    ));

    const handleFilter = () => {

    };
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
                                            {/* {serviceType ? serviceType : 'Select Event Type'} */}
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
                                <fieldset disabled>
                                    <Form.Group controlId="formEventType">
                                        {/* <Form.Label>Workshop type:</Form.Label> */}
                                        <Dropdown id='drop'>
                                            <Dropdown.Toggle variant="primary" id="dropdownEventType">
                                                {/* {workshopType ? workshopType : 'Select Event Type'} */}
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
                                </fieldset>
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
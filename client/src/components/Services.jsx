import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown, Container, Row, Col, Card, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { Route } from 'react-router-dom';


import './Services.css'

function Services() {

    const [serviceType, setServiceType] = useState(0);
    const [workshopType, setWorkshopType] = useState(0);
    const [dades, setDades] = useState([]);
    const [dadesSeg, setDadesSeg] = useState([]);
    const [error, setError] = useState("");
    const [dis, setDis] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    //carga los datos iniciales
    useEffect(() => {
        loadData();
    }, [])

    //para poder des/habilitar el workshopType
    useEffect(() => {
        if (serviceType === 1) {
            setDis(true);
            setWorkshopType(0);
        } else {
            setDis(false);
        }
    }, [serviceType])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
    // const handleWorkshops = dades.map((el, i) => (
    //     <Card id='worksCard' key={i} style={{ width: '18rem' }}>
    //         <Card.Img id='imgCard' variant="top" src="https://placekitten.com/300/150" />
    //         <Card.Body>
    //             <Card.Title>{el.name}</Card.Title>
    //             <Card.Text id='descript'>{el.description}</Card.Text>
    //             <Card.Text>Fecha: {el.date}</Card.Text>
    //             <Button variant="primary"><Link to={`/IndService/${el.id}`}>Más información</Link></Button>
    //         </Card.Body>
    //     </Card >
    // ));

    const handleWorkshops = dades.map((el, i) => (
        <Link className="card-ind-service" to={`/IndService/${el.id}`}>
            <Card id='worksCard' key={i} style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title id='titleCard'>{el.name}</Card.Title>
                </Card.Body>
                <Card.Img id='imgCard' variant="top" src="https://placekitten.com/300/150" />
                <Card.Body>
                    <Card.Text id='descript'>{el.description}</Card.Text>
                    <Card.Text>Fecha: {el.date}</Card.Text>
                    <Button variant="primary" className='mas-info-service-button'><Link to={`/IndService/${el.id}`}>Más información</Link></Button>
                </Card.Body>
            </Card >
        </Link>
    ));

    const handleSelect = (dato) => {
        setStartDate(dato.selection.startDate);
        setEndDate(dato.selection.endDate);
/*         setShowCalendar(false);
 */    };
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
    }
    // FUNCION PARA LOS CURSOS CON LAS CONDICIONES DEL FILTER-NAV
    const handleFilter = () => {
        let datosFiltrados = dadesSeg;
        if (serviceType !== 0) {
            datosFiltrados = datosFiltrados.filter((dato) => dato.serviceType === serviceType);
        }
        if (workshopType !== 0) {
            datosFiltrados = datosFiltrados.filter((dato) => dato.work_type === workshopType);
        }
        if (startDate !== "" && endDate !== "") {
            datosFiltrados = datosFiltrados.filter((dato) => (new Date(dato.date) >= startDate && new Date(dato.date) <= endDate));
        }

        setDades(datosFiltrados);
    };




    //resetea los filtros
    const handleDeleteFilter = () => {
        setStartDate(new Date());
        setEndDate(new Date());
        setServiceType(0);
        setWorkshopType(0);
        loadData();
    };



    return (
        <div className='cuerpo-services'>

            <div className="botonFiltros">
                <Button variant="primary" onClick={handleShow}>FILTERS</Button>
            </div>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>FILTERS</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div id='filter-nav' >
                        <Container fluid>
                            <Row>
                                <Form id='filtraje'>
                                    <Col md={3} className='filters'>
                                        <Form.Group>
                                            {/* <br />
                                            <h3 className='filter-p'>Filter by</h3>
                                            <br /> */}
                                            <DateRangePicker
                                                ranges={[selectionRange]}
                                                staticRanges={[]}
                                                onChange={handleSelect} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3} className='filters'>
                                        <Form.Group>
                                            <Dropdown id='drop' >
                                                <Dropdown.Toggle className='filter-components' id="dropdownEventType">
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
                                            <Dropdown id='drop' >
                                                <Dropdown.Toggle className='filter-components' id="dropdownEventType" disabled={dis}>
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
                                        <Button className='filter-button' onClick={handleFilter}>Filter</Button>
                                        <Button className='delete-filter-button' onClick={handleDeleteFilter}>Borrar filtros</Button>
                                    </Col>
                                </Form>
                            </Row>
                        </Container>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

            {/* <div id='filter-nav' >
                <Container fluid>
                    <Row>
                        <Form id='filtraje'>
                            <Col md={3} className='filters'>
                                <Form.Group>
                                    <br />
                                    <h3 className='filter-p'>Filter by</h3>
                                    <br />
                                    <DateRangePicker
                                        ranges={[selectionRange]}
                                        staticRanges={[]}
                                        onChange={handleSelect} />
                                </Form.Group>
                            </Col>
                            <Col md={3} className='filters'>
                                <Form.Group>
                                    <Dropdown id='drop' >
                                        <Dropdown.Toggle className='filter-components' id="dropdownEventType">
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
                                    <Dropdown id='drop' >
                                        <Dropdown.Toggle className='filter-components' id="dropdownEventType" disabled={dis}>
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
                                <Button className='filter-button' onClick={handleFilter}>Filter</Button>
                                <Button className='delete-filter-button' onClick={handleDeleteFilter}>Borrar filtros</Button>
                            </Col>
                        </Form>
                    </Row>
                </Container>
            </div> */}
            <div className='card-shower'>
                {dades.length ?
                    <div id='services'>
                        {handleWorkshops}
                    </div>

                    : <h3 className="noWorkshop">Sorry, there are no workshops that match your criteria right now.</h3>}

            </div>
        </div>
    );
}


export default Services;
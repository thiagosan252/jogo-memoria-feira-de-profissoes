import React from 'react';

import {
    Col,
    Container,
    Row,
    Button
}
    from 'reactstrap';

import './Home.css';

function Home({ history }) {

    return (
        <Container fluid className="h-100">
            <Row className="d-flex justify-content-center align-itens-center h-100">
                <Col className="align-self-center text-center">
                    <h5 className="text-light text-wrap">Este jogo foi desenvolvido para o
                     curso de Nutrição da Universidade Estadual de Londrina.</h5>
                    <Button color="primary" size="lg" onClick={() => history.push('/jogar')}>Iniciar o Jogo</Button>
                </Col>
            </Row>
        </Container>

    )
}

export default Home;
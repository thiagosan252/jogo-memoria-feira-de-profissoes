import React from 'react';
import {
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
                <div className="col align-self-center text-center">
                    <img className="img-fluid" src={process.env.PUBLIC_URL + '/images/home/logo.jpeg'} alt="Logo do curso de Nutrição" height="300" width="300" />
                    <div className="py-4">
                        <p className="h1 text-dark">Feira de Profissões UEL - 2021</p>
                        <p className="h5 text-muted">Jogo da Memória</p>
                    </div>
                    <Button className="btn-shadow" color="secondary" size="lg" onClick={() => history.push('/jogo')}>Iniciar o Jogo</Button>
                </div>
            </Row>
        </Container >

    )
}

export default Home;
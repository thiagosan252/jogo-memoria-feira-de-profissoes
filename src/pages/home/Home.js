import React, { useState } from 'react';

import {
    Col,
    Container,
    Row,
    Button,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
}
    from 'reactstrap';

import './Home.css';

const items = [
    {
        id: 1,
        src: 'images/home/Banner_Hist.png',
        caption: 'Este jogo foi desenvolvido para o curso de Nutrição da Universidade Estadual de Londrina.',
        captionHeader: 'Mileny Mantovani Martins',
        altText: 'Histologia'
    },
    {
        id: 2,
        src: 'images/home/time.jpg',
        caption: 'Durante a partida vocês irão adquirir conhecimento, porém o menor tempo fará com que esteja entre os melhores...',
        captionHeader: '',
        altText: 'Competição'
    }
];

function Home({ history }) {

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides = items.map((item) => {
        return (
            <CarouselItem
                className="custom-tag"
                tag="div"
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.id}
            >
                <img className="d-block w-100 h-100" src={item.src} alt={item.altText} />
                <CarouselCaption className="d-block" captionText={item.caption} captionHeader={item.captionHeader} />
            </CarouselItem>
        );
    });

    return (
        <Container fluid className="h-100 scrollbar-auto">
            <Row className="d-flex justify-content-center align-itens-center h-100">
                <Col className="align-self-center text-center">
                    <div className="my-3">
                        <Carousel
                            activeIndex={activeIndex}
                            next={next}
                            previous={previous}
                        >
                            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                            {slides}
                            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                        </Carousel>
                    </div>
                    <Button className="btn-shadow" color="primary" size="lg" onClick={() => history.push('/jogar')}>Iniciar o Jogo</Button>
                </Col>
            </Row>
        </Container >

    )
}

export default Home;
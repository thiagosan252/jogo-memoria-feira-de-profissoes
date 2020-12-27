import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardImg,
  Spinner
}
  from 'reactstrap';

import './Game.css';

import cards from '../../assets/cards.json';

import svgDefault from '../../assets/img/download.svg';
import svgDefault1 from '../../assets/img/download1.svg';

import timeout from '../../utils/delay';


function App() {

  const [currentTime, setCurrentTime] = useState(15);
  const [hitsCount, setHitsCount] = useState(0);
  const [errorsCount, setErrosCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [countSelectedCards, setCountSelectedCards] = useState([]);
  const [countMatchingCards, setCountMatchingCards] = useState([]);

  /*eslint no-unused-vars:*/
  var contador = 0;
  var count = 16;
  var listCards;

  const start = () => {
    if ((count - 1) >= 0) {
      count = count - 1;
      contador = setTimeout(start, 1000);
      setCurrentTime(count);
      setIsDisabled(true);
    } else {
      reset(undefined, undefined, false)
      setIsDisabled(false);
      setCurrentTime(15);
    }
  };

  const reset = (valueOne, valueTwo, flip) => {
    if (valueOne !== undefined && valueTwo !== undefined) {
      setHitsCount(valueOne);
      setErrosCount(valueTwo);
      setCountSelectedCards([]);
      setCountMatchingCards([]);
    }
    cards.forEach((c) => c.flipped = flip);
  }

  const handleClick = (item) => {
    let cardsEquals = countMatchingCards.find((c) => c.nome === item.nome);
    if (cardsEquals === undefined) {
      verify(item);
    }
  }

  async function verify(cardItem) {
    if (countSelectedCards.length < 2) {
      cardItem.flipped = !cardItem.flipped;
      setCountSelectedCards([...countSelectedCards, cardItem]);
    }

    if (countSelectedCards.length === 1) {
      if (countSelectedCards.find((c) => c.id !== cardItem.id)) {

        if (countSelectedCards.find((c) => c.nome === cardItem.nome)) {
          let lista = cards.filter((c) => c.flipped === true);
          setCountMatchingCards(lista);

          await timeout(700); //for 0.7 sec delay
          setCountSelectedCards([]);
          setHitsCount(hitsCount + 1)

        } else {

          await timeout(700); //for 0.7 sec delay
          cardItem.flipped = !cardItem.flipped;
          countSelectedCards.forEach((c) => c.flipped = false);
          setCountSelectedCards([]);
          setErrosCount(errorsCount + 1)
        }
      } else {
        cardItem.flipped = !cardItem.flipped;
        countSelectedCards.forEach((c) => c.flipped = false);
        setCountSelectedCards([]);

      }
    }
  }

  const fillContent = () => {
    listCards = cards.map((card) => <ReactCardFlip key={card.id} isFlipped={card.flipped ? card.flipped : false} flipDirection="horizontal">
      <Col className="col-auto mb-1 p-1">
        <Card className="border-0">
          <CardImg src={svgDefault} onClick={() => handleClick(card)} />
        </Card>
      </Col>
      <Col className="col-auto mb-1 p-1">
        <Card className="border-0">
          <CardImg src={svgDefault1} onClick={() => handleClick(card)} />
        </Card>
      </Col>
    </ReactCardFlip>
    );
  };

  return (
    <>
      {fillContent()}
      <Container fluid>
        <Row className="d-flex justify-content-center align-items-center m-3 h-100">
          <Col className="d-flex justify-content-start">
            <div className="txt-status">
              <span className="txt-dark txt-bold">Tempo:</span>{" "}
              <span className="txt-dark">{currentTime}s</span>
            </div>
          </Col>
          <Col className="d-flex justify-content-end">
            <div className="txt-status">
              <span className="txt-status-success txt-bold">Acertos:</span>{" "}
              <span className="txt-dark">{hitsCount}</span>
            </div>
          </Col>
          <Col className="d-flex justify-content-start">
            <div className="txt-status">
              <span className="txt-status-danger txt-bold">Erros:</span>{" "}
              <span className="txt-dark">{errorsCount}</span>
            </div>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button color="primary" disabled={isDisabled} onClick={() => { start(); reset(0, 0, true); }}>
              Novo Jogo{" "}
              {isDisabled ?
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                :
                null
              }</Button>
          </Col>
        </Row>

        <Row className="justify-content-center">
          {listCards}
        </Row>
      </Container >
    </>
  );
}

export default App;

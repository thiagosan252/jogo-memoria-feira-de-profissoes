import React, { useEffect, useState } from 'react';
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

import { timeout, shuffleArray } from '../../utils/utils';


function App() {

  const [cardsFinal, setCardsFinal] = useState([]);
  const [currentTime, setCurrentTime] = useState(10);
  const [hitsCount, setHitsCount] = useState(0);
  const [errorsCount, setErrosCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [countSelectedCards, setCountSelectedCards] = useState([]);
  const [countMatchingCards, setCountMatchingCards] = useState([]);
  const [newGame, setNewGame] = useState();
  const [cursor, setCursor] = useState("auto");

  const reset = () => {
    setHitsCount(0);
    setErrosCount(0);
    setCountSelectedCards([]);
    setCountMatchingCards([]);
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

  useEffect(() => {

    setIsDisabled(true);
    cards.forEach((c) => c.flipped = true);
    setCardsFinal(shuffleArray(cards));
    setCursor("auto");
    
    let count = 11;

    const start = () => {
      if ((count - 1) >= 0) {
        count = count - 1;
        setTimeout(start, 1000);
        setCurrentTime(count);
      } else {
        cards.forEach((c) => c.flipped = false);
        setIsDisabled(false);
        setCursor("pointer");
        setCurrentTime(10);
      }
    };

    start();
  }, [newGame]);

  return (
    <>
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
            <Button color="primary" disabled={isDisabled} onClick={() => { reset(); setNewGame(Math.floor(Math.random() * (10000 - 1)) + 1) }}>
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
          {cardsFinal.map((card) => {
            return (
              <ReactCardFlip key={card.id} isFlipped={card.flipped ? card.flipped : false} flipDirection="horizontal">
                <Col className="col-auto mb-1 p-1">
                  <Card className="border-0" style={{ cursor: `${cursor}` }}>
                    <CardImg src={svgDefault} onClick={() => !isDisabled ? handleClick(card) : undefined} />
                  </Card>
                </Col>
                <Col className="col-auto mb-1 p-1">
                  <Card className="border-0" style={{ cursor: `${cursor}` }}>
                    <CardImg src={svgDefault1} onClick={() => !isDisabled ? handleClick(card) : undefined} />
                  </Card>
                </Col>
              </ReactCardFlip>
            )
          })}
        </Row>
      </Container >
    </>
  );
}

export default App;

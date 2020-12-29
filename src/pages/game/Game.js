import React, { useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';

import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  Spinner
}
  from 'reactstrap';

import './Game.css';
import ModalComponent from '../../components/modal/Modal';

import cards from '../../assets/cards.json';

import svgDefault from '../../assets/img/download.svg';

import { timeout, shuffleArray } from '../../utils/utils';


function App() {

  // Modal variables
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [cardsFinal, setCardsFinal] = useState([]);
  const [currentTime, setCurrentTime] = useState(10);
  const [hitsCount, setHitsCount] = useState(0);
  const [errorsCount, setErrosCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
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

      if (countSelectedCards.find((c) => c.id === cardItem.id)) {
        return null;

      } else {
        cardItem.flipped = !cardItem.flipped;
        setCountSelectedCards([...countSelectedCards, cardItem]);
      }

    }

    if (countSelectedCards.length === 1) {
      if (countSelectedCards.find((c) => c.id !== cardItem.id)) {

        if (countSelectedCards.find((c) => c.nome === cardItem.nome)) {
          setCountMatchingCards([...countMatchingCards, ...countSelectedCards, cardItem]);

          await timeout(700); //for 0.7 sec delay
          setHitsCount(hitsCount + 1)
          setCountSelectedCards([]);

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

  const novoJogo = () => {
    reset();
    setNewGame(Math.floor(Math.random() * (10000 - 1)) + 1);
    setIsDisabled(true);
  }

  useEffect(() => {

    if (hitsCount > 0) {

      let lastItem = countMatchingCards[countMatchingCards.length - 1];
      setTitle(() => {
        return (
          <span className="badge badge-secondary text-uppercase" style={{ backgroundColor: '#1e1e2f' }}>{`#${hitsCount} ${lastItem.nome}`}</span>
        )
      })
      setText(() => {
        return (
          <>
            <div className="container-fluid">
              <div className="row d-flex justify-content-center align-items-center">
                <p className="text-center text-wrap text-break">
                  <span className="text-muted">{lastItem.descricao}</span>
                </p>
              </div>
            </div>
          </>
        )
      });
      setModal(true);
    }
    // eslint-disable-next-line
  }, [hitsCount]);

  useEffect(() => {

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
      <ModalComponent
        isOpen={modal}
        title={title}
        text={text}
        centered={true}
        backdrop="static"
        className="border-0"
        classNameHeader="justify-content-center border-0"
        colorBtn="success"
        keyboard={false}
        backToGame={() => { setModal(!modal); }}
        toggle={() => { setModal(!modal) }}
      />

      <Container fluid>
        <Row className="d-flex justify-content-center align-items-center m-3 h-100">
          <Col className="d-flex justify-content-start">
            <div className="txt-status">
              <span className="txt-light txt-bold">Tempo:</span>{" "}
              <span className="txt-light">{currentTime}s</span>
            </div>
          </Col>
          <Col className="d-flex justify-content-end">
            <div className="txt-status">
              <span className="txt-status-success txt-bold">Acertos:</span>{" "}
              <span className="txt-light">{hitsCount}</span>
            </div>
          </Col>
          <Col className="d-flex justify-content-start">
            <div className="txt-status">
              <span className="txt-status-danger txt-bold">Erros:</span>{" "}
              <span className="txt-light">{errorsCount}</span>
            </div>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button color="primary" disabled={isDisabled} onClick={() => novoJogo()}>
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
                  <Card inverse className="border-0" style={{ cursor: `${cursor}` }} onClick={() => !isDisabled ? handleClick(card) : undefined}>
                    <CardImg src={svgDefault} width="116.792px" height="116.604px" />
                    <CardImgOverlay style={{ top: '20px', left: '4px' }}>
                      <CardText style={{ transform: 'rotate(330deg)' }}>
                        <small className="txt-light font-weight-bold text-shadow-custom-front text-uppercase">Nutrição</small>
                      </CardText>
                    </CardImgOverlay>
                  </Card>
                </Col>
                <Col className="col-auto mb-1 p-1">
                  <Card inverse className="border-0" style={{ cursor: `${cursor}` }} onClick={() => !isDisabled ? handleClick(card) : undefined}>
                    <CardImg src={`./images/${card.imgSrc}`} />
                    <CardImgOverlay style={{ top: '80px', padding: '.5rem' }}>
                      <CardText className="text-justify text-truncate" style={{ lineBreak: 'anywhere', lineHeight: 'normal' }}>
                        <small className="text-light font-weight-bold text-shadow-custom-back" style={{ fontSize: '10px' }}>{card.nome}</small>
                      </CardText>
                    </CardImgOverlay>
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

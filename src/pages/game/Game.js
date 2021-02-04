import React, { useEffect, useState } from 'react';

import ReactCardFlip from 'react-card-flip';
import swal from '@sweetalert/with-react';
import moment from 'moment';

import {
  Alert,
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

import { timeout, shuffleArray, secondsTohhmmss } from '../../utils/utils';

import cards from '../../assets/cards.json';
import svgDefault from '../../assets/img/download.svg';

moment.suppressDeprecationWarnings = true;

function App() {

  // Alert variables
  const [visible, setVisible] = useState(true);

  // Cards variables
  const [cardsFinal, setCardsFinal] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [hitsCount, setHitsCount] = useState(0);
  const [errorsCount, setErrosCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [countSelectedCards, setCountSelectedCards] = useState([]);
  const [countMatchingCards, setCountMatchingCards] = useState([]);

  // Game variable
  const [isNew, setIsNew] = useState();

  // Timer variables
  const [time, setTime] = useState('');
  const [clock, setClock] = useState(0);
  const [offset, setOffset] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const interval = React.useRef();

  const stopTimer = () => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
  }

  const toggle = (value) => {
    setOffset(Date.now())
    setIsActive(value);
  }

  const updateTimer = () => {
    let clockUpdate = clock + calculateOffset();
    let times = secondsTohhmmss(clockUpdate / 1000);
    setClock(clockUpdate);
    setTime(times);
  }

  const calculateOffset = () => {
    let now = Date.now();
    let newOffset = now - offset;
    setOffset(now);
    return newOffset;
  }

  const resetTimer = () => {
    setClock(0);
    let times = secondsTohhmmss(0 / 1000);
    setTime(times);
  }

  const reset = () => {
    setHitsCount(0);
    setErrosCount(0);
    setCountSelectedCards([]);
    setCountMatchingCards([]);
  }

  const handleClick = (item) => {
    let cardsEquals = countMatchingCards.find((c) => c.nome === item.nome);
    if (cardsEquals === undefined) {
      verifyMatchingCards(item);
    }
  }

  const verifyMatchingCards = async (cardItem) => {
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

  const isNewGame = () => {
    reset();
    setIsNew(Math.floor(Math.random() * (10000 - 1)) + 1);
    setIsDisabled(true);
    resetTimer();
  }

  useEffect(() => {
    if (!localStorage.getItem('shuffle')) {
      localStorage.setItem('shuffle', false);
    }
  }, []);

  useEffect(() => {

    const isLast = () => {

      if (hitsCount === (cards.length / 2)) {
        swal(
          {
            title: "Fim de Jogo!",
            icon: 'success',
            buttons: {
              cancel: "Voltar",
              catch: {
                text: "Novo jogo",
                value: "catch",
              },
            },
            text: `Tempo utilizado: ${time}`,
            closeOnClickOutside: false,
            closeOnEsc: false,

          }).then((value) => {
            switch (value) {

              case "catch":
                isNewGame();
                break;

              default:
                break;
            }
          });
        return;
      }
      toggle(true);
    }

    if (hitsCount > 0) {
      toggle(false);
      let lastItem = countMatchingCards[countMatchingCards.length - 1];

      swal({
        content: (
          <div className="container-fluid">
            <div className="row justify-content-center align-items-center">
              <p className="text-center text-wrap text-break h4">
                <span className="badge badge-secondary text-uppercase" style={{ backgroundColor: '#1e1e2f' }}>
                  {`#${hitsCount} ${lastItem.nome}`}
                </span>
              </p>
            </div>

            <div className="row d-flex justify-content-center align-items-center mt-4">
              <p className="text-justify text-wrap text-break">
                <span className="text-muted">{lastItem.descricao}</span>
              </p>
            </div>
            <div className="row d-flex justify-content-start align-items-start">
              <p className="text-left text-wrap text-break">
                <span className="text-muted font-weight-bold" style={{ fontSize: '12px' }}>TAG:&nbsp;</span>
                <span onClick={() => false} className="badge badge-pill badge-info tag">{lastItem.tag}</span>
              </p>
            </div>
          </div>
        ),
        buttons: {
          cancel: "Entendi",
        }

      }).then(() => {
        isLast();
      });
    }

    // eslint-disable-next-line
  }, [hitsCount]);

  useEffect(() => {

    setSeconds(15);
    setVisible(true)
    cards.forEach((c) => c.flipped = true);

    const shuffle = localStorage.getItem('shuffle') ? JSON.parse(localStorage.getItem('shuffle')) : false;

    if (shuffle) {
      console.log(shuffle)
      setCardsFinal(shuffleArray(cards));
    } else {
      console.log(shuffle)
      setCardsFinal(cards);
    }

    let count = 16;
    let contador;

    const start = () => {
      if ((count - 1) >= 0) {
        count = count - 1;
        contador = setTimeout(start, 1000);
        setSeconds(count);
      } else {
        toggle(true);
        clearInterval(contador);
        cards.forEach((c) => c.flipped = false);
        setIsDisabled(false);
        setVisible(false);
      }
    };

    start();
    // eslint-disable-next-line
  }, [isNew]);

  useEffect(() => {

    if (isActive) {
      interval.current = setInterval(() => { updateTimer(); }, 100);

    } else if (!isActive) {
      stopTimer();
    }
    return () => stopTimer();

    // eslint-disable-next-line
  }, [isActive]);

  return (
    <>

      <div className="alert-fixed">
        <Alert color="primary" isOpen={visible} fade transition={{ in: true, timeout: 150 }}>
          Você possui {seconds} segundos para decorar.
            </Alert>
      </div>

      <Container fluid className="scrollbar-auto">
        <Row className="d-flex align-items-center m-3 h-100">
          <div className="p-0">
            <Button className={isDisabled ? 'disabled' : 'btn-shadow'} color="primary" disabled={isDisabled} onClick={isNewGame}>
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
          </div>
          <div className="ml-auto p-0">
            <form className="form-inline">
              <div className="txt-status">
                <span className="txt-status-success txt-bold">Acertos:</span>{" "}
                <span className="txt-light">{hitsCount}</span>
              </div>
              <div className="ml-2 txt-status">
                <span className="txt-status-danger txt-bold">Erros:</span>{" "}
                <span className="txt-light">{errorsCount}</span>
              </div>
            </form>
          </div>
        </Row>
        <Row className="justify-content-center">
          {cardsFinal.map((card) => {
            return (
              <ReactCardFlip key={card.id} isFlipped={card.flipped ? card.flipped : false} flipDirection="horizontal">
                <Col className="col-auto mb-1 p-1">
                  <Card inverse className={visible ? 'border-0 disabled' : 'border-0 pointer'} onClick={() => !isDisabled ? handleClick(card) : undefined}>
                    <CardImg src={svgDefault} width="116.792px" height="116.604px" />
                    <CardImgOverlay style={{ top: '20px', left: '4px' }}>
                      <CardText style={{ transform: 'rotate(330deg)' }}>
                        <small className="txt-light font-weight-bold text-custom-front text-uppercase">Nutrição</small>
                      </CardText>
                    </CardImgOverlay>
                  </Card>
                </Col>
                <Col className="col-auto mb-1 p-1">
                  <Card inverse className={visible ? 'border-0 disabled' : 'border-0 pointer'} onClick={() => !isDisabled ? handleClick(card) : undefined}>
                    <CardImg src={`./images/${card.imgSrc}`} />
                    <CardImgOverlay style={{ top: '80px', padding: '.5rem' }}>
                      <CardText className="text-justify text-truncate card-text-back">
                        <small className="text-light font-weight-bold text-custom-back">{card.nome}</small>
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

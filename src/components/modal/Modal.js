import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

function ModalComponent(props) {

    const {
        isOpen,
        className,
        classNameHeader,
        toggle,
        backToGame,
        backdrop,
        title,
        text,
        keyboard        
    } = props;

    return (

        <Modal isOpen={isOpen} toggle={toggle} backdrop={backdrop} keyboard={keyboard}>
            <ModalHeader tag={'h4'} className={classNameHeader}>{title}</ModalHeader>
            <ModalBody>{text}</ModalBody>
            <ModalFooter className={className}>
                <Button style={{backgroundColor: '#1e1e2f', borderColor: '#1e1e2f'}} onClick={backToGame}><FontAwesomeIcon icon={faArrowRight} /></Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalComponent;


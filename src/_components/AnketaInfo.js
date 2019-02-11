import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Wizard,Report } from '../_components';
import { TargetSliders } from './Sliders';

export class AnketaInfo extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseCalcRes = this.handleCloseCalcRes.bind(this);
        this.handleShowCalcRes = this.handleShowCalcRes.bind(this);
        this.state = {
            show: false,
            showCalcRes: false,
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleShowCalcRes() {
        this.setState({ showCalcRes: true })
    }

    handleCloseCalcRes() {
        this.setState({ showCalcRes: false })
    }

    render() {
        return (
            <div>               
                <p>Введите данные, а затем постройте план</p>

                <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
                    Ввести данные
          </Button>
                <Button bsStyle="primary" bsSize="large" onClick={this.handleShowCalcRes}>
                    Построить план
          </Button>
                <Modal  bsSize="large" show={this.state.showCalcRes} onHide={this.handleCloseCalcRes}>
                    <Modal.Header closeButton>
                        <Modal.Title>Отчет</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Report />
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ввод данных</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Wizard />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
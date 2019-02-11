import React, { Component } from 'react';
import { render } from 'react-dom';
// import { Tabs, Tab, TabPanel, TabList, TabProvider } from 'react-web-tabs';
import { UserInfoPage, AnketaInfo } from '../_components';
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';

export class HomePage extends Component {
    render() {
        return (
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row className="clearfix">
                    <Col sm={4}>
                        <Nav bsStyle="pills" stacked>
                            <NavItem eventKey="first">Профиль</NavItem>
                            <NavItem eventKey="second">Анкета</NavItem>
                        </Nav>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="first">
                                <UserInfoPage />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <AnketaInfo />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }
}
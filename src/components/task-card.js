import React from "react";
import { Badge, Col, ProgressBar, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { isUndefined , isEmpty} from "../utils/util";

const TaskCard = ({ title, description, createdDate, status, statusMessage, isTaskEmpty}) => {

    function getIconByStatus() {
        if (!isUndefined(statusMessage)) {
            if (statusMessage === 0) {
                return <Badge bg="secondary">To-Do</Badge>
            } else if (statusMessage === 1) {
                return <Badge bg="warning">Progress</Badge>
            } else if (statusMessage === 2) {
                return <Badge bg="success">Completed</Badge>
            } else if (statusMessage === 3) {
                return <Badge bg="danger">Archived</Badge>
            }
        }
    }
    
    return (
        <>
            <Card className="mt-4">
                {
                    !isTaskEmpty ?
                        <Card.Body>
                            <Card.Title>
                                {title} {getIconByStatus()}
                            </Card.Title>
                            {/* <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text> */}
                            {
                                !isEmpty(statusMessage) &&
                                <Row className="mt-4">
                                    <Col><ProgressBar now={!isUndefined(status) ? status : 50} /></Col>
                                </Row>
                            }

                        </Card.Body> :
                        <Card.Body>
                            <Card.Title>
                                No Data to show
                            </Card.Title>
                        </Card.Body>
                }
            </Card>
        </>
    )
}

export default TaskCard;
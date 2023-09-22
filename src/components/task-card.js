import React from "react";
import { Badge, Col, ProgressBar, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { isUndefined, isEmpty } from "../utils/util";
import { MdOutlineClose, MdOutlineEditNote } from "react-icons/md";
import CustomModal from "./modal";
import { useTheme } from "../hooks/useTheme";

const TaskCard = ({ data, isTaskEmpty, onTaskDelete , onTaskUpdate , setSelectedTaskToUpdate}) => {

    let title = !isUndefined(data) ? data.taskName : ''
    let statusMessage = !isUndefined(data) ? parseInt(data.taskStatus) : 0
    let status = !isUndefined(data) ? data.status : ''
    let taskNote = !isUndefined(data) && !isUndefined(data.taskNote) ? data.taskNote : ''

    const themeSwitcherVariant = {
        light: "black",
        dark: "white"
    };

    const { theme, setTheme } = useTheme();
    function getIconByStatus() {
        if (!isUndefined(statusMessage)) {
            if (statusMessage === 0) {
                return <Badge bg="secondary">Todo</Badge>
            } else if (statusMessage === 1) {
                return <Badge bg="warning">Progress</Badge>
            } else if (statusMessage === 2) {
                return <Badge bg="success">Done</Badge>
            } else if (statusMessage === 3) {
                return <Badge bg="danger">Archived</Badge>
            }
        }
    }

    const onDelete = (task) => {
        onTaskDelete(task)
    }

    const onUpdate = (task) => {
        onTaskUpdate(task)
        setSelectedTaskToUpdate(task)
    }

    return (
        <>
            <Card className="mt-4" bg={theme}>
                {
                    !isTaskEmpty ?
                        <Card.Body>
                            <Card.Title style={{color: themeSwitcherVariant[theme]}}>
                                <Row>
                                    <Col md={6} xs={6}>
                                        {title} {getIconByStatus()}
                                    </Col>
                                    <Col md={6} xs={6} align="end">
                                        <MdOutlineEditNote size={25} onClick={() => onUpdate(data)} />
                                        <MdOutlineClose size={25} onClick={() => onDelete(data)} />
                                    </Col>
                                </Row>
                            </Card.Title>
                            <Card.Text style={{color: themeSwitcherVariant[theme]}}>
                                {taskNote}
                            </Card.Text>
                            {
                                !isEmpty(statusMessage) &&
                                <Row className="mt-4">
                                    <Col><ProgressBar now={!isUndefined(status) ? status : 50} /></Col>
                                </Row>
                            }

                        </Card.Body> :
                        <Card.Body style={{ backgroundColor: '#e1e1e1' }}>
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
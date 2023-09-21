import React from "react";
import { Button, ButtonGroup, ButtonToolbar, Col, Container, Row } from "react-bootstrap";
import { MdCheck, MdPending, MdList , MdArchive } from "react-icons/md";

const StatusTabs = () => {
    const statusMenu = [
        {
            id: 1,
            name: 'To-Do',
            icon: <MdList size={25} />
        },
        {
            id: 2,
            name: 'Progress',
            icon: <MdPending size={25} />
        },
        {
            id: 2,
            name: 'Completed',
            icon: <MdCheck size={25} />
        },
        {
            id: 3,
            name: 'Archived',
            icon: <MdArchive size={25} />
        }
    ]
    return (
        <Container style={{textAlign : 'center'}} className="mt-3">
            <ButtonToolbar aria-label="Toolbar with button groups" >
                <ButtonGroup className="me-2" aria-label="First group">
                    {
                        statusMenu.map((statusItem , index) => <Button key={index+1}>{statusItem.icon} {statusItem.name}</Button>)
                    }
                </ButtonGroup>
            </ButtonToolbar>
        </Container>
    )
}

export default StatusTabs;
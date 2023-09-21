import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { connect, useDispatch, useSelector } from "react-redux";
import store from "../store/appStore";
import CustomModal from "./modal";
import { setTasks } from "../store/reduxActions";
import { getTasks, saveTasks } from "../utils/localStorage";

const SearchComponent = ({ onTextSearch , onTaskAdded}) => {
    const [showAddModal , setShowAddModal] = useState(false)
    const toggleAddModal = () => setShowAddModal(!showAddModal)
    const dispatch = useDispatch()
    const savedTasks =  getTasks()

    const onSearch = (e) => {
        onTextSearch(e.target.value);
    }

    function onAdd (e) {
        let tasks = []
        tasks = savedTasks
        tasks.push(e)
        saveTasks(tasks)
        onTaskAdded(tasks)
    }
    return (
       <>
       <CustomModal show={showAddModal} title={'Add Task'} message={'Fill the details to add the task'} handleModalState={toggleAddModal} onSubmit={(e)=>onAdd(e)}/>
        <Container className="mt-3">
            <Row>
                <Col>
                    <Form className="d-flex">
                        <Form.Control type="search" placeholder="Search" className="me-2 rounded-pill" aria-label="Search" onChange={onSearch} />
                        <Button className="rounded-pill" variant="primary" onClick={toggleAddModal}> Add </Button>
                        <Button className="rounded-pill" variant="primary"> Filter </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
       </>

    );
}

export default connect(store=>store)(SearchComponent);
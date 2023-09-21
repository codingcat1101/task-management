import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../store/reduxActions";
import { isEmpty } from "../utils/util";

const CustomModal = ({ show, title, message, handleModalState, onSubmit }) => {

    const [taskName, setTaskName] = useState('')
    const [taskStatus, setTaskStatus] = useState('')

    const onTaskStatusSelection = (e) => {
        setTaskStatus(e.target.value)
    }

    const onTaskNameChange = (e) => {
        setTaskName(e.target.value)
    }

    function onTaskSubmit (){
        if(!isEmpty(taskName) && !isEmpty(taskStatus)){
            let taskDetails = {taskName: taskName, taskStatus: taskStatus , createdDate : new Date()}
            onSubmit(taskDetails)
            handleModalState()
        }else{
            alert('Please fill all the details to add the task')
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleModalState}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Enter Task Name" className="mb-3" aria-label="Search" onChange={onTaskNameChange} />
                            <Form.Select onChange={onTaskStatusSelection}>
                                <option>Select Task Status</option>
                                <option value="0">To-do</option>
                                <option value="1">Progress</option>
                                <option value="2">Completed</option>
                                <option value="3">Archived</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalState}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>onTaskSubmit()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CustomModal;
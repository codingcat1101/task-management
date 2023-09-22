import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../store/reduxActions";
import { getTaskId, isEmpty, isUndefined } from "../utils/util";

const CustomModal = ({ show, title, message, handleModalState, onSubmit , data}) => {

    const [taskName, setTaskName] = useState(!isUndefined(data) ? data.taskName : '')
    const [taskStatus, setTaskStatus] = useState(!isUndefined(data) ? data.taskStatus : '')
    const [taskNote, setTaskNote] = useState(!isUndefined(data) ? data.taskNote : '')

    useEffect(()=>{
        if(!isUndefined(data)){
            setTaskName(data.taskName)
        }
    },[])

    const onTaskStatusSelection = (e) => {
        setTaskStatus(e.target.value)
    }

    const onTaskNameChange = (e) => {
        setTaskName(e.target.value)
    }

    const onTaskNoteChange = (e) => {
        setTaskNote(e.target.value)
    }

    function onTaskSubmit (){
        if(!isEmpty(taskName) && !isEmpty(taskStatus) && taskStatus !== "-1"){
            let taskDetails = {
                taskId : !isUndefined(data) ? data.taskId : getTaskId(),
                taskName: taskName,
                taskStatus: taskStatus,
                taskNote : taskNote, 
                createdDate : new Date()
            }
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
                            <Form.Control type="text" placeholder="Enter Task Name" className="mb-3" aria-label="Search" value={taskName} onChange={onTaskNameChange} />
                            <Form.Control type="text" as='textarea' placeholder="Notes" className="mb-3" value={taskNote} onChange={onTaskNoteChange} />
                            <Form.Select onChange={onTaskStatusSelection} value={taskStatus}>
                                <option value="-1">Select Task Status</option>
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
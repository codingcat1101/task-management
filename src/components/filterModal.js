import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { getTaskId, isEmpty, isUndefined } from "../utils/util";

const FilterModal = ({ show, handleModalState, onSubmit}) => {

    const [taskStatus, setTaskStatus] = useState('')

    const onTaskStatusSelection = (e) => {
        setTaskStatus(e.target.value)
    }

    function onTaskSubmit (){
        if(!isEmpty(taskStatus) && taskStatus !== "-1"){
            onSubmit(taskStatus)
            handleModalState()
        }
    }
    function onClearFilters (){
        setTaskStatus('')
        onSubmit('')
        handleModalState()
    }

    return (
        <>
            <Modal show={show} onHide={handleModalState}>
                <Modal.Header closeButton>
                    <Modal.Title>Filter Tasks by Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
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
                    <Button variant="warning" onClick={()=>onClearFilters()}>
                        Clear Filters
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default FilterModal;
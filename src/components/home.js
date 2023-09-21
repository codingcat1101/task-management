import React, { useEffect, useState } from 'react';
import Header from './navbar';
import SearchComponent from './searchbar';
import TaskCard from './task-card';
import StatusTabs from './tabs';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';
import { isArrayEmpty, isEmpty, isNull, isUndefined } from '../utils/util';
import { clearTasks, getTasks, saveTasks } from '../utils/localStorage';
import CustomModal from './modal';
import { MdAddCircle, MdFilterListAlt, MdOutlineLayersClear } from "react-icons/md";
import FilterModal from './filterModal';
import { useTheme } from '../hooks/useTheme';

const Home = () => {
    const [taskItems, setTaskItems] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showFilterModal, setShowFilterModal] = useState(false)

    const [modalMode, setModalMode] = useState(0)
    const [selectedTaskToUpdate, setSelectedTaskToUpdate] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTasks, setFilteredTasks] = useState([])

    const toggleModal = () => setShowModal(!showModal)
    const toggleEditModal = () => setShowEditModal(!showEditModal)
    const toggleFilterModal = () => setShowFilterModal(!showFilterModal)

    const themeSwitcherVariant = {
        light: "white",
        dark: "#212529"
    };

    const themeSwitcherVariantForButtons = {
        light: "black",
        dark: "white"
    };

    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setTaskItems(getTasks())
        setFilteredTasks(getTasks())
    }, [])

    const onTaskAdded = (task) => {
        let tempTasks = []
        tempTasks = getTasks()
        tempTasks.push(task)
        saveTasks(tempTasks)
        setTaskItems(tempTasks)
        setFilteredTasks(tempTasks)
    }

    const onTasksCleared = () => {
        clearTasks()
        setTaskItems([])
        setFilteredTasks([])
    }

    const onTaskDeleted = (selectedTask) => {
        let tasks = getTasks()
        saveTasks(tasks.filter(task => task.taskId !== selectedTask.taskId))
        setTaskItems(taskItems.filter(task => task.taskId !== selectedTask.taskId))
        setFilteredTasks(taskItems.filter(task => task.taskId !== selectedTask.taskId))
    }

    const onTaskUpdated = (selectedTask) => {
        let tasks = taskItems;
        tasks.forEach(task => {
            if (task.taskId === selectedTask.taskId) {
                task.taskName = selectedTask.taskName
                task.createdDate = selectedTask.createdDate
                task.taskStatus = selectedTask.taskStatus
            }
        })
        saveTasks(tasks)
        setTaskItems(tasks)
        setFilteredTasks(tasks)
    }


    function onActionClicked(value) {
        if (value === 1) {
            toggleModal()
        } else if (value === 2) {
            toggleEditModal()
        }
        setModalMode(value)
    }

    const onSearch = (value) => {
        if (value === '' || value === undefined || value === null) {
            setFilteredTasks(taskItems);
        } else {
            const filteredData = taskItems.filter(item =>
                item.taskName.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredTasks(filteredData);
        }
    }

    const onFilterSubmit = (taskStatus) => {
        if(taskStatus === ''){
            setFilteredTasks(taskItems)
        }else{
            const filteredData = taskItems.filter(item => parseInt(item.taskStatus) === parseInt(taskStatus));
            setFilteredTasks(filteredData)
        }
    }


    return (
        <>
            {showModal && <CustomModal show={showModal} title={'Add Task'} message={'Fill the details to add the task'} handleModalState={toggleModal} onSubmit={(e) => onTaskAdded(e)} />}
            {showEditModal && <CustomModal data={selectedTaskToUpdate} show={showEditModal} title={'Edit Task'} handleModalState={toggleEditModal} onSubmit={(e) => onTaskUpdated(e)} />}
            <FilterModal show={showFilterModal} handleModalState={toggleFilterModal} onSubmit={(e)=>onFilterSubmit(e)}/>
            <Header />
            <Row className='p-3' style={{backgroundColor:themeSwitcherVariant[theme]}}>
                <Col xs={8}>
                    <SearchComponent onTextSearch={onSearch} />
                </Col>
                <Col xs={4} align="end" className='align-self-center'>
                    <MdAddCircle size={35} onClick={() => onActionClicked(1)} color={themeSwitcherVariantForButtons[theme]}/>
                    <MdFilterListAlt size={35} onClick={toggleFilterModal} color={themeSwitcherVariantForButtons[theme]}/>
                    <MdOutlineLayersClear size={35} onClick={() => onTasksCleared()} color={themeSwitcherVariantForButtons[theme]}/>
                </Col>
            </Row>
            {/* <StatusTabs /> */}
            <hr />
            <div style={{ margin: '1%' }}>
                {
                    !isArrayEmpty(filteredTasks) ?
                        filteredTasks.map((task) => {
                            return <TaskCard isTaskEmpty={false} data={task} onTaskDelete={onTaskDeleted} onTaskUpdate={() => onActionClicked(2)} setSelectedTaskToUpdate={setSelectedTaskToUpdate} />
                        }) :
                        <TaskCard isTaskEmpty={true} />
                }
            </div>
        </>
    );
}

export default Home;
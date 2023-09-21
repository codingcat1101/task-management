import React, { useEffect, useState } from 'react';
import Header from './navbar';
import SearchComponent from './searchbar';
import TaskCard from './task-card';
import StatusTabs from './tabs';
import { Button, Container } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';
import { isArrayEmpty } from '../utils/util';
import store from '../store/appStore';
import { setTasks } from '../store/reduxActions';
import { getTasks } from '../utils/localStorage';

const Home = () => {
    const [taskItems,setTaskItems] = useState([])
    
    useEffect(()=>{
        setTaskItems(getTasks())
    },[])

    const fetchTasksOnChange = (tasks) => {
        setTaskItems(tasks)
    }

    return (
        <>
            <Header />
            <SearchComponent onTaskAdded={fetchTasksOnChange}/>
            <StatusTabs/>
            <hr/>
            <Container >
                {
                    !isArrayEmpty(taskItems) ? 
                    taskItems.map((task)=>{
                        return <TaskCard isTaskEmpty={false} title={task.taskName} statusMessage={parseInt(task.taskStatus)} createdDate={task.createdDate}/>
                    }) : 
                    <TaskCard isTaskEmpty={true}/>
                }
            </Container>
        </>
    );
}

export default connect(store=>store)(Home);
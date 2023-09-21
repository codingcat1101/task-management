import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useTheme } from "../hooks/useTheme";

const SearchComponent = ({ onTextSearch}) => {
    const [showAddModal , setShowAddModal] = useState(false)

    const onSearch = (e) => {
        onTextSearch(e.target.value);
    }

    const themeSwitcherVariant = {
        light: "outline-primary",
        dark: "outline-light"
    };

    const { theme, setTheme } = useTheme();

    return (
       <>
        <Container className="mt-3" >
            <Row>
                <Col>
                    <Form >
                        <Form.Control type="search" placeholder="Search by task name" className="me-1 rounded-pill" aria-label="Search" onChange={onSearch} /> 
                    </Form>
                </Col>
            </Row>
        </Container>
       </>

    );
}

export default SearchComponent;
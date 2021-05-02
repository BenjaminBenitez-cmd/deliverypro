import React, { useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Collapse } from 'reactstrap';



const DropdownCard = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleChange = () => {
        setIsOpen(!isOpen);
    }

    return (
        <Card {...props}>
            <CardHeader onClick={handleChange}>
                <CardTitle tag="h6">{props.label}</CardTitle>  
            </CardHeader>
            <Collapse isOpen={isOpen}>
                <CardBody>
                    {props.children}
                </CardBody>
            </Collapse>
        </Card>
    )
}


export default DropdownCard;
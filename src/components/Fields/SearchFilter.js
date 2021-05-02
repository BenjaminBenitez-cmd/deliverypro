import React, { useState } from 'react'
import { useFilter } from 'hooks/useFilter';
import { useHistory } from 'react-router';
import { Card, CardBody, CardFooter, CardHeader, CardTitle, Input, Button, Row } from 'reactstrap'

const SearchFilter = () => {
    const history = useHistory();
    const { filterItems } = useFilter();
    const [search, setSearch] = useState('');
    
    const handleClick = () => {
        history.push('/admin/createdelivery');
    }

    const handleChange = (e) => {
        setSearch(e.target.value);
        filterItems(e)
    }

    return (
        <Card>
            <CardHeader>
                <Row className="justify-content-between px-3">
                    <Button color="primary" className="btn-inline" onClick={handleClick}>Add</Button>
                </Row>
            </CardHeader>
            <CardBody>
                <Input type="search" name="search" value={search} onChange={handleChange} placeholder="Search"/>
            </CardBody>
            <CardFooter>
                <Button color="primary" className="btn-simple">Select All</Button>
                <Button color="primary" className="btn-simple" disabled >Delete</Button>
                <Button color="primary" className="btn-simple" disabled >Archive</Button>
            </CardFooter>
        </Card>
    )
}

export default SearchFilter

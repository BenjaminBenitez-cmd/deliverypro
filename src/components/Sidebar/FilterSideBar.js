import FormCheckButton from 'components/Fields/FormCheckButton';
import { useFilter } from 'hooks/useFilter';
import React, { useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Input } from 'reactstrap'
import DropdownCard from './DropdownCard'

const provinces = [
    {
      id: 1,
      value: 'Orange Walk',
      label: 'Orange Walk',
    },
    {
      id: 2,
      value: 'Belize City',
      label: 'Belize City'
    },
    {
      id: 3,
      value: 'Corozal',
      label: 'Corozal'
    },
    {
      id: 4,
      value: 'Belmopan',
      label: 'Belmopan'
    },
    {
      id: 5,
      value: 'Cayo',
      label: 'Cayo'
    },
    {
      id: 6,
      value: 'Placencia',
      label: 'Placencia'
    },
]
  
const statuses = [
    {
        id: 1,
        value: true,
        label: 'Fulfilled'
    },
    {
        id: 2,
        value: false,
        label: 'Pending'
    },
]
  
const FilterSideBar = () => {
    const { filterItems } = useFilter();
    const [date, setDate] = useState('');

    const handleChange = (e) => {
        if(e.target.name === 'date') {
            setDate(e.target.value);
        }
        filterItems(e);
    }

    return (
        <Card>
        <CardHeader>
          <CardTitle tag="h4">Filter By</CardTitle>
        </CardHeader> 
        <CardBody>
          <DropdownCard label="Date">
            <Input
              type="date"
              name="date"
              onChange={handleChange}
              value={date}
            />
          </DropdownCard>
          <DropdownCard label="Status">
            {
              statuses.map(status => (
                <FormCheckButton 
                  key={status.id}
                  label={status.label}
                  value={status.value}  
                  onChange={handleChange}
                  name='status'
                  type='radio'
                />
              ))
            }
          </DropdownCard>
          <DropdownCard label="Province">
          {
              provinces.map(province => (
                <FormCheckButton 
                  key={province.id}
                  label={province.label}
                  value={province.value}  
                  onChange={handleChange}
                  name='province'
                  type='radio'
                />
              ))
            }
          </DropdownCard>
        </CardBody>
      </Card>
    )
}

export default FilterSideBar

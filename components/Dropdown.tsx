import React from 'react'
import StateManagedSelect from 'react-select'
import Select from 'react-select'

const Dropdown: StateManagedSelect = ({ ...props }) => {
  return (
    <Select {...props} />
  )
}

export default Dropdown
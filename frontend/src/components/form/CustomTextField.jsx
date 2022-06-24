import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

// import PropTypes from 'prop-types';

const CustomTextField = props => {
    const { label, name, onChange, value, helperText, error, type = 'text' } = props;

    return (
        <TextField
            name={name}
            value={value}
            onChange={onChange}
            label={label}
            variant="outlined"
            fullWidth
            type={type}
            helperText={helperText}
            error={error}
        />
    );
};

CustomTextField.prototype = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
};

export default CustomTextField;

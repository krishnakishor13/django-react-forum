import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';
import ClearIcon from '@mui/icons-material/Clear';
import { useTheme } from '@mui/material/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

const getStyles = (key, options, theme) => {
    const index = options.findIndex(option => option.key === key);
    return {
        fontWeight: index === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
    };
};

const CustomChipSelect = props => {
    const theme = useTheme();
    const { options, label, name, onChange, selectedValue, onDelete } = props;
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
            <Select
                labelId="demo-multiple-chip-label"
                id={`${selectedValue.length > 0 ? 'demo-multiple-chip' : ''}`}
                multiple
                name={name}
                label={label}
                value={selectedValue}
                onChange={e => onChange(e, name)}
                input={<OutlinedInput id="select-multiple-chip" label={label} />}
                renderValue={selected => {
                    return (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, borderRadius: '5px' }}>
                            {selected.map(item => (
                                <Chip
                                    sx={{
                                        borderRadius: '5px',
                                        backgroundColor: '#1876d1',
                                        color: '#FFF',
                                        fontWeight: 600
                                    }}
                                    onDelete={e => onDelete(e, item)}
                                    deleteIcon={
                                        <ClearIcon
                                            onMouseDown={e => {
                                                e.stopPropagation();
                                            }}
                                            style={{ color: '#FFF', zIndex: 9999 }}
                                        />
                                    }
                                    key={item.key}
                                    label={item.value}
                                />
                            ))}
                        </Box>
                    );
                }}
                MenuProps={MenuProps}
            >
                {options.map(option => {
                    return (
                        <MenuItem key={option.key} value={option} style={getStyles(option.key, options, theme)}>
                            {option.value}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

CustomChipSelect.propTypes = {
    options: PropTypes.array
};

CustomChipSelect.defaultProps = {};

export default CustomChipSelect;

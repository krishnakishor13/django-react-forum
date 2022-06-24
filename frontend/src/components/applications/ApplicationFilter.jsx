import SearchIcon from '@mui/icons-material/Search';
import { Grid, Paper, Stack } from '@mui/material';
import React, { useContext, useState } from 'react';
import { appliedByOptions, jobPortalOptions, statusOptions } from '../../constants';
import { FormContext } from '../../contexts/FormContext';
import studentRequest from '../../requests/student-request';
import userRequest from '../../requests/user-request';
import CustomButton from '../form/CustomButton';
import CustomDateRangePicker from '../form/CustomDateRangePicker';
import CustomLoadingButton from '../form/CustomLoadingButton';
import CustomSearchSelect from '../form/CustomSearchSelect';
import CustomSelect from '../form/CustomSelect';
import CustomTextField from '../form/CustomTextField';
import CustomChipSelect from '../form/CustomChipSelect';

const ApplicationFilter = () => {
    const {
        clearSearch,
        isLoading,
        onChangeDateRange,
        onChangeHandler,
        onDeleteHandler,
        onChangeSearchSelect,
        queries,
        queryDateRange,
        querySelect,
        submitSearch
    } = useContext(FormContext);

    const [studentOptions, setStudentOptions] = useState([]);
    const [userOptions, setUserOptions] = useState([]);

    const getStudents = async filter => {
        const students = await studentRequest.index(filter);
        const studentOptions = students.results.length
            ? students.results.map(option => {
                  return {
                      key: option.id,
                      value: option.name
                  };
              })
            : [];
        setStudentOptions(studentOptions);
    };

    const getUsers = async filter => {
        const users = await userRequest.index(filter);
        const userOptions = users.results.length
            ? users.results.map(option => {
                  return {
                      key: option.id,
                      value: option.user_name
                  };
              })
            : [];
        setUserOptions(userOptions);
    };

    return (
        <Paper
            component="form"
            sx={{
                p: 4,
                width: '100%'
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <CustomSearchSelect
                        name="student"
                        label="Student"
                        availableOptions={studentOptions}
                        selectedValue={querySelect.student}
                        onChange={onChangeSearchSelect}
                        onTextChange={e => getStudents({ search: e && e.target.value })}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomSearchSelect
                        name="user"
                        label="Applied Admin"
                        availableOptions={userOptions}
                        selectedValue={querySelect.user}
                        onChange={onChangeSearchSelect}
                        onTextChange={e => getUsers({ search: e && e.target.value })}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomChipSelect
                        name="status"
                        label="Status"
                        selectedValue={queries.status}
                        options={statusOptions}
                        onChange={onChangeHandler}
                        onDelete={onDeleteHandler}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomSelect
                        name="applied_by"
                        label="Applied By"
                        selectedValue={queries.applied_by}
                        options={appliedByOptions}
                        onChange={onChangeHandler}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomTextField
                        name="company_name"
                        label="Company Name"
                        value={queries.company_name}
                        onChange={onChangeHandler}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomTextField
                        name="position"
                        label="Position"
                        value={queries.position}
                        onChange={onChangeHandler}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomTextField
                        name="job_description"
                        label="Job Description Keyword"
                        value={queries.job_description}
                        onChange={onChangeHandler}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomSelect
                        name="job_portal"
                        label="Job Portal"
                        selectedValue={queries.job_portal}
                        options={jobPortalOptions}
                        onChange={onChangeHandler}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomDateRangePicker
                        name="created_at"
                        startText="Created Date From"
                        endText="Created Date To"
                        value={[queryDateRange.start_date, queryDateRange.end_date]}
                        onChange={onChangeDateRange}
                    />
                </Grid>
            </Grid>
            <Grid container sx={{ mt: 2 }}>
                <Stack spacing={2} direction="row">
                    <CustomLoadingButton
                        onClick={submitSearch}
                        loading={isLoading}
                        startIcon={<SearchIcon />}
                        variant="contained"
                        text="Search"
                    ></CustomLoadingButton>
                    <CustomButton onClick={clearSearch} text="Clear" variant="outlined" />
                </Stack>
            </Grid>
        </Paper>
    );
};

export default ApplicationFilter;

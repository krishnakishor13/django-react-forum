import SearchIcon from '@mui/icons-material/Search';
import { Grid, Paper, Stack } from '@mui/material';
import React, { useContext, useState } from 'react';

import { interviewRoundOptions, interviewStatusOptions, interviewTypeOptions } from '../../constants';
import { FormContext } from '../../contexts/FormContext';
import applicationRequest from '../../requests/application-request';
import studentRequest from '../../requests/student-request';
import CustomButton from '../form/CustomButton';
import CustomDateRangePicker from '../form/CustomDateRangePicker';
import CustomLoadingButton from '../form/CustomLoadingButton';
import CustomSearchSelect from '../form/CustomSearchSelect';
import CustomSelect from '../form/CustomSelect';
import CustomTextField from '../form/CustomTextField';
import CustomChipSelect from '../form/CustomChipSelect';

const InterviewFilter = () => {
    const {
        clearSearch,
        isLoading,
        onChangeDateRange,
        onChangeHandler,
        onChangeSearchSelect,
        queries,
        queryDateRange,
        onDeleteHandler,
        querySelect,
        submitSearch
    } = useContext(FormContext);

    const [studentOptions, setStudentOptions] = useState([]);
    const [applicationOptions, setApplicationOptions] = useState([]);

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

    const getApplications = async filter => {
        const applications = await applicationRequest.index(filter);
        const applicationOptions = applications.results.length
            ? applications.results.map(option => {
                  return {
                      key: option.id,
                      value: `${option.id} - ${option.position} | ${option.company_name}`
                  };
              })
            : [];
        setApplicationOptions(applicationOptions);
    };

    return (
        <Paper component="form" sx={{ p: 4, width: '100%' }}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
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
                        name="application"
                        label="Application"
                        availableOptions={applicationOptions}
                        selectedValue={querySelect.interview}
                        onChange={onChangeSearchSelect}
                        onTextChange={e =>
                            getApplications({
                                search: e && e.target.value,
                                student: querySelect.student.key
                            })
                        }
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomChipSelect
                        name="status"
                        label="Status"
                        selectedValue={queries.status}
                        options={interviewStatusOptions}
                        onChange={onChangeHandler}
                        onDelete={onDeleteHandler}
                    />
                </Grid>
                <Grid item xs={4}>
                    <CustomChipSelect
                        name="interview_type"
                        label="Interview Type"
                        selectedValue={queries.interview_type}
                        options={interviewTypeOptions}
                        onChange={onChangeHandler}
                        onDelete={onDeleteHandler}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CustomSelect
                        name="round"
                        label="Round"
                        selectedValue={queries.round}
                        options={interviewRoundOptions}
                        onChange={onChangeHandler}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CustomTextField
                        name="support_tutor"
                        label="Support Tutor"
                        value={queries.support_tutor}
                        onChange={onChangeHandler}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CustomTextField
                        name="company_name"
                        label="Company Name"
                        value={queries.company_name}
                        onChange={onChangeHandler}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomDateRangePicker
                        name="ist_scheduled_at"
                        startText="IST Scheduled Date From"
                        endText="IST Scheduled Date To"
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

export default InterviewFilter;

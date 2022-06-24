import SearchIcon from '@mui/icons-material/Search';
import { Grid, Paper, Stack } from '@mui/material';
import React, { useContext } from 'react';

import {
    partnerStatusOptions,
    studentsApplicationQuestionnaireStatusOptions,
    studentsCourseOptions,
    studentsGithubStatusOptions,
    studentsResumeQuestionnaireStatusOptions,
    studentsResumeStatusOptions,
    studentsStatusOptions,
    studentsWakeUpStatusOptions
} from '../../constants';
import { FormContext } from '../../contexts/FormContext';
import CustomButton from '../form/CustomButton';
import CustomChipSelect from '../form/CustomChipSelect';
import CustomLoadingButton from '../form/CustomLoadingButton';
import CustomSelect from '../form/CustomSelect';
import CustomTextField from '../form/CustomTextField';

const ApplicationFilter = () => {
    const { clearSearch, onChangeHandler, queries, submitSearch, isLoading, onDeleteHandler } = useContext(FormContext);

    return (
        <Paper component="form" sx={{ p: 4, width: '100%' }}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <CustomTextField name="name" label="Name" value={queries.name} onChange={onChangeHandler} />
                </Grid>
                <Grid item xs={3}>
                    <CustomChipSelect
                        name="status"
                        label="Status"
                        selectedValue={queries.status}
                        options={studentsStatusOptions}
                        onChange={onChangeHandler}
                        onDelete = {onDeleteHandler}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomTextField name="email" label="Email" value={queries.email} onChange={onChangeHandler} />
                </Grid>
                <Grid item xs={2}>
                    <CustomTextField name="phone" label="Phone" value={queries.phone} onChange={onChangeHandler} />
                </Grid>
                <Grid item xs={2}>
                    <CustomSelect
                        name="course"
                        label="Course"
                        selectedValue={queries.course}
                        options={studentsCourseOptions}
                        onChange={onChangeHandler}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CustomSelect
                        name="partner"
                        label="Partner"
                        selectedValue={queries.partner}
                        options={partnerStatusOptions}
                        onChange={onChangeHandler}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomSelect
                        name="resume_questionnaire_status"
                        label="Resume Questionnaire Status"
                        selectedValue={queries.resume_questionnaire_status}
                        options={studentsResumeQuestionnaireStatusOptions}
                        onChange={onChangeHandler}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomSelect
                        name="application_questionnaire_status"
                        label="Application Questionnaire Status"
                        selectedValue={queries.application_questionnaire_status}
                        options={studentsApplicationQuestionnaireStatusOptions}
                        onChange={onChangeHandler}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CustomSelect
                        name="resume_status"
                        label="Resume Status"
                        selectedValue={queries.resume_status}
                        options={studentsResumeStatusOptions}
                        onChange={onChangeHandler}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CustomSelect
                        name="github_status"
                        label="Github Status"
                        selectedValue={queries.github_status}
                        options={studentsGithubStatusOptions}
                        onChange={onChangeHandler}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CustomSelect
                        name="wakeupserver_status"
                        label="Wakeupserver Status"
                        selectedValue={queries.wakeupserver_status}
                        options={studentsWakeUpStatusOptions}
                        onChange={onChangeHandler}
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

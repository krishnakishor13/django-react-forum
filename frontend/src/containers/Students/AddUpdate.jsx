import { Grid, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';

import CustomButton from '../../components/form/CustomButton';
import CustomDateTimePicker from '../../components/form/CustomDateTimePicker';
import CustomLoadingButton from '../../components/form/CustomLoadingButton';
import CustomSelect from '../../components/form/CustomSelect';
import CustomTextField from '../../components/form/CustomTextField';
import {
    studentsApplicationQuestionnaireStatusOptions,
    studentsCourseOptions,
    studentsGenderOptions,
    studentsGithubStatusOptions,
    studentsResumeQuestionnaireStatusOptions,
    studentsResumeStatusOptions,
    studentsStatusOptions,
    studentsWakeUpStatusOptions,
    partnerStatusOptions
} from '../../constants';
import studentRequest from '../../requests/student-request';

const AddUpdate = () => {
    const history = useHistory();
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(!!id);
    const [student, setStudent] = useState({
        name: '',
        student_id: '',
        email: '',
        phone: '',
        status: '',
        partner: '',
        course: '',
        gender: '',
        certification_url: '',
        entrance_ceremony_date: null,
        graduated_date: null,
        prepared_by_dev_team_date: null,
        application_started_date: null,
        got_offer_date: null,
        resume_questionnaire_status: '',
        application_questionnaire_status: '',
        resume_url: '',
        resume_status: '',
        portfolio_url: '',
        portfolio_status: '',
        github_url: '',
        github_status: '',
        wakeupserver_status: '',
        job_support_email: '',
        job_support_email_password: '',
        linkedin_id: '',
        linkedin_password: '',
        indeed_id: '',
        indeed_password: '',
        monster_id: '',
        monster_password: '',
        glassdoor_id: '',
        glassdoor_password: '',
        dice_id: '',
        dice_password: '',
        smart_work_id: '',
        smart_work_password: '',
        work_day_id: '',
        work_day_password: ''
    });

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (id) {
            studentRequest.find(id).then(res => {
                setStudent(res);
                setIsLoading(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnchange = e => {
        const { name, value } = e.target;
        setStudent(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onChangeDate = (value, name) => {
        setStudent(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmit = () => {
        setIsLoading(true);
        if (id) {
            studentRequest
                .update(id, student)
                .then(() => history.goBack())
                .catch(err => {
                    setErrors(err.response.data);
                    setIsLoading(false);
                });
        } else {
            studentRequest
                .store(student)
                .then(() => history.goBack())
                .catch(err => {
                    setErrors(err.response.data);
                    setIsLoading(false);
                });
        }
    };

    return (
        <>
            <Typography variant="h5" gutterBottom component="div" my={2}>
                {id ? 'Update' : 'Add'} a Student
            </Typography>
            <Typography gutterBottom component="p" my={2}>
                Basic Info
            </Typography>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={3}>
                    <CustomTextField
                        name="name"
                        error={!!errors.name}
                        helperText={errors.name}
                        value={student.name}
                        onChange={handleOnchange}
                        label="Name"
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomTextField
                        name="student_id"
                        error={!!errors.student_id}
                        helperText={errors.student_id}
                        value={student.student_id}
                        onChange={handleOnchange}
                        label="Student ID"
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomTextField
                        name="email"
                        error={!!errors.email}
                        helperText={errors.email}
                        value={student.email}
                        onChange={handleOnchange}
                        label="Email"
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomTextField
                        name="phone"
                        error={!!errors.phone}
                        helperText={errors.phone}
                        value={student.phone}
                        onChange={handleOnchange}
                        label="Phone"
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomSelect
                        label="Status"
                        name="status"
                        error={!!errors.status}
                        helperText={errors.status}
                        selectedValue={student.status}
                        onChange={handleOnchange}
                        options={studentsStatusOptions}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomSelect
                        label="Partner"
                        name="partner"
                        error={!!errors.partner}
                        helperText={errors.partner}
                        selectedValue={student.partner}
                        onChange={handleOnchange}
                        options={partnerStatusOptions}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomSelect
                        label="Course"
                        name="course"
                        error={!!errors.course}
                        helperText={errors.course}
                        selectedValue={student.course}
                        onChange={handleOnchange}
                        options={studentsCourseOptions}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomSelect
                        label="Gender"
                        name="gender"
                        error={!!errors.gender}
                        helperText={errors.gender}
                        selectedValue={student.gender}
                        onChange={handleOnchange}
                        options={studentsGenderOptions}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CustomTextField
                        name="certification_url"
                        error={!!errors.certification_url}
                        helperText={errors.certification_url}
                        value={student.certification_url}
                        onChange={handleOnchange}
                        label="Certification Url"
                    />
                </Grid>
                <Grid item xs={2}>
                    <CustomDateTimePicker
                        name="entrance_ceremony_date"
                        label="Entrance Ceremony Date"
                        error={!!errors.entrance_ceremony_date}
                        helperText={errors.entrance_ceremony_date}
                        value={student.entrance_ceremony_date}
                        onChange={onChangeDate}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CustomDateTimePicker
                        name="graduated_date"
                        label="Graduated Date"
                        error={!!errors.graduated_date}
                        helperText={errors.graduated_date}
                        value={student.graduated_date}
                        onChange={onChangeDate}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CustomDateTimePicker
                        name="prepared_by_dev_team_date"
                        label="Prepared by Dev"
                        error={!!errors.prepared_by_dev_team_date}
                        helperText={errors.prepared_by_dev_team_date}
                        value={student.prepared_by_dev_team_date}
                        onChange={onChangeDate}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CustomDateTimePicker
                        name="application_started_date"
                        label="Application Started Date"
                        error={!!errors.application_started_date}
                        helperText={errors.application_started_date}
                        value={student.application_started_date}
                        onChange={onChangeDate}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CustomDateTimePicker
                        name="got_offer_date"
                        label="Get Offer Date"
                        error={!!errors.got_offer_date}
                        helperText={errors.got_offer_date}
                        value={student.got_offer_date}
                        onChange={onChangeDate}
                    />
                </Grid>
            </Grid>
            <Typography gutterBottom component="p" my={2}>
                Job Support Process
            </Typography>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={4}>
                    <CustomSelect
                        label="Resume Questionnaire Status"
                        name="resume_questionnaire_status"
                        error={!!errors.resume_questionnaire_status}
                        helperText={errors.resume_questionnaire_status}
                        selectedValue={student.resume_questionnaire_status}
                        onChange={handleOnchange}
                        options={studentsResumeQuestionnaireStatusOptions}
                    />
                </Grid>
                <Grid item xs={4}>
                    <CustomSelect
                        label="Application Questionnaire Status"
                        name="application_questionnaire_status"
                        error={!!errors.application_questionnaire_status}
                        helperText={errors.application_questionnaire_status}
                        selectedValue={student.application_questionnaire_status}
                        onChange={handleOnchange}
                        options={studentsApplicationQuestionnaireStatusOptions}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CustomTextField
                        label="Resume Url"
                        name="resume_url"
                        error={!!errors.resume_url}
                        helperText={errors.resume_url}
                        value={student.resume_url}
                        onChange={handleOnchange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CustomSelect
                        label="Resume Status"
                        name="resume_status"
                        error={!!errors.resume_status}
                        helperText={errors.resume_status}
                        selectedValue={student.resume_status}
                        onChange={handleOnchange}
                        options={studentsResumeStatusOptions}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomTextField
                        label="Portfolio Url"
                        name="portfolio_url"
                        error={!!errors.portfolio_url}
                        helperText={errors.portfolio_url}
                        value={student.portfolio_url}
                        onChange={handleOnchange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CustomSelect
                        label="Portfolio Status"
                        name="portfolio_status"
                        error={!!errors.portfolio_status}
                        helperText={errors.portfolio_status}
                        selectedValue={student.portfolio_status}
                        onChange={handleOnchange}
                        options={studentsResumeStatusOptions}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomTextField
                        label="Github Url"
                        name="github_url"
                        error={!!errors.github_url}
                        helperText={errors.github_url}
                        value={student.github_url}
                        onChange={handleOnchange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CustomSelect
                        label="Github Status"
                        name="github_status"
                        error={!!errors.github_status}
                        helperText={errors.github_status}
                        selectedValue={student.github_status}
                        onChange={handleOnchange}
                        options={studentsGithubStatusOptions}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CustomSelect
                        label="Wake Up Server Status"
                        name="wakeupserver_status"
                        error={!!errors.wakeupserver_status}
                        helperText={errors.wakeupserver_status}
                        selectedValue={student.wakeupserver_status}
                        onChange={handleOnchange}
                        options={studentsWakeUpStatusOptions}
                    />
                </Grid>
            </Grid>
            <Typography gutterBottom component="p" my={2}>
                Job Portal ID/Pass
            </Typography>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={6}>
                    <CustomTextField
                        name="job_support_email"
                        error={!!errors.job_support_email}
                        helperText={errors.job_support_email}
                        label="Job Support Email"
                        value={student.job_support_email}
                        onChange={handleOnchange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomTextField
                        name="job_support_email_password"
                        error={!!errors.job_support_email_password}
                        helperText={errors.job_support_email_password}
                        label="Job Support Password"
                        value={student.job_support_email_password}
                        onChange={handleOnchange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomTextField
                        name="linkedin_id"
                        error={!!errors.linkedin_id}
                        helperText={errors.linkedin_id}
                        label="LinkedIn Email"
                        value={student.linkedin_id}
                        onChange={handleOnchange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomTextField
                        name="linkedin_password"
                        error={!!errors.linkedin_password}
                        helperText={errors.linkedin_password}
                        label="LinkedIn Password"
                        value={student.linkedin_password}
                        onChange={handleOnchange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomTextField
                        name="indeed_id"
                        error={!!errors.indeed_id}
                        helperText={errors.indeed_id}
                        label="Indeed Email"
                        value={student.indeed_id}
                        onChange={handleOnchange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomTextField
                        name="indeed_password"
                        error={!!errors.indeed_password}
                        helperText={errors.indeed_password}
                        label="Indeed Password"
                        value={student.indeed_password}
                        onChange={handleOnchange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomTextField
                        name="monster_id"
                        error={!!errors.monster_id}
                        helperText={errors.monster_id}
                        label="Monster Email"
                        value={student.monster_id}
                        onChange={handleOnchange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomTextField
                        name="monster_password"
                        error={!!errors.monster_password}
                        helperText={errors.monster_password}
                        label="Monster Password"
                        value={student.monster_password}
                        onChange={handleOnchange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomTextField
                        name="glassdoor_id"
                        error={!!errors.glassdoor_id}
                        helperText={errors.glassdoor_id}
                        label="Glassdoor Email"
                        value={student.glassdoor_id}
                        onChange={handleOnchange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomTextField
                        name="glassdoor_password"
                        error={!!errors.glassdoor_password}
                        helperText={errors.glassdoor_password}
                        label="Glassdoor Password"
                        value={student.glassdoor_password}
                        onChange={handleOnchange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomTextField
                        name="dice_id"
                        error={!!errors.dice_id}
                        helperText={errors.dice_id}
                        label="Dice Email"
                        value={student.dice_id}
                        onChange={handleOnchange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomTextField
                        name="dice_password"
                        error={!!errors.dice_password}
                        helperText={errors.dice_password}
                        label="Dice Password"
                        value={student.dice_password}
                        onChange={handleOnchange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomTextField
                        name="smart_work_id"
                        error={!!errors.smart_work_id}
                        helperText={errors.smart_work_id}
                        label="Smart Work Email"
                        value={student.smart_work_id}
                        onChange={handleOnchange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomTextField
                        name="smart_work_password"
                        error={!!errors.smart_work_password}
                        helperText={errors.smart_work_password}
                        label="Smart Work Password"
                        value={student.smart_work_password}
                        onChange={handleOnchange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomTextField
                        name="work_day_id"
                        error={!!errors.work_day_id}
                        helperText={errors.work_day_id}
                        label="Work Day Email"
                        value={student.work_day_id}
                        onChange={handleOnchange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomTextField
                        name="work_day_password"
                        error={!!errors.work_day_password}
                        helperText={errors.work_day_password}
                        label="Work Day Password"
                        value={student.work_day_password}
                        onChange={handleOnchange}
                    />
                </Grid>
            </Grid>
            <Stack spacing={2} direction="row">
                <CustomLoadingButton
                    onClick={onSubmit}
                    loading={isLoading}
                    variant="contained"
                    text={id ? 'Update' : 'Add'}
                ></CustomLoadingButton>
                <CustomButton text="Cancel" variant="outlined" onClick={() => history.goBack()} />
            </Stack>
        </>
    );
};

export default AddUpdate;

import { Grid, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import CustomButton from '../../components/form/CustomButton';
import CustomLoadingButton from '../../components/form/CustomLoadingButton';
import CustomDateTimePicker from '../../components/form/CustomDateTimePicker';
import CustomSearchSelect from '../../components/form/CustomSearchSelect';
import CustomSelect from '../../components/form/CustomSelect';
import CustomTextArea from '../../components/form/CustomTextArea';
import CustomTextField from '../../components/form/CustomTextField';
import {
    interviewRoundOptions,
    interviewStatusOptions,
    interviewTypeOptions,
    studentTimezoneOptions
} from '../../constants';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import applicationRequest from '../../requests/application-request';
import interviewRequest from '../../requests/interview-request';
import studentRequest from '../../requests/student-request';
import CustomDialog from '../../components/common/ConfirmationDialog';
import interviewQuestionsRequest from '../../requests/interview-questions-request';

const AddUpdate = (toggleDrawer, open) => {
    const history = useHistory();
    let { id } = useParams();
    const [isLoading, setIsLoading] = useState(!!id);
    const [errors, setErrors] = useState([]);

    const [studentOptions, setStudentOptions] = useState([]);
    const [applicationOptions, setApplicationOptions] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const stateValue = history.location.state ? history.location.state : null;
    const [interview, setInterview] = useState({
        application: stateValue ? stateValue.application : { key: '', value: '' },
        interview_type: '',
        ist_scheduled_at: null,
        note: '',
        recording_url: '',
        round: 0,
        status: '',
        submission_date: null,
        student: stateValue ? stateValue.student : { key: '', value: '' },
        student_scheduled_at: null,
        student_timezone: '',
        support_tutor: '',
        interview_questions: [{ question: '', interview: '' }]
        
    });

    useEffect(() => {
        if (id) {
            interviewRequest.find(id).then(res => {
                setInterview({
                    ...res,
                    student: res.student ? { key: res.student.id, value: res.student.name } : { key: '', value: '' },
                    application: res.application
                        ? {
                            key: res.application.id,
                            value: `${res.application.id} - ${res.application.company_name} | ${res.application.position}`
                        }
                        : { key: '', value: '' },
                    interview_questions: res.interview_questions.length
                        ? res.interview_questions
                        : [{ question: '', interview: res.id }]
                });
                setIsLoading(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnchange = e => {
        const { name, value } = e.target;
        setInterview(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onChangeSearchSelect = (value, name) => {
        setInterview(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onChangeDate = (value, name) => {
        setInterview(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const getStudents = async filter => {
        studentRequest.index(filter).then(res => {
            let newOptions = res.results.length
                ? res.results.map(option => {
                    return {
                        key: option.id,
                        value: option.name
                    };
                })
                : [];
            setStudentOptions(newOptions);
        });
    };

    const getApplications = async filter => {
        applicationRequest.index(filter).then(res => {
            let newOptions = res.results.length
                ? res.results.map(option => {
                    return {
                        key: option.id,
                        value: `${option.id} - ${option.company_name} | ${option.position}`
                    };
                })
                : [];
            setApplicationOptions(newOptions);
        });
    };

    // handle click event of the Remove button
    const handleRemoveQuestion = () => {
        if (selectedQuestion && selectedQuestion.id) {
            interviewQuestionsRequest.destroy(selectedQuestion.id)
                .then(() => {
                    setInterview(prev => ({
                        ...prev,
                        interview_questions: interview.interview_questions.filter(q => q.id !== selectedQuestion.id)
                    }));
                    setOpenDialog(false);
                })
                .catch(err => {
                    setOpenDialog(false);
                    console.log(err);
                });
        } else {
            const questions = interview.interview_questions;
            questions.splice(selectedQuestion.index, 1);
            setInterview(prev => ({
                ...prev,
                interview_questions: questions
            }));
            setOpenDialog(false);
        }
    };

    const handleAddQuestion = () => {
        const questions = interview.interview_questions;
        questions.unshift({ question: '', interview: interview.id });
        setInterview(prev => ({
            ...prev,
            interview_questions: questions
        }));
    };

    const handleInputChange = (e, index) => {
        setInterview(prev => ({
            ...prev,
            interview_questions: prev.interview_questions.map((q, i) => {
                if (i === index) {
                    q.question = e.target.value
                }
                return q
            }),
        }))
    };


    const onSubmit = () => {
        setIsLoading(true);
        if (id) {
            interviewRequest
                .update(id, {
                    ...interview,
                    student: interview.student.key,
                    application: interview.application.key,
                    question: interview.interview_questions.question
                })
                .then(() => history.goBack())
                .catch(err => {
                    setErrors(err.response.data);
                    setIsLoading(false);
                });
        } else {
            interviewRequest
                .store({
                    ...interview,
                    student: interview.student.key,
                    application: interview.application.key
                })
                .then(() => history.push('/interviews'))
                .catch(err => {
                    setErrors(err.response.data);
                    setIsLoading(false);
                });
        }
    };

    return (
        <>
            <CustomDialog
                text="Are you sure you want to delete this?"
                isOpen={openDialog}
                onClose={() => setOpenDialog(false)}
                onConfirm={() => handleRemoveQuestion()}
            />

            <Typography variant="h5" gutterBottom component="div" my={2}>
                {id ? 'Update' : 'Add'} an Interview
            </Typography>

            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={4}>
                    <CustomSearchSelect
                        label="Student"
                        name="student"
                        error={!!errors.student}
                        helperText={errors.student}
                        availableOptions={studentOptions}
                        selectedValue={interview.student}
                        onChange={onChangeSearchSelect}
                        onTextChange={e => getStudents({ name: e && e.target.value })}
                    />
                </Grid>
                <Grid item xs={4}>
                    <CustomSearchSelect
                        label="Application"
                        name="application"
                        error={!!errors.application}
                        helperText={errors.application}
                        availableOptions={applicationOptions}
                        selectedValue={interview.application}
                        onChange={onChangeSearchSelect}
                        onTextChange={e => getApplications({ name: e && e.target.value })}
                    />
                </Grid>
                <Grid item xs={4}>
                    <CustomSelect
                        label="Status"
                        name="status"
                        error={!!errors.status}
                        helperText={errors.status}
                        selectedValue={interview.status}
                        onChange={handleOnchange}
                        options={interviewStatusOptions}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={3}>
                    <CustomSelect
                        label="Type"
                        name="interview_type"
                        error={!!errors.interview_type}
                        helperText={errors.interview_type}
                        selectedValue={interview.interview_type}
                        onChange={handleOnchange}
                        options={interviewTypeOptions}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomSelect
                        label="Round"
                        name="round"
                        error={!!errors.round}
                        helperText={errors.round}
                        selectedValue={interview.round}
                        onChange={handleOnchange}
                        options={interviewRoundOptions}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomTextField
                        label="Support Tutor"
                        name="support_tutor"
                        error={!!errors.support_tutor}
                        helperText={errors.support_tutor}
                        value={interview.support_tutor}
                        onChange={handleOnchange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomSelect
                        label="Student Timezone Portal"
                        name="student_timezone"
                        error={!!errors.student_timezone}
                        helperText={errors.student_timezone}
                        selectedValue={interview.student_timezone}
                        onChange={handleOnchange}
                        options={studentTimezoneOptions}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2} marginBottom={2}>
                <Grid item>
                    <CustomDateTimePicker
                        name="ist_scheduled_at"
                        label="IST Scheduled Date Time"
                        error={!!errors.ist_scheduled_at}
                        helperText={errors.ist_scheduled_at}
                        value={interview.ist_scheduled_at}
                        onChange={onChangeDate}
                    />
                </Grid>
                <Grid item>
                    <CustomDateTimePicker
                        name="student_scheduled_at"
                        label="Student Scheduled Date Time"
                        error={!!errors.student_scheduled_at}
                        helperText={errors.student_scheduled_at}
                        value={interview.student_scheduled_at}
                        onChange={onChangeDate}
                    />
                </Grid>
                <Grid item>
                    <CustomDateTimePicker
                        name="submission_date"
                        label="Submission Date"
                        error={!!errors.submission_date}
                        helperText={errors.submission_date}
                        value={interview.submission_date}
                        onChange={onChangeDate}
                    />
                </Grid>
                <Grid item xs={4}>
                    <CustomTextField
                        label="Recording URL"
                        name="recording_url"
                        error={!!errors.recording_url}
                        helperText={errors.recording_url}
                        value={interview.recording_url}
                        onChange={handleOnchange}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={12}>
                    <CustomTextArea
                        name="note"
                        error={!!errors.note}
                        helperText={errors.note}
                        value={interview.note}
                        placeholder="Note"
                        onChange={handleOnchange}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={12} container direction="row" justifyContent="flex-end" alignItems="center">
                    <CustomLoadingButton
                        onClick={handleAddQuestion}
                        variant="contained"
                        text={'Add Question'}
                        startIcon={<AddIcon />}
                    ></CustomLoadingButton>
                </Grid>
            </Grid>

            {interview.interview_questions.map((question, index) => {
                return (
                    <Grid container spacing={2} marginBottom={2} key={index}>
                        <Grid item xs={11}>
                            <TextField
                                fullWidth
                                label="Questions"
                                value={question.question}
                                onChange={(e) => handleInputChange(e, index)}
                            />
                        </Grid>
                        <Grid item xs={1} container direction="row" justifyContent="center" alignItems="center">
                            <DeleteIcon onClick={() => {
                                setOpenDialog(true)
                                setSelectedQuestion({
                                    id: question.id || null,
                                    index
                                })
                            }} sx={{ fontSize: 40, color: '#ff0000' }} />
                        </Grid>
                    </Grid>
                );
            })}

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

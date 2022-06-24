import { Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import CustomButton from '../../components/form/CustomButton';
import CustomLoadingButton from '../../components/form/CustomLoadingButton';
import CustomTextArea from '../../components/form/CustomTextArea';
import CustomTextField from '../../components/form/CustomTextField';
import applicationRequest from '../../requests/application-request';
import studentRequest from '../../requests/student-request';
import userRequest from '../../requests/user-request';

const AddUpdate = () => {
    const history = useHistory();
    let { id } = useParams();
    const [isLoading, setIsLoading] = useState(!!id);

    const [studentOptions, setStudentOptions] = useState([]);
    const [userOptions, setUserOptions] = useState([]);

    const [application, setApplication] = useState({
        student: { key: '', value: '' },
        status: 'applied',
        user: { key: '', value: '' },
        company_name: '',
        note: ''
    });

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (id) {
            applicationRequest.find(id).then(res => {
                setApplication({
                    ...res,
                    user: res.user ? { key: res.user.id, value: res.user.user_name } : null
                });
                setIsLoading(false);

                let studentOpt = res.student
                    ? [
                          {
                              value: res.student.name
                          }
                      ]
                    : [];
                setStudentOptions(studentOpt);

                let userOpt = res.user
                    ? [
                          {
                              key: res.user.id,
                              value: res.user.user_name
                          }
                      ]
                    : [];
                setUserOptions(userOpt);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnchange = e => {
        const { name, value } = e.target;
        setApplication(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onChangeSearchSelect = (value, name) => {
        setApplication(prev => ({
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

    const getUsers = async filter => {
        userRequest.index(filter).then(res => {
            let newOptions = res.results.length
                ? res.results.map(option => {
                      return {
                          key: option.id,
                          value: option.user_name
                      };
                  })
                : [];
            setUserOptions(newOptions);
        });
    };

    const onSubmit = () => {
        setIsLoading(true);
        if (id) {
            applicationRequest
                .update(id, {
                    ...application,
                    user: application.user.key
                })
                .then(() => history.goBack())
                .catch(err => {
                    setErrors(err.response.data);
                    setIsLoading(false);
                });
        } else {
            applicationRequest
                .store({
                    ...application,
                    user: application.user.key
                })
                .then(res => history.goBack())
                .catch(err => {
                    setErrors(err.response.data);
                    setIsLoading(false);
                });
        }
    };

    return (
        <>
            <Typography variant="h5" gutterBottom component="div" my={2} sx={{
                textAlign: 'center',
                margin: '2w 0vw'
            }}>
                {id ? 'Update Forum' : 'Forum App'}
            </Typography>

            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={3}>
                <Grid item xs={10}>
                    <CustomTextField
                        name="company_name"
                        error={!!errors.company_name}
                        helperText={errors.company_name}
                        value={application.company_name}
                        onChange={handleOnchange}
                        label="Name"
                    />
                </Grid>
                </Grid>
                {/* <Grid item xs={3}>
                    <CustomSelect
                        label="Status"
                        name="status"
                        error={!!errors.status}
                        helperText={errors.status}
                        selectedValue={application.status}
                        onChange={handleOnchange}
                        options={statusOptions}
                    />
                </Grid> */}
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={6}>
                    <CustomTextArea
                        name="note"
                        error={!!errors.note}
                        helperText={errors.note}
                        value={application.note}
                        placeholder="Body"
                        onChange={handleOnchange}
                    />
                </Grid>
            </Grid>

            <Stack spacing={2} direction="row">
                <CustomLoadingButton
                    onClick={onSubmit}
                    loading={isLoading}
                    variant="contained"
                    text={id ? 'Update' : 'POST'}
                ></CustomLoadingButton>
                <CustomButton text="Cancel" variant="outlined" onClick={() => history.push('/applications')} />
            </Stack>
        </>
    );
};

export default AddUpdate;

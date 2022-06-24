import { Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import CustomLoadingButton from '../../components/form/CustomLoadingButton';
import CustomButton from '../../components/form/CustomButton';
import CustomSelect from '../../components/form/CustomSelect';
import CustomTextField from '../../components/form/CustomTextField';
import { adminPermissionOptions, adminRoleOptions, adminStatusOptions } from '../../constants';
import userRequest from '../../requests/user-request';

const AddUpdate = () => {
    const history = useHistory();
    let { id } = useParams();
    const [isLoading, setIsLoading] = useState(!!id);
    
    const [admin, setAdmin] = useState({
        user_name: '',
        email: '',
        status: '',
        role: '',
        permission: '',
        password: '',
        confirm_password: ''
    });

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (id) {
            userRequest.find(id).then(res => {
                setAdmin(prev => ({
                    ...prev,
                    ...res
                }));
                setIsLoading(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnchange = e => {
        const { name, value } = e.target;
        setAdmin(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmit = () => {
        setIsLoading(true);
        if (admin.password !== admin.confirm_password) {
            setErrors(prev => ({
                ...prev,
                confirm_password: ['Your password and confirmation password do not match.']
            }));
            setIsLoading(false);
            return;
        }
        if (id) {
            userRequest
                .update(id, admin)
                .then(() => history.goBack())
                .catch(err => {
                    setErrors(err.response.data);
                    setIsLoading(false);
                });
        } else {
            userRequest
                .store(admin)
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
                {id ? 'Update' : 'Add'} an admin
            </Typography>

            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={3}>
                    <CustomTextField
                        name="user_name"
                        error={!!errors.user_name}
                        helperText={errors.user_name}
                        value={admin.user_name}
                        onChange={handleOnchange}
                        label="Username"
                    />
                </Grid>

                <Grid item xs={3}>
                    <CustomTextField
                        name="email"
                        error={!!errors.email}
                        helperText={errors.email}
                        value={admin.email}
                        onChange={handleOnchange}
                        label="Email"
                    />
                </Grid>

                <Grid item xs={3}>
                    <CustomSelect
                        label="Status"
                        name="status"
                        error={!!errors.status}
                        helperText={errors.status}
                        selectedValue={admin.status}
                        onChange={handleOnchange}
                        options={adminStatusOptions}
                    />
                </Grid>

                <Grid item xs={3}>
                    <CustomSelect
                        label="Role"
                        name="role"
                        error={!!errors.role}
                        helperText={errors.role}
                        selectedValue={admin.role}
                        onChange={handleOnchange}
                        options={adminRoleOptions}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomSelect
                        label="Permission"
                        name="permission"
                        error={!!errors.permission}
                        helperText={errors.permission}
                        selectedValue={admin.permission}
                        onChange={handleOnchange}
                        options={adminPermissionOptions}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={6}>
                    <CustomTextField
                        name="password"
                        error={!!errors.password}
                        helperText={errors.password}
                        value={admin.password}
                        type="password"
                        onChange={handleOnchange}
                        label="Password"
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomTextField
                        name="confirm_password"
                        error={!!errors.confirm_password}
                        helperText={errors.confirm_password}
                        value={admin.confirm_password}
                        type="password"
                        onChange={handleOnchange}
                        label="Confirm Password"
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

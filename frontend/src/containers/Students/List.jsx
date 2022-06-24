import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import CustomButton from '../../components/form/CustomButton';
import StudentFilter from '../../components/students/StudentFilter';
import StudentTable from '../../components/students/StudentTable';
import { FormContext } from '../../contexts/FormContext';
import StudentRequest from '../../requests/student-request';
import { useQuery } from '../../hooks/useQuery';
import querystring from 'query-string';
import { studentsStatusOptions } from '../../constants';

const List = () => {
    const history = useHistory();
    const searchQuery = useQuery();
    const [students, setStudents] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const status = searchQuery.get('status');
    const [queries, setQueries] = useState({
        application_questionnaire_status: searchQuery.get('application_questionnaire_status') || '',
        course: searchQuery.get('course') || '',
        email: searchQuery.get('email') || '',
        github_status: searchQuery.get('github_status') || '',
        name: searchQuery.get('name') || '',
        partner: searchQuery.get('partner') || '',
        phone: searchQuery.get('phone') || '',
        resume_questionnaire_status: searchQuery.get('resume_questionnaire_status') || '',
        resume_status: searchQuery.get('resume_status') || '',
        status: status ? studentsStatusOptions.filter(s=> status.split(',').includes(s.key)) : [],

        wakeupserver_status: searchQuery.get('applied_by') || ''
    });
    const [page, setPage] = useState(+searchQuery.get('page') || 1);

    const handleQueryString = ({ page = 1 }) => {
        const queriesObject = {
            ...queries,
            status: queries.status.length > 0 ? queries.status.map(s=> s.key).join(',') : '',

            page
        };
        history.replace({
            pathname: 'students',
            search: querystring.stringify(queriesObject, { skipEmptyString: true, skipNull: true })
        });
        return queriesObject;
    };

    const handlePageChange = (e, value) => {
        handleQueryString({ page: value });
        setPage(value);
    };

    const onChangeHandler = e => {
        const { value, name } = e.target;
        const status = name === 'status' ? (typeof value === 'string' ? value.split(',') : value) : queries.status;

        setQueries({
            ...queries,
            [name]: value,
            status
        });
    };

    const onDeleteHandler = (e, item) => {
        setQueries({
            ...queries, 
            status: queries.status.filter(s => s.key !== item.key )
        });
    };

    const submitSearch = () => {
        setIsLoading(true);
        setPage(1);
        const queriesObject = handleQueryString({ page: 1 });
        StudentRequest.index(queriesObject).then(response => {
            setStudents(response);
            setIsLoading(false);
        });
    };

    const clearSearch = () => {
        setIsLoading(true);
        setPage(1);
        StudentRequest.index({ page }).then(response => {
            setStudents(response);
            setIsLoading(false);
        });
        setQueries({
            application_questionnaire_status: '',
            course: '',
            email: '',
            github_status: '',
            name: '',
            partner: '',
            phone: '',
            resume_questionnaire_status: '',
            resume_status: '',
            status: [],
            wakeupserver_status: ''
        });
        history.replace('/students');
    };

    useEffect(() => {
        let isSubscribed = true;
        StudentRequest.index({
            ...queries,
            status: queries.status.length > 0 ? queries.status.map(s => s.key).join(',') : '',
            page
        }).then(response => {
            if (isSubscribed) {
                setStudents(response);
                setIsLoading(false);
            }
        });
        return () => (isSubscribed = false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return (
        <>
            <FormContext.Provider
                value={{
                    clearSearch,
                    isLoading,
                    onChangeHandler,
                    queries,
                    onDeleteHandler,
                    submitSearch
                }}
            >
                <StudentFilter />
            </FormContext.Provider>

            <Grid container direction="row" justifyContent="flex-end" alignItems="center" mt={3}>
                <CustomButton
                    text="Add an Student"
                    variant="contained"
                    onClick={() => history.push('/students/create')}
                />
            </Grid>
            <StudentTable isLoading={isLoading} students={students} page={page} handlePageChange={handlePageChange} />
        </>
    );
};

export default List;

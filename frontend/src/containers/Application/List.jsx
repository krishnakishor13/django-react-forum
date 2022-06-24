import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import ApplicationFilter from '../../components/applications/ApplicationFilter';
import ApplicationTable from '../../components/applications/ApplicationTable';
import CustomButton from '../../components/form/CustomButton';
import { FormContext } from '../../contexts/FormContext';
import ApplicationRequest from '../../requests/application-request';
import { useQuery } from '../../hooks/useQuery';
import querystring from 'query-string';
import { statusOptions } from '../../constants';
import AddUpdate from './AddUpdate';

const List = () => {
    const history = useHistory();
    const searchQuery = useQuery();
    const [applications, setApplications] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const status = searchQuery.get('status');
    const [queries, setQueries] = useState({
        status: status ? statusOptions.filter(s=> status.split(',').includes(s.key)) : [],
        company_name: searchQuery.get('company_name') || '',
    });
    const [querySelect, setQuerySelect] = useState({
        user: JSON.parse(searchQuery.get('user')) || { value: '', keys: '' }
    });
    const [queryDateRange, setQueryDateRange] = useState({
        start_date: searchQuery.get('start_date') || null,
        end_date: searchQuery.get('end_date') || null
    });
    const [page, setPage] = useState(+searchQuery.get('page') || 1);

    const handleQueryString = ({ page = 1 }) => {
        const queriesObject = {
            ...queries,
            ...queryDateRange,
            status: queries.status.length > 0 ? queries.status.map(s=> s.key).join(',') : '',
            page
        };
        history.replace({
            pathname: 'home',
            search: querystring.stringify(
                {
                    ...queriesObject,
                    user: querySelect.user.key ? JSON.stringify(querySelect.user) : ''
                },
                { skipEmptyString: true, skipNull: true }
            )
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
    
    const onChangeSearchSelect = (value, name) => {
        setQuerySelect({
            ...querySelect,
            [name]: value
        });
    };

    const onChangeDateRange = (start_date, end_date) => {
        setQueryDateRange({
            ...queryDateRange,
            start_date,
            end_date
        });
    };

    const submitSearch = () => {
        setIsLoading(true);
        setPage(1);
        const queriesObject = handleQueryString({ page: 1 });
        ApplicationRequest.index({
            ...queriesObject,
            user: querySelect.user.key
        }).then(response => {
            setApplications(response);
            setIsLoading(false);
        });
    };

    const clearSearch = () => {
        setIsLoading(true);
        setPage(1);
        ApplicationRequest.index({ page }).then(response => {
            setApplications(response);
            setIsLoading(false);
        });
        setQueries({
            status: [],
            company_name: '',
        });
        setQuerySelect({ user: { value: '', key: '' } });
        setQueryDateRange({ start_date: null, end_date: null });
        history.replace('/applications');
    };

    useEffect(() => {
        let isSubscribed = true;
        ApplicationRequest.index({
            ...queries,
            ...queryDateRange,
            status: queries.status.length > 0 ? queries.status.map(s => s.key).join(',') : '',
            user: querySelect.user.key,
            page
        }).then(response => {
            if (isSubscribed) {
                setApplications(response);
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
                    onChangeDateRange,
                    onChangeHandler,
                    onChangeSearchSelect,
                    onDeleteHandler,
                    queries,
                    queryDateRange,
                    querySelect,
                    submitSearch
                }}
            >
                <AddUpdate />
            </FormContext.Provider>

            <Grid container direction="row" justifyContent="flex-end" alignItems="center" mt={3}>
                {/* <CustomButton
                    text="Add an Application"
                    variant="contained"
                    onClick={() => history.push('/applications/create')}
                /> */}
            </Grid>
            <ApplicationTable
                isLoading={isLoading}
                applications={applications}
                page={page}
                handlePageChange={handlePageChange}
            />
        </>
    );
};

export default List;

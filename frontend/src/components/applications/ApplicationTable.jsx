import { Avatar, Box, CircularProgress, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import { useHistory } from 'react-router';
import { getDateFormat } from '../../utils/common';
import CustomPagination from '../form/CustomPagination';

export default function ApplicationTable(props) {
    const history = useHistory();
    const { applications, page, handlePageChange, isLoading } = props;
    const totalPage = applications ? applications.total_pages : 0;
    const count = applications ? applications.count : 0;
    const perPage = applications ? applications.per_page : 0;
    const hasApplications = applications && applications.results && !!applications.results.length;

    return (
        <>
            {isLoading ? (
                <Box sx={{ display: 'flex', margin: '18px', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : hasApplications ? (
                <Grid sx={{ mt: 3 }} component={Paper}>
                    {applications.results.map(application => (
                        <>
                            <Grid
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: '2vw 0vw'
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-evenly',
                                        width: '50%'
                                    }}
                                >
                                    <Avatar />
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexDirection: 'column'
                                        }}
                                    ></div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <h1>{application.company_name}</h1>
                                        <p
                                            style={{
                                                fontSize: '10px',
                                                marginLeft: '1vw'
                                            }}
                                        >
                                            {getDateFormat({ date: application.created_at })}
                                        </p>
                                    </div>
                                    <p
                                        style={{ color: 'blue', cursor: 'progress' }}
                                        onClick={() =>
                                            history.push(`/applications/edit/${application.id}`, {
                                                id: application.id
                                            })
                                        }
                                    >
                                        Edit
                                    </p>
                                </div>
                                <div
                                    style={{
                                        marginLeft: '16vw',
                                        color: 'green'
                                    }}
                                >
                                    <h3>{application.note}</h3>
                                </div>
                            </Grid>
                            <hr />
                        </>
                    ))}
                    <CustomPagination
                        page={page}
                        handlePageChange={handlePageChange}
                        totalPage={totalPage}
                        count={count}
                        perPage={perPage}
                    />
                </Grid>
            ) : (
                <h3>NO DATA</h3>
            )}
        </>
    );
}

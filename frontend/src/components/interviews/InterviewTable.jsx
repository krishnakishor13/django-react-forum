import { Box, CircularProgress, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useHistory } from 'react-router';

import {
    interviewStatusColorOptions,
    interviewStatusOptions,
    interviewTypeOptions,
    studentTimezoneOptions
} from '../../constants';
import { getDateFormat, getStatusColor, getValueOption } from '../../utils/common';
import { StyledTableCell, StyledTableRow } from '../common/StyledTable';
import CustomButton from '../form/CustomButton';
import CustomPagination from '../form/CustomPagination';

export default function InterviewTable(props) {
    const { interviews, page, handlePageChange, isLoading } = props;
    const totalPage = interviews ? interviews.total_pages : 0;
    const perPage = interviews ? interviews.per_page : 0;
    const count = interviews ? interviews.count : 0;
    const hasInterviews = interviews && interviews.results && !!interviews.results.length;
    const history = useHistory();
    return (
        <>
            {isLoading ? (
                <Box sx={{ display: 'flex', margin: '18px', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : hasInterviews ? (
                <TableContainer sx={{ mt: 3 }} component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>No.</StyledTableCell>
                                <StyledTableCell align="center">Student</StyledTableCell>
                                <StyledTableCell align="center">Application Info</StyledTableCell>
                                <StyledTableCell align="center">Status</StyledTableCell>
                                <StyledTableCell align="center">Application Type</StyledTableCell>
                                <StyledTableCell align="center">Round</StyledTableCell>
                                <StyledTableCell align="center">Support Tutor</StyledTableCell>
                                <StyledTableCell align="center">IST Scheduled At</StyledTableCell>
                                <StyledTableCell align="center">Student Scheduled At</StyledTableCell>
                                <StyledTableCell align="center">Submission Date</StyledTableCell>
                                <StyledTableCell align="center">Creatd Date</StyledTableCell>
                                <StyledTableCell align="center">Interview Questions</StyledTableCell>

                                <StyledTableCell align="center">Edit</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {interviews.results.map(interview => (
                                <StyledTableRow key={interview.id}>
                                    <StyledTableCell
                                        sx="cursor:pointer"
                                        align="center"
                                        onClick={() => history.push(`/interviews/edit/${interview.id}`)}
                                    >
                                        {interview.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{interview.student.name}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        [{interview.application.company_name}]
                                        <br />
                                        {interview.application.position}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        style={{ color: getStatusColor(interviewStatusColorOptions, interview.status) }}
                                    >
                                        {getValueOption(interviewStatusOptions, interview.status)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {getValueOption(interviewTypeOptions, interview.interview_type)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{interview.round}</StyledTableCell>
                                    <StyledTableCell align="center">{interview.support_tutor}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {interview.ist_scheduled_at &&
                                            getDateFormat({ date: interview.ist_scheduled_at })}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {interview.student_scheduled_at &&
                                            getDateFormat({ date: interview.student_scheduled_at })}
                                        <br />
                                        {getValueOption(studentTimezoneOptions, interview.student_timezone)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {interview.submission_date &&
                                            getDateFormat({ date: interview.submission_date })}
                                        <br />
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {interview.created_at && getDateFormat({ date: interview.created_at })}
                                        <br />
                                    </StyledTableCell>

                                    <StyledTableCell align="center">{interview.interview_questions}</StyledTableCell>

                                    <StyledTableCell align="center">
                                        <CustomButton
                                            onClick={() => history.push(`/interviews/edit/${interview.id}`)}
                                            text="Edit"
                                            variant="outlined"
                                        />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <CustomPagination
                        page={page}
                        handlePageChange={handlePageChange}
                        totalPage={totalPage}
                        count={count}
                        perPage={perPage}
                    />
                </TableContainer>
            ) : (
                <Typography align="center" component="h2" variant="h6">
                    NO DATA
                </Typography>
            )}
        </>
    );
}

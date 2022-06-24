import { Box, CircularProgress } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useHistory } from 'react-router';

import {
    partnerStatusOptions,
    studentsCourseOptions,
    studentsGithubStatusOptions,
    studentsResumeQuestionnaireStatusOptions,
    studentsResumeStatusOptions,
    studentsStatusColorOptions,
    studentsStatusOptions,
    studentsWakeUpStatusOptions
} from '../../constants';
import { getDateFormat, getStatusColor, getValueOption, truncateString } from '../../utils/common';
import { StyledTableCell, StyledTableRow } from '../common/StyledTable';
import CustomButton from '../form/CustomButton';
import CustomPagination from '../form/CustomPagination';

export default function StudentTable(props) {
    const { students, page, handlePageChange, isLoading } = props;
    const totalPage = students ? students.total_pages : 0;
    const perPage = students ? students.per_page : 0;
    const count = students ? students.count : 0;
    const hasStudents = students && students.results && !!students.results.length;
    const history = useHistory();

    return (
        <>
            {isLoading ? (
                <Box sx={{ display: 'flex', margin: '18px', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : hasStudents ? (
                <TableContainer sx={{ mt: 3 }} component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">No.</StyledTableCell>
                                <StyledTableCell align="center">Student ID</StyledTableCell>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Email</StyledTableCell>
                                <StyledTableCell align="center">Phone</StyledTableCell>
                                <StyledTableCell align="center">Course</StyledTableCell>
                                <StyledTableCell align="center">Status</StyledTableCell>
                                <StyledTableCell align="center">Partner</StyledTableCell>
                                <StyledTableCell align="center">Resume Questionnaire Status</StyledTableCell>
                                <StyledTableCell align="center">Application Questionnaire Status</StyledTableCell>
                                <StyledTableCell align="center">Resume</StyledTableCell>
                                <StyledTableCell align="center">Portfolio</StyledTableCell>
                                <StyledTableCell align="center">Github Status</StyledTableCell>
                                <StyledTableCell align="center">Wake Up Server Status</StyledTableCell>
                                <StyledTableCell align="center">Created</StyledTableCell>
                                <StyledTableCell align="center">Edit</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.results.map(student => (
                                <StyledTableRow key={student.id}>
                                    <StyledTableCell
                                        sx="cursor:pointer"
                                        align="center"
                                        onClick={() =>
                                            history.push(`/students/edit/${student.id}`, {
                                                id: student.id
                                            })
                                        }
                                    >
                                        {student.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{student.student_id}</StyledTableCell>
                                    <StyledTableCell align="center">{student.name}</StyledTableCell>
                                    <StyledTableCell align="center">{student.email}</StyledTableCell>
                                    <StyledTableCell align="center">{student.phone}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {getValueOption(studentsCourseOptions, student.course)}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        style={{ color: getStatusColor(studentsStatusColorOptions, student.status) }}
                                    >
                                        {getValueOption(studentsStatusOptions, student.status)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {getValueOption(partnerStatusOptions, student.partner)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {getValueOption(
                                            studentsResumeQuestionnaireStatusOptions,
                                            student.resume_questionnaire_status
                                        )}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {getValueOption(
                                            studentsWakeUpStatusOptions,
                                            student.application_questionnaire_status
                                        )}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <a href={student.resume_url} rel="noreferrer" target="_blank">
                                            {truncateString(student.resume_url, 20)}
                                        </a>
                                        <br />
                                        {getValueOption(studentsResumeStatusOptions, student.resume_status)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <a href={student.portfolio_url} rel="noreferrer" target="_blank">
                                            {truncateString(student.portfolio_url, 20)}
                                        </a>
                                        <br />
                                        {getValueOption(studentsResumeStatusOptions, student.portfolio_status)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <a href={student.github_url} rel="noreferrer" target="_blank">
                                            {truncateString(student.github_url, 20)}
                                        </a>
                                        <br />
                                        {getValueOption(studentsGithubStatusOptions, student.github_status)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {getValueOption(studentsWakeUpStatusOptions, student.wakeupserver_status)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {getDateFormat({ date: student.created_at })}
                                    </StyledTableCell>

                                    <StyledTableCell align="center">
                                        <CustomButton
                                            onClick={() =>
                                                history.push(`/students/edit/${student.id}`, {
                                                    id: student.id
                                                })
                                            }
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
                <h3>NO DATA</h3>
            )}
        </>
    );
}


DATE_FORMAT = '%Y-%m-%d'
DATE_TIME_FORMAT = '%Y-%m-%d %H:%M:%S'

USER_STATUS = (
    ('active', 'Active'),
    ('deleted', 'Deleted')
)

USER_ROLE = (
    ('director', 'Director'),
    ('marketing', 'Marketing'),
    ('job_support', 'Job Support'),
    ('development', 'Development')
)

USER_PERMISSION = (
    ('normal', 'Normal'),
    ('manager', 'Manager')
)

GENDER = (
    ('male', 'Male'),
    ('female', 'Female')
)

STATUS = (
    ('graduated', 'Graduated'),
    ('preparing', 'Preaparing'),
    ('perpared_by_dev_team', 'Prepared by Developer Team'),
    ('started_application', 'Started Application'),
    ('pause_application', 'Pause Application'),
    ('got_offer', 'Got an Offer'),
    ('joined', 'Joined'),
    ('activated_payment', 'Activated Payment'),
    ('failed', 'Failed to Get a Job'),
    ('deleted', 'Deleted')
)

APPLICATION_QUESTIONNAIRE_STATUS = (
    ('not_yet', 'Not Yet'),
    ('done', 'Done')
)

PORTFOLIO_STATUS = (
    ('not_started', 'Not Started Creating'),
    ('on_progress', 'On Progress'),
    ('done', 'Done by Developer Team'),
    ('reviewed', 'Reviewed by Job Support')
)

RESUME_STATUS = (
    ('not_started', 'Not Started Creating'),
    ('on_progress', 'On Progress'),
    ('done', 'Done by Developer Team'),
    ('reviewed', 'Reviewed by Job Support')
)

RESUME_QUESTIONNAIRE_STATUS = (
    ('not_yet', 'Not Yet'),
    ('done', 'Done')
)

GITHUB_STATUS = (
    ('not_started', 'Not Started Creating'),
    ('on_progress', 'On Progress'),
    ('done', 'Done by Developer Team'),
    ('reviewed', 'Reviewed by Job Support')
)

WAKEUP_SERVER_STATUS = (
    ('not_yet', 'Not Yet'),
    ('done', 'Done')
)

COURSE = (
    ('web', 'Web Development'),
    ('data', 'Data Science')
)

APPLIED_BY = (
    ('tech_is', 'TECH I.S.'),
    ('student', 'Student')
)

APPLICATIONS_STATUS = (
    ('applied', 'Applied'),
    ('offered', 'Offered'),
    ('deleted', 'Deleted')
)

STATE = (
    ('alabama', 'Alabama'),
    ('alaska', 'Alaska'),
    ('arizona', 'Arizona'),
    ('arkansas', 'Arkansas'),
    ('california', 'California'),
    ('colorado', 'Colorado'),
    ('connecticut', 'Connecticut'),
    ('delaware', 'Delaware'),
    ('florida', 'Florida'),
    ('georgia', 'Georgia'),
    ('hawaii', 'Hawaii'),
    ('idaho', 'Idaho'),
    ('illinoisIndiana', 'IllinoisIndiana'),
    ('iowa', 'Iowa'),
    ('kansas', 'Kansas'),
    ('kentucky', 'Kentucky'),
    ('louisiana', 'Louisiana'),
    ('maine', 'Maine'),
    ('maryland', 'Maryland'),
    ('massachusetts', 'Massachusetts'),
    ('michigan', 'Michigan'),
    ('minnesota', 'Minnesota'),
    ('mississippi', 'Mississippi'),
    ('missouri', 'Missouri'),
    ('montanaNebraska', 'MontanaNebraska'),
    ('nevada', 'Nevada'),
    ('new_hampshire', 'New Hampshire'),
    ('new_jerse', 'New Jerse'),
    ('new_mexico', 'New Mexico'),
    ('new_york', 'New York'),
    ('north_carolina', 'North Carolina'),
    ('north_dakota', 'North Dakota'),
    ('ohio', 'Ohio'),
    ('oklahoma', 'Oklahoma'),
    ('oregon', 'Oregon'),
    ('pennsylvaniaRhode_island', 'PennsylvaniaRhode Island'),
    ('south_carolina', 'South Carolina'),
    ('south_dakota', 'South Dakota'),
    ('tennessee', 'Tennessee'),
    ('texas', 'Texas'),
    ('utah', 'Utah'),
    ('vermont', 'Vermont'),
    ('virginia', 'Virginia'),
    ('washington', 'Washington'),
    ('west_virginia', 'West Virginia'),
    ('wisconsin', 'Wisconsin'),
    ('wyoming', 'Wyoming')
)

JOB_PORTAL = (
    ('linkedin', 'LinkedIn'),
    ('indeed', 'Indeed'),
    ('monster', 'Monster'),
    ('glassdoor', 'Glassdoor'),
    ('work_day', 'Work Day'),
    ('smart_work', 'Smart Work'),
    ('dice', 'Dice'),
    ('other', 'Other')
)
INTERVIEW_STATUS = (
    ('scheduling', 'Scheduling'),
    ('scheduled', 'Scheduled'),
    ('working', 'Working'),
    ('done', 'Done and Waiting for the Result'),
    ('sent_reminder', 'Sent Reminder'),
    ('canceled', 'Canceled Interview by Company'),
    ('missed', 'Missed Interview by Student'),
    ('got_other_offer', 'Did not Attend Because of another offer'),
    ('rejected', 'Rejected'),
    ('passed', 'Passed'),
    ('offered', 'Offered'),
    ('deleted', 'Deleted')
)
INTERVIEW_TYPE = (
    ('phone_call', 'Phone call'),
    ('assessment_real_time', 'Assessment Real Time'),
    ('assessment_submit', 'Assessment Submit'),
    ('video_call', 'Video Call'),
    ('onsite_interview', 'Onsite Interview'),
)
INTERVIEW_STUDENT_TIMEZONE = (
    ('usa_eastern', 'USA/Eastern'),
    ('usa_central', 'USA/Central'),
    ('usa_mountain', 'USA/Mountain'),
    ('usa_pacific', 'USA/Pacific'),
    ('usa_arizona', 'USA/Arizona'),
    ('usa_alaska', 'USA/Alaska'),
    ('usa_hawaii', 'USA/Hawaii'),
)

PARTNER = (
    ('meratas', 'Meratas'),
    ('leif', 'Leif')
)

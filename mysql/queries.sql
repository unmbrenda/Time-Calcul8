USE EZTime_Db_test;

INSERT INTO job_positions values(null,"analyst",20);
INSERT INTO job_positions values(null,"accountant",25);

INSERT INTO users values(null,"1","andy","ho","a@g.com","okokok");
INSERT INTO users values(null,"1","john","lag","p@g.com","ok12okok");
INSERT INTO users values(null,"2","jordan","a","ll@g.com","okokokfs");



select * from time_sheet;

Select 	a.employee_id,
		a.time_punch AS punchIN, 
		b.time_punch AS punchOUT,
		DAYNAME(b.time_punch) AS DAY_OF_WEEK,
        TIMEDIFF(b.time_punch,a.time_punch) AS hoursWORKED
FROM 
		time_sheet AS a
INNER JOIN
		time_sheet AS b
ON
		a.employee_id = b.employee_id
AND 
		DATE(a.time_punch) = DATE(b.time_punch)
WHERE
		a.punch_code = 'clockIn' 
	AND 
		b.punch_code = 'clockOut'
ORDER BY a.employee_id;



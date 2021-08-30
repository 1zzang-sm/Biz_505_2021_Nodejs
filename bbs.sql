-- % : 어디에서나 접근가능 
CREATE USER 'node'@'%' identified by '12341234';

-- 모든 권한 부여
GRANT ALL privileges ON *.*
TO 'node'@'%';

CREATE DATABASE nodeDB;
use nodeDB;
DESC tbl_bbs;
DROP TABLE tbl_bbs;

select * from tbl_bbs;
DESC tbl_replies;
drop table tbl_bbs;
drop table tbl_replies;
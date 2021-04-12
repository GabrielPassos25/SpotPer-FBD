CREATE DATABASE BDSpotPer
ON
	PRIMARY
	(
	NAME = 'app',
	FILENAME = 'C:\FBD\app.mdf',
	SIZE = 5120KB,
	FILEGROWTH = 1024KB
	),

	FILEGROUP app_fg01
	(
	NAME = 'app_001',
	FILENAME = 'C:\FBD\app_001.ndf',
	SIZE = 1024KB,
	FILEGROWTH = 30%
	),
	(
	NAME = 'app_002',
	FILENAME = 'C:\FBD\app_002.ndf',
	SIZE = 1024KB,
	MAXSIZE = 3072KB,
	FILEGROWTH = 15%
	),

	FILEGROUP app_fg02
	(
	NAME = 'app_003',
	FILENAME = 'C:\FBD\app_003.ndf',
	SIZE = 2048KB,
	MAXSIZE = 5120KB,
	FILEGROWTH = 1024KB
	)

	LOG ON 
	(
	NAME = 'app_log',
	FILENAME = 'C:\FBD\app_log.ldf',
	SIZE = 1024KB,
	FILEGROWTH = 10%
	)

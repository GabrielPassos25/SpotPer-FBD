use BDSpotPer

CREATE TABLE Gravadora
(
	cod SMALLINT NOT NULL,
	nome VARCHAR(20),
	endereco VARCHAR(50),
    home_page VARCHAR(80) NOT NULL,

	CONSTRAINT pk_codGravadora
	PRIMARY KEY (cod)

) ON app_fg01

CREATE TABLE Telefones
(
    num_fone VARCHAR(15) NOT NULL,
	cod_gravadora SMALLINT NOT NULL,
    tipo_fone varchar(10) NOT NULL,

    CONSTRAINT pk_num_fone_grav
    PRIMARY KEY (num_fone),

	CONSTRAINT fk_cod_fone_grav
	FOREIGN KEY (cod_gravadora)
	REFERENCES Gravadora
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
) ON app_fg01

CREATE TABLE Albuns
(
	cod SMALLINT NOT NULL,
	gravadora SMALLINT NOT NULL,
	tipo_compra VARCHAR(20),
	descricao VARCHAR(100),
	data_gravacao DATE NOT NULL,
	data_compra DATE NOT NULL,
	preco_compra DEC(8,2) NOT NULL,
	nome varchar(30) NOT NULL,

	CONSTRAINT pk_cod_album
	PRIMARY KEY (cod),

	CONSTRAINT fk_gravadora
	FOREIGN KEY (gravadora)
	REFERENCES Gravadora
	ON UPDATE NO ACTION
	ON DELETE CASCADE
) ON app_fg01

CREATE TABLE Composicao
(
	id SMALLINT NOT NULL,
	descricao VARCHAR(100),
	tipo VARCHAR(30)

	CONSTRAINT pk_idComp
	PRIMARY KEY (id)
) ON app_fg01

CREATE TABLE Faixas
(
	cod_album SMALLINT NOT NULL,
	posicao SMALLINT NOT NULL,
	tipo_composicao SMALLINT NOT NULL,
	tipo_gravacao CHAR(3),
	duracao SMALLINT NOT NULL,
	descricao VARCHAR(100),
	nome VARCHAR(40),
	link VARCHAR(80),
	vezes_tocada INT DEFAULT 0 NOT NULL,

	CONSTRAINT pk_cod_albumPosicao
	PRIMARY KEY NONCLUSTERED (cod_album, posicao),

	CONSTRAINT fk_cod_albumFaixa
	FOREIGN KEY (cod_album)
	REFERENCES Albuns
	ON UPDATE NO ACTION
	ON DELETE CASCADE,

	CONSTRAINT fk_tipoCompFaixa
	FOREIGN KEY (tipo_composicao)
	REFERENCES Composicao
	ON UPDATE NO ACTION
	ON DELETE NO ACTION,
) ON app_fg02

CREATE TABLE Compositor
(
	id SMALLINT NOT NULL,
	nome VARCHAR(40),
	local_nasc VARCHAR(20),
	data_nasc DATE NOT NULL,
	data_morte DATE,

	CONSTRAINT pk_idCompositor
	PRIMARY KEY (id)
) ON app_fg01

CREATE TABLE Periodo_Musical
(
	cod SMALLINT NOT NULL,
	descricao VARCHAR(100),
	data_inicio Date NOT NULL,
	data_fim Date

	CONSTRAINT pk_cod_periodoM
	PRIMARY KEY (cod)
) ON app_fg01

CREATE TABLE Compos_Periodo
(
	cod_comp SMALLINT NOT NULL,
	cod_per SMALLINT NOT NULL,

	CONSTRAINT pk_CompPeriodoM
	PRIMARY KEY (cod_comp, cod_per),

	CONSTRAINT fk_cod_compPer
	FOREIGN KEY (cod_comp)
	REFERENCES Compositor
	ON UPDATE NO ACTION
	ON DELETE NO ACTION,

	CONSTRAINT fk_cod_perComp
	FOREIGN KEY (cod_per)
	REFERENCES Periodo_Musical
	ON UPDATE NO ACTION
	ON DELETE NO ACTION,
) ON app_fg01

CREATE TABLE Faixa_Compositor
(
	cod_album SMALLINT NOT NULL,
	posicao SMALLINT NOT NULL,
	cod_comp SMALLINT NOT NULL

	CONSTRAINT pk_codFaixaComp
	PRIMARY KEY (cod_comp, cod_album, posicao),

	CONSTRAINT fk_FaixaComp
	FOREIGN KEY (cod_album, posicao)
	REFERENCES Faixas
	ON UPDATE NO ACTION
	ON DELETE NO ACTION,

	CONSTRAINT fk_CompFaixa
	FOREIGN KEY (cod_comp)
	REFERENCES Compositor
	ON UPDATE NO ACTION
	ON DELETE NO ACTION,
) ON app_fg01

CREATE TABLE Interprete
(
	id SMALLINT NOT NULL,
	nome VARCHAR(40),
	tipo VARCHAR(10),

	CONSTRAINT pk_id_interprete
	PRIMARY KEY (id)
) ON app_fg01

CREATE TABLE Faixa_Interprete
(
	cod_album SMALLINT NOT NULL,
	posicao SMALLINT NOT NULL,
	id_interp SMALLINT NOT NULL

	CONSTRAINT pk_codFaixaInterp
	PRIMARY KEY (id_interp, cod_album, posicao),

	CONSTRAINT fk_FaixaInterp
	FOREIGN KEY (cod_album, posicao)
	REFERENCES Faixas
	ON UPDATE NO ACTION
	ON DELETE NO ACTION,

	CONSTRAINT fk_InterpFaixa
	FOREIGN KEY (id_interp)
	REFERENCES Interprete
	ON UPDATE NO ACTION
	ON DELETE NO ACTION,
) ON app_fg01

CREATE TABLE Playlist
(
	id SMALLINT NOT NULL,
	nome VARCHAR(40),
	tempo_exec INT NOT NULL,
	data_criacao DATE NOT NULL,

	CONSTRAINT pk_id_playlist
	PRIMARY KEY (id)
) ON app_fg02

CREATE TABLE Faixa_Playlist
(
	cod_album SMALLINT NOT NULL,
	posicao SMALLINT NOT NULL,
	id_playlist SMALLINT NOT NULL,
	data_ultima DATE NOT NULL,
	num_tocada INT DEFAULT 0 NOT NULL,

	CONSTRAINT pk_codFaixaPlaylist
	PRIMARY KEY (id_playlist, cod_album, posicao),

	CONSTRAINT fk_FaixaPlaylist
	FOREIGN KEY (cod_album, posicao)
	REFERENCES Faixas
	ON UPDATE NO ACTION
	ON DELETE NO ACTION,

	CONSTRAINT fk_PlaylistFaixa
	FOREIGN KEY (id_playlist)
	REFERENCES Playlist
	ON UPDATE NO ACTION
	ON DELETE NO ACTION,
) ON app_fg02

CREATE TABLE Usuario
(
	email varchar(50) NOT NULL,
	username varchar(30) NOT NULL unique,
	password varchar(70) NOT NULL,
	
	CONSTRAINT fk_Usuario
	PRIMARY KEY (email),
) ON app_fg01
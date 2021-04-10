CREATE TRIGGER tr1 ON Faixa_Compositor
	FOR INSERT,UPDATE
AS
	IF
	(SELECT f.tipo_gravacao FROM Faixas f JOIN Faixa_Compositor fc ON fc.cod_album=f.cod_album JOIN Compositor c ON c.id=fc.cod_comp 
		JOIN Compos_Periodo cp ON cp.cod_comp=c.id JOIN Periodo_Musical pm ON cp.cod_per=pm.cod
	WHERE pm.descricao LIKE '_arroco') != 'DDD'
	
	BEGIN
		RAISERROR('Tipo de gravaçao invalido para barroco', 16, 1)
		ROLLBACK TRANSACTION
	END 


CREATE TRIGGER tr2 ON Faixas
	FOR INSERT,UPDATE
AS
	IF
	(SELECT COUNT(*) FROM inserted i JOIN Albuns al ON i.cod_album=al.cod GROUP BY al.cod) > 64
	
	BEGIN
		RAISERROR('Excesso de faixas', 16, 1)
		ROLLBACK TRANSACTION
	END 


CREATE TRIGGER tr3 ON Albuns
	FOR INSERT,UPDATE
AS
	IF
	(SELECT data_compra FROM Albuns) >= '2000-01-01'
	
	BEGIN
		RAISERROR('Data de compra inválida',16,1)
		ROLLBACK TRANSACTION
	END 


CREATE TRIGGER tr4 ON Faixas
	FOR INSERT,UPDATE
AS
	IF
	(SELECT tipo_gravacao FROM Faixas) != 'ADD' or 
	(SELECT tipo_gravacao FROM Faixas) != 'DDD'
	
	BEGIN
		RAISERROR('Tipo de gravação inválido!',16,1)
		ROLLBACK TRANSACTION
	END 


CREATE TRIGGER tr1 ON Faixa_Compositor
	FOR INSERT,UPDATE
AS
	IF
	(SELECT f.tipo_gravacao FROM Faixas f JOIN inserted i ON i.cod_album=f.cod_album AND i.posicao=f.posicao JOIN Compositor c ON c.id=i.cod_comp 
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
	(SELECT data_compra FROM inserted) <= '2000-01-01'
	
	BEGIN
		RAISERROR('Data de compra inválida',16,1)
		ROLLBACK TRANSACTION
	END 

CREATE TRIGGER tr4 ON Faixas
	FOR INSERT,UPDATE
AS
	IF
	(SELECT tipo_gravacao FROM inserted) != 'ADD' AND
	(SELECT tipo_gravacao FROM inserted) != 'DDD'
	
	BEGIN
		RAISERROR('Tipo de gravação inválido!',16,1)
		ROLLBACK TRANSACTION
	END 
export default [
    {
        name: "Nome",
        selector: "nome",
        sortable: true,
        backgroundColor:'#E3E1E1',
        center:true
    },
    {
        name: "Artista",
        selector: "descricao",
        sortable: true,
        center:true
    },
    {
        name: "Duração",
        selector: "duracao",
        sortable: true,
        center:true,
        format: (row)=>Math.floor(Number(row.duracao)/60) + ':' + Number(row.duracao)%60
    },
];
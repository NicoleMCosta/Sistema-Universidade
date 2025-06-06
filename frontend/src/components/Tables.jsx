import React, {useState,useEffect} from 'react';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import { Cadastrar_professor } from './CadastroForms';
import {Update_aluno, Update_departamento, Update_professor, Update_projeto} from './UpdateForms';

export function ProfessoresTables({selectedOption}){
    // const [professores, setProfessores] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);

    // useEffect(() => {
    //     fetch("/api/professores")
    //       .then((res) => res.json())
    //       .then((data) => setProfessores(data))
    //       .catch((err) => console.error("Erro ao buscar professores:", err));
    //   }, []);

    return (
    <div className="w-full">
        {/*CORPO DA TABLE*/}
        <div className="max-h-64 overflow-y-auto">
            <table className="table-auto w-full text-base text-left rtl:text-right">
                <thead className="text-gray-600">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Nome</th>
                        <th className="px-4 py-2">Idade</th>
                        <th className="px-4 py-2">Especialidade</th>
                        {/* <th className="px-4 py-2">Departamento</th> */}
                        <th className="px-4 py-2">Sala</th>
                        {/* <th className="px-4 py-2">Projetos</th> */}
                        <th className="px-4 py-2">Tempo</th>
                        <th className="px-4 py-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                {professores.map((prof) => (
                    <tr key={prof.numMatriculaProf} className="hover:bg-gray-300 text-gray-600">
                    <td className="px-4 py-2">{prof.numMatriculaProf}</td>
                    <td className="px-4 py-2 text-[#09192e]">{prof.nome}</td>
                    <td className="px-4 py-2">{prof.idade}</td>
                    <td className="px-4 py-2">{prof.especialidade_pesquisa}</td>
                    <td className="px-4 py-2">{prof.sala}</td>
                    <td className="px-4 py-2">{prof.tempo}</td>
                    <td className="px-4 py-2">
                        <div className="flex flex-row gap-5">
                        <RiDeleteBin6Fill onClick={()=>{console.log("O botão funciona")}} size={25} className="icon" />
                        <FaUserEdit onClick={() => setOpenUpdate(true)} size={25} className="icon" />
                        <Update_professor open={openUpdate} setOpen={setOpenUpdate} />
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
)}

export function AlunosTables({selectedOption}){
    const [alunos, setAlunos] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [alunoSelecionado, setAlunoSelecionado] = useState(null);

    useEffect(() => {
        fetch("/api/alunos")
          .then((res) => res.json())
          .then((data) => setAlunos(data))
          .catch((err) => console.error("Erro ao buscar alunos:", err));
      }, []);


    return (
        <div className="w-full">
            {/*CORPO DA TABLE*/}
            <div className="max-h-64 overflow-y-auto">
                <table className="table-auto w-full text-base text-left rtl:text-right">
                    <thead className="text-gray-600">
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Nome</th>
                            <th className="px-4 py-2">Idade</th>
                            <th className="px-4 py-2">Curso</th>
                            <th className="px-4 py-2">Departamento</th>
                            <th className="px-4 py-2">Aconselhador</th>
                            <th className="px-4 py-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    {alunos.map((aluno) => (
                        <tr key={aluno.id} className="hover:bg-gray-300 text-gray-600">
                        <td className="px-4 py-2">{aluno.id}</td>
                        <td className="px-4 py-2 text-[#09192e]">{aluno.nome}</td>
                        <td className="px-4 py-2">{aluno.idade}</td>
                        <td className="px-4 py-2">{aluno.tipo_curso}</td>
                        <td className="px-4 py-2">{aluno.numDept}</td>
                        <td className="px-4 py-2">{aluno.numMatricula_aconselhador}</td>
                        <td className="px-4 py-2">
                            <div className="flex flex-row gap-5">
                            <RiDeleteBin6Fill onClick={''} size={25} className="icon" />
                            <FaUserEdit onClick={() =>{setAlunoSelecionado(aluno); setOpenUpdate(true)}} size={25} className="icon" />
                            <Update_aluno open={openUpdate} setOpen={setOpenUpdate} />
                            </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
)}


export function DepartamentosTables({selectedOption}){
    const [depts, setDept] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);

    useEffect(() => {
        fetch("/api/departamentos")
          .then((res) => res.json())
          .then((data) => setDept(data))
          .catch((err) => console.error("Erro ao buscar departamentos:", err));
      }, []);


    return (
        <div className="w-full">
            {/*CORPO DA TABLE*/}
            <div className="max-h-64 overflow-y-auto">
                <table className="table-auto w-full text-base text-left rtl:text-right">
                    <thead className="text-gray-600">
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Nome</th>
                            <th className="px-4 py-2">Escritório Principal</th>
                            <th className="px-4 py-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    {depts.map((dept) => (
                        <tr key={dept.numDept} className="hover:bg-gray-300 text-gray-600">
                        <td className="px-4 py-2">{dept.numDept}</td>
                        <td className="px-4 py-2 text-[#09192e]">{dept.nome}</td>
                        <td className="px-4 py-2">{dept.escritorio_principal}</td>
                        <td className="px-4 py-2">
                            <div className="flex flex-row gap-5">
                            <RiDeleteBin6Fill onClick={''} size={25} className="icon" />
                            <FaUserEdit onClick={() => setOpenUpdate(true)} size={25} className="icon" />
                            <Update_departamento open={openUpdate} setOpen={setOpenUpdate} />
                            </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
)}

export function ProjetosTables({selectedOption}){
    const [projetos, setProjetos] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);

    useEffect(() => {
        fetch("/api/projetos")
          .then((res) => res.json())
          .then((data) => setProjetos(data))
          .catch((err) => console.error("Erro ao buscar projetos:", err));
      }, []);

    return (
        <div className="w-full">
            {/*CORPO DA TABLE*/}
            <div className="max-h-64 overflow-y-auto">
                <table className="table-auto w-full text-base text-left rtl:text-right">
                    <thead className="text-gray-600">
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Orgão Financiador</th>
                            <th className="px-4 py-2">Início</th>
                            <th className="px-4 py-2">Final</th>
                            <th className="px-4 py-2">Orçamento</th>
                            <th className="px-4 py-2">Pesquisador Principal</th>
                            <th className="px-4 py-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    {projetos.map((proj) => (
                        <tr key={proj.numProjeto} className="hover:bg-gray-300 text-gray-600">
                        <td className="px-4 py-2">{proj.numProjeto}</td>
                        <td className="px-4 py-2 text-[#09192e]">{proj.orgao_financiador}</td>
                        <td className="px-4 py-2">{proj.data_inicio}</td>
                        <td className="px-4 py-2">{proj.data_final}</td>
                        <td className="px-4 py-2">{proj.orcamento}</td>
                        <td className="px-4 py-2">{proj.pesquisador_principal}</td>
                        <td className="px-4 py-2">
                            <div className="flex flex-row gap-5">
                            <RiDeleteBin6Fill onClick={''} size={25} className="icon" />
                            <FaUserEdit onClick={() => setOpenUpdate(true)} size={25} className="icon" />
                            <Update_projeto open={openUpdate} setOpen={setOpenUpdate} />
                            </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
)}


//TABELA PARA TESTE

const professores = [
    {
        numMatriculaProf: 1,
        nome: "mariana",
        idade: 54,
        especialidade_pesquisa: "bacterias",
        sala: 12,
        tempo: 22
    },
    {
        numMatriculaProf: 1,
        nome: "mariana",
        idade: 54,
        especialidade_pesquisa: "bacterias",
        sala: 12,
        tempo: 22
    },
    {
        numMatriculaProf: 1,
        nome: "mariana",
        idade: 54,
        especialidade_pesquisa: "bacterias",
        sala: 12,
        tempo: 22
    },
    {
        numMatriculaProf: 1,
        nome: "mariana",
        idade: 54,
        especialidade_pesquisa: "bacterias",
        sala: 12,
        tempo: 22
    },
    {
        numMatriculaProf: 1,
        nome: "mariana",
        idade: 54,
        especialidade_pesquisa: "bacterias",
        sala: 12,
        tempo: 22
    },
    {
        numMatriculaProf: 1,
        nome: "mariana",
        idade: 54,
        especialidade_pesquisa: "bacterias",
        sala: 12,
        tempo: 22
    },
    {
        numMatriculaProf: 1,
        nome: "mariana",
        idade: 54,
        especialidade_pesquisa: "bacterias",
        sala: 12,
        tempo: 22
    },
    {
        numMatriculaProf: 1,
        nome: "mariana",
        idade: 54,
        especialidade_pesquisa: "bacterias",
        sala: 12,
        tempo: 22
    },

]

// const alunos = [
//     {
//         id: 2,
//         nome: "ana carousel",
//         idade: 23,
//         tipo_curso: "engenharia",
//         numDept: 1,
//         numMatricula_aconselhador: 3
//     },
//     {
//         id: 2,
//         nome: "ana carousel",
//         idade: 23,
//         tipo_curso: "engenharia",
//         numDept: 1,
//         numMatricula_aconselhador: 3
//     }
// ]
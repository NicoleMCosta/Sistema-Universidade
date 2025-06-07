import React, { useState, useEffect } from 'react';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import { Cadastrar_professor } from './CadastroForms';
import {Update_aluno, Update_departamento, Update_professor, Update_projeto} from './UpdateForms';

function DadosDashboard() {
  const [data, setData] = useState({ professores: [], estudantes: [], departamentos: [], projetos: [] });

  useEffect(() => {
  fetch("http://localhost:3000/api/dashboard")
    .then((res) => res.json())
    .then((data) => {
      console.log("dashboard carregado (dados do backend)", data);
      setData(data);
    })
    .catch((err) => console.error("Erro ao buscar dados do dashboard:", err));
}, []);
  return data;
}

export function ProfessoresTables({ searchTerm}) {
  const { professores } = DadosDashboard();

  const professoresFiltrados = professores.filter(prof =>
    prof.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="max-h-64 overflow-y-auto">
        <table className="table-auto w-full text-base text-left rtl:text-right">
          <thead className="text-gray-600">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">Idade</th>
              <th className="px-4 py-2">Especialidade</th>
              <th className="px-4 py-2">Sala</th>
              <th className="px-4 py-2">Tempo</th>
              <th className="px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {professoresFiltrados.map((prof) => (
              <tr key={prof.nummatriculaprof} className="hover:bg-gray-300 text-gray-600">
                <td className="px-4 py-2">{prof.nummatriculaprof}</td>
                <td className="px-4 py-2 text-[#09192e]">{prof.nome}</td>
                <td className="px-4 py-2">{prof.idade}</td>
                <td className="px-4 py-2">{prof.especialidade_pesquisa}</td>
                <td className="px-4 py-2">{prof.sala}</td>
                <td className="px-4 py-2">{prof.tempo}</td>
                <td className="px-4 py-2">
                  <div className="flex flex-row gap-5">
                    <RiDeleteBin6Fill onClick={() => <Cadastrar_professor />} size={25} className="icon" />
                    <FaUserEdit size={25} className="icon" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AlunosTables({ searchTerm }) {
  const { estudantes } = DadosDashboard();

  const estudantesFiltrados = estudantes.filter(estudante =>
    estudante.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
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
            {estudantesFiltrados.map((aluno) => (
              <tr key={aluno.nummatriculaestd} className="hover:bg-gray-300 text-gray-600">
                <td className="px-4 py-2">{aluno.nummatriculaestd}</td>
                <td className="px-4 py-2 text-[#09192e]">{aluno.nome}</td>
                <td className="px-4 py-2">{aluno.idade}</td>
                <td className="px-4 py-2">{aluno.tipo_curso}</td>
                <td className="px-4 py-2">{aluno.numDept}</td>
                <td className="px-4 py-2">{aluno.numMatricula_aconselhador}</td>
                <td className="px-4 py-2">
                  <div className="flex flex-row gap-5">
                    <RiDeleteBin6Fill onClick={''} size={25} className="icon" />
                    <FaUserEdit size={25} className="icon" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DepartamentosTables({ searchTerm }) {
  const { departamentos } = DadosDashboard();

  const departamentosFiltrados = departamentos.filter(departamento =>
    departamento.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
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
            {departamentosFiltrados.map((dept) => (
              <tr key={dept.numdept} className="hover:bg-gray-300 text-gray-600">
                <td className="px-4 py-2">{dept.numdept}</td>
                <td className="px-4 py-2 text-[#09192e]">{dept.nome}</td>
                <td className="px-4 py-2">{dept.escritorio_principal}</td>
                <td className="px-4 py-2">
                  <div className="flex flex-row gap-5">
                    <RiDeleteBin6Fill onClick={''} size={25} className="icon" />
                    <FaUserEdit size={25} className="icon" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ProjetosTables({ searchTerm }) {
  const { projetos } = DadosDashboard();

    const projetosFiltrados = projetos.filter(proj =>
        proj.numprojeto?.toString().includes(searchTerm)
    );

  return (
    <div className="w-full">
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
            {projetosFiltrados.map((proj) => (
              <tr key={proj.numprojeto} className="hover:bg-gray-300 text-gray-600">
                <td className="px-4 py-2">{proj.numprojeto}</td>
                <td className="px-4 py-2 text-[#09192e]">{proj.orgao_financiador}</td>
                <td className="px-4 py-2">{proj.data_inicio}</td>
                <td className="px-4 py-2">{proj.data_final}</td>
                <td className="px-4 py-2">{proj.orcamento}</td>
                <td className="px-4 py-2">{proj.pesquisador_principal}</td>
                <td className="px-4 py-2">
                  <div className="flex flex-row gap-5">
                    <RiDeleteBin6Fill onClick={''} size={25} className="icon" />
                    <FaUserEdit size={25} className="icon" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

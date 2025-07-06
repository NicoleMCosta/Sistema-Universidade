import React, { useState/*, useEffect*/} from 'react';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import {Update_aluno, Update_departamento, Update_professor, Update_projeto} from './UpdateForms';
import { DadosDashboard} from '../../utils/hooks';
import { useDeletar } from '../controllers/functions';


export function ProfessoresTables({ searchTerm}) {
  const { data, isPending } = DadosDashboard();
  const { mutate: deletarProfessor, isPending: isDeletando } = useDeletar('professores');
  const [professorSelecionado, setProfessorSelecionado] = useState(null);

  if (isPending || isDeletando) return <p>Loading...</p>;
  if (!data) return <p>Erro ao carregar dados.</p>;

  console.log("Professores recebidos:", data.professores);

  const professoresFiltrados = data.professores.filter(prof =>
    prof?.nome?.toLowerCase().includes(searchTerm.toLowerCase())
  );  

  function handleDelete(numMatriculaProf) {
  console.log("🧪 ID recebido no handleDelete:", numMatriculaProf);
    if (window.confirm('Deseja excluir esse professor?')) {
      deletarProfessor(numMatriculaProf);
    }
  }


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
              <tr key={prof.numMatriculaProf} className="hover:bg-gray-300 text-gray-600">
                <td className="px-4 py-2">{prof.numMatriculaProf}</td>
                <td className="px-4 py-2 text-[#09192e]">{prof.nome}</td>
                <td className="px-4 py-2">{prof.idade}</td>
                <td className="px-4 py-2">{prof.especialidade_pesquisa}</td>
                <td className="px-4 py-2">{prof.sala}</td>
                <td className="px-4 py-2">{prof.tempo}</td>
                <td className="px-4 py-2">
                  <div className="flex flex-row gap-5">
                    <RiDeleteBin6Fill onClick={() => handleDelete(prof.numMatriculaProf)} size={25} className="icon" />
                    <FaUserEdit size={25} className="icon" onClick={() => setProfessorSelecionado(prof)}/>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
            {professorSelecionado && (
                <Update_professor open={!!professorSelecionado} setOpen={() => setProfessorSelecionado(null)} professor={professorSelecionado}/>
            )}
      </div>
    </div>
  );
}

export function AlunosTables({ searchTerm }) {
  const { data, isPending } = DadosDashboard();
  const { mutate: deletarAluno, isPending: isDeletando } = useDeletar('estudantes');
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);

  if (isPending || isDeletando) return <p>Loading...</p>;
  if (!data) return <p>Erro ao carregar dados.</p>;

  function handleDelete(nummatriculaestd) {
    if (window.confirm('Deseja excluir esse aluno?')) {
      deletarAluno(nummatriculaestd);
    }
  }
  
  const estudantesFiltrados = data.estudantes.filter(estudante =>
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
              <tr key={aluno.numMatriculaEstd} className="hover:bg-gray-300 text-gray-600">
                <td className="px-4 py-2">{aluno.numMatriculaEstd}</td>
                <td className="px-4 py-2 text-[#09192e]">{aluno.nome}</td>
                <td className="px-4 py-2">{aluno.idade}</td>
                <td className="px-4 py-2">{aluno.tipo_curso}</td>
                <td className="px-4 py-2">{aluno.numdept}</td>
                <td className="px-4 py-2">{aluno.nummatricula_aconselhador}</td>
                <td className="px-4 py-2">
                  <div className="flex flex-row gap-5">
                    <RiDeleteBin6Fill onClick={() => handleDelete(aluno.numMatriculaEstd)} size={25} className="icon" />
                    <FaUserEdit size={25} className="icon" onClick={() => setAlunoSelecionado(aluno)}/>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {alunoSelecionado && (
                <Update_aluno open={!!alunoSelecionado} setOpen={() => setAlunoSelecionado(null)} aluno={alunoSelecionado}/>
            )}
      </div>
    </div>
  );
}

export function DepartamentosTables({ searchTerm }) {
  const { data, isPending } = DadosDashboard();
  const { mutate: deletarDepartamento, isPending: isDeletando } = useDeletar('departamentos');
  const [departamentoSelecionado, setDepartamentoSelecionado] = useState(null);

  if (isPending || isDeletando) return <p>Loading...</p>;
  if (!data) return <p>Erro ao carregar dados.</p>;

  function handleDelete(numdept) {
    if (window.confirm('Deseja excluir esse departamento?')) {
      deletarDepartamento(numdept);
    }
  }
  const departamentosFiltrados = data.departamentos.filter(departamento =>
      departamento?.nome?.toLowerCase().includes(searchTerm.toLowerCase())
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
              <tr key={dept.numDept} className="hover:bg-gray-300 text-gray-600">
                <td className="px-4 py-2">{dept.numDept}</td>
                <td className="px-4 py-2 text-[#09192e]">{dept.nome}</td>
                <td className="px-4 py-2">{dept.escritorio_principal}</td>
                <td className="px-4 py-2">
                  <div className="flex flex-row gap-5">
                    <RiDeleteBin6Fill onClick={() => handleDelete(dept.numDept)} size={25} className="icon" />
                    <FaUserEdit size={25} className="icon" onClick={() => setDepartamentoSelecionado(dept)}/>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {departamentoSelecionado && (
                <Update_departamento open={!!departamentoSelecionado} setOpen={() => setDepartamentoSelecionado(null)} departamento={departamentoSelecionado}/>
            )}
      </div>
    </div>
  );
}

export function ProjetosTables({ searchTerm }) {
  const { data, isPending } = DadosDashboard();
  console.log('Dados completos recebidos:', data);
  const { mutate: deletarProjetos, isPending: isDeletando } = useDeletar('projetos');
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);

  if (isPending || isDeletando) return <p>Loading...</p>;
  if (!data) return <p>Erro ao carregar dados.</p>;

  function handleDelete(numprojeto) {
    if (window.confirm('Deseja excluir esse projeto?')) {
      deletarProjetos(numprojeto);
    }
  }
    const projetosFiltrados = data?.projetos?.filter(proj => 
    proj.numProjeto?.toString().includes(searchTerm)
  ) || [];
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
              <tr key={proj.numProjeto} className="hover:bg-gray-300 text-gray-600">
                <td className="px-4 py-2">{proj.numProjeto}</td>
                <td className="px-4 py-2 text-[#09192e]">{proj.orgao_financiador}</td>
                <td className="px-4 py-2">{proj.data_inicio}</td>
                <td className="px-4 py-2">{proj.data_final}</td>
                <td className="px-4 py-2">{proj.orcamento}</td>
                <td className="px-4 py-2">{proj.pesquisador_principal}</td>
                <td className="px-4 py-2">
                  <div className="flex flex-row gap-5">
                    <RiDeleteBin6Fill onClick={() => handleDelete(proj.numProjeto)} size={25} className="icon" />
                    <FaUserEdit size={25} className="icon" onClick={() => setProjetoSelecionado(proj)}/>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {projetoSelecionado && (
                <Update_projeto open={!!projetoSelecionado} setOpen={() => setProjetoSelecionado(null)} projeto={projetoSelecionado}/>
            )}
      </div>
    </div>
  );
}

import React, {useState} from 'react';
import {ProfessoresTables, AlunosTables, DepartamentosTables, ProjetosTables} from './Tables.jsx';
import { Cadastrar_aluno, Cadastrar_professor, Cadastrar_projeto, Cadastrar_departamento} from './CadastroForms.jsx';



export default function Dashboard() {
  const [selectedOption, setSelectedOption] = useState('');
  const [dialogAberto, setDialogAberto] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  
  return (
    <div className="w-screen h-screen bg-gray-200 py-20 flex">
      <div className="flex-1 pt-10 pr-20 pl-20">
        {/* SEARCH BAR*/}
        <div className="flex px-4 py-3 rounded-md border-2 border-[#18365E] overflow-hidden max-w-md mx-auto mb-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-gray-600 mr-3 rotate-90">
            <path
              d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
            </path>
          </svg>
          <input type="searchbar" placeholder="Busca" className="w-full outline-none bg-transparent text-gray-600 text-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        {/* RADIO BUTTONS */}
        <div className="flex justify-center items-center gap-10">
          {/* RADIO PROF */}
          <div className="inline-flex items-center">
            <label className="flex items-center gap-2">
              <input type="radio" name="section" value="professores"
                checked={selectedOption === 'professores'}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              </span>
              <label className="ml-2 text-slate-600 cursor-pointer text-sm" htmlFor="professores">Professores</label>
            </label>
          </div>
          {/* RADIO ALUNOS */}
          <div className="inline-flex items-center">
            <label className="flex items-center gap-2">
              <input type="radio" name="section" value="alunos"
                checked={selectedOption === 'alunos'}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              </span>
              <label className="ml-2 text-slate-600 cursor-pointer text-sm" htmlFor="alunos">Alunos</label>
            </label>
          </div>
          {/* RADIO PROJETOS */}
          <div className="inline-flex items-center">
            <label className="flex items-center gap-2">
              <input type="radio" name="section" value="projetos"
                checked={selectedOption === 'projetos'}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              </span>
              <label className="ml-2 text-slate-600 cursor-pointer text-sm" htmlFor="projetos">Projetos</label>
            </label>
          </div>
          {/* RADIO DEPARTAMENTOS*/}
          <div className="inline-flex items-center">
            <label className="flex items-center gap-2">
              <input type="radio" name="section" value="departamentos"
                checked={selectedOption === 'departamentos'}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              </span>
              <label className="ml-2 text-slate-600 cursor-pointer text-sm" htmlFor="departamentos">Departamentos</label>
            </label>
          </div>
        </div>

        {/* TABLE PROFESSORES*/}
        {selectedOption === 'professores' && (
          <div className="bg-transparent p-10 rounded-xl mt-10">
              {/* BOTAO DE CADASTRAR */}
              <div className='flex justify-end items-center'>
                  <button onClick={() => setDialogAberto("professor")} className='botao_cad'>
                    Adicionar
                  </button>
              </div>   
            <h2 className="mt-10 text-3xl font-bold mb-5 text-[#18365E]">Professores</h2>
            <ProfessoresTables selectedOption={selectedOption} searchTerm={searchTerm}/>
            {dialogAberto === "professor" && (
              <Cadastrar_professor open={true} setOpen={() => setDialogAberto(null)} />
            )}
          </div>
        )}

        {/* TABLE ALUNOS*/}
        {selectedOption === 'alunos' && (
          <div className="bg-transparent p-10 rounded-xl mt-10">
              {/* BOTAO DE CADASTRAR */}
              <div className='flex justify-end items-center'>
                  <button onClick={() => setDialogAberto("aluno")} className='botao_cad'>
                    Adicionar
                  </button>
              </div>   
            <h2 className="mt-10 text-3xl font-bold mb-5 text-[#18365E]">Alunos</h2>
            <AlunosTables selectedOption={selectedOption} searchTerm={searchTerm}/>
            {dialogAberto === "aluno" && (
              <Cadastrar_aluno open={true} setOpen={() => setDialogAberto(null)} />
            )}
          </div>
        )}

        {/* TABLE DEPARTAMENTOS*/}
        {selectedOption === 'departamentos' && (
          <div className="bg-transparent p-10 rounded-xl mt-10">
              {/* BOTAO DE CADASTRAR */}
              <div className='flex justify-end items-center'>
                  <button onClick={() => setDialogAberto("departamento")} className='botao_cad'>
                    Adicionar
                  </button>
              </div>   
            <h2 className="mt-10 text-3xl font-bold mb-5 text-[#18365E]">Departamentos</h2>
            <DepartamentosTables selectedOption={selectedOption} searchTerm={searchTerm}/>
            {dialogAberto === "departamento" && (
              <Cadastrar_departamento open={true} setOpen={() => setDialogAberto(null)} />
            )}
          </div>
        )}

        {/* TABLE PROJETOS*/}
        {selectedOption === 'projetos' && (
          <div className="bg-transparent p-10 rounded-xl mt-10">
              {/* BOTAO DE CADASTRAR */}
              <div className='flex justify-end items-center'>
                  <button onClick={() => setDialogAberto("projeto")} className='botao_cad'>
                    Adicionar
                  </button>
              </div>   
            <h2 className="mt-10 text-3xl font-bold mb-5 text-[#18365E]">Projetos</h2>
            <ProjetosTables selectedOption={selectedOption} searchTerm={searchTerm}/>
            {dialogAberto === "projeto" && (
              <Cadastrar_projeto open={true} setOpen={() => setDialogAberto(null) } />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import {criarProfessor, criarAluno, criarDepartamento, criarProjeto} from '../controllers/functions';

export function Cadastrar_professor({open, setOpen}) {
  const handleOpen = () => setOpen((cur) => !cur);
  const queryClient = useQueryClient();

  const [info, setInfo] = useState({
    numMatriculaProf: '',
    nome: '',
    idade: '',
    especialidade_pesquisa:'',
    sala: '',
    tempo: '',
    numDept: ''
  });
  
  const handleFormChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    });
  }

  const mutation = useMutation({
    mutationFn: criarProfessor,
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries(['professores']);
    }
  });  

  const handleSubmit = (e) => { 
    e.preventDefault();
    mutation.mutate(info); 
  }

  return (
    <Dialog size="xs" open={open} handler={handleOpen} className='bg-transparent'>
      <div className="h-full p-10 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <CardBody className="flex flex-col gap-4">
            <div className='text-[#18365E]'>
              <p className='text-base text-gray-200 pb-2'>pressione 'Esc' para sair</p>
              <h2>Cadastrar <span className='destaque'>Professor</span></h2>
            </div>
            <div className='mb-10'>
              <input className="p-1.5 w-[100px] h-[40px] border-2 border-gray-100 text-base font-bold text-gray-600 rounded-xl bg-transparent" placeholder='ID'
                onChange={handleFormChange} name="numMatriculaProf" value={info.numMatriculaProf} />
            </div>
            <div className='flex-col w-full justify-between gap-4'>                 
              <div className='input'>
                <label className='font-medium text-gray-900'>Nome</label>
                <input className="input_plc" name='nome' onChange={handleFormChange} value={info.nome} placeholder='Ex: Marisa Montes'/>
              </div>
              <div className='input'>
                <label className='font-medium text-gray-900'>Idade</label>
                <input className="input_plc" name='idade' placeholder='Idade' onChange={handleFormChange} value={info.idade}/>
              </div>
              <div className='input'>
                <label className='font-medium text-gray-900'>Especialidade</label>
                <input className="input_plc" name='especialidade_pesquisa' placeholder='Ex: Teatro - Drama II' onChange={handleFormChange} value={info.especialidade_pesquisa}/>
              </div>
              <div className='input'>
                <label className='font-medium text-gray-900'>Sala</label>
                <input className="input_plc" name='sala' placeholder='Sala' onChange={handleFormChange} value={info.sala}/>
              </div>
              <div className='input'>
                <label className='font-medium text-gray-900'>Tempo</label>
                <input className="input_plc" name='tempo' placeholder='Horas totais' onChange={handleFormChange} value={info.tempo}/>
              </div>
              <div className='input'>
                <label className='font-medium text-gray-900'>Departamento</label>
                <input className="input_plc" name='numDept' placeholder='ID do Departamento' onChange={handleFormChange} value={info.numDept}/>
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleSubmit} fullWidth className='botao_cad mt-10'>
              Cadastrar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Dialog>
  )
}

export function Cadastrar_aluno({open, setOpen}) {
  const handleOpen = () => setOpen((cur) => !cur);
  const queryClient = useQueryClient();

  const [info, setInfo] = useState({
    numMatriculaEstd: '',
    nome: '',
    idade: '',
    tipo_curso: '',
    numDept: '',
    numMatricula_aconselhador: '',
    numMatriculaProf: '',
    numProjeto: ''
  });

  const handleFormChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    });
  }

  const mutation = useMutation({
    mutationFn: criarAluno,
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries(['estudantes']);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados enviados (aluno):", info);
    mutation.mutate(info);
  }

  return (
    <Dialog size="lg" open={open} handler={handleOpen} className="flex items-center justify-center bg-transparent shadow-none">
      <div className="h-screen flex items-center justify-center">
        <Card className="mx-auto w-[90vh] max-w-[24rem] p-10">
          <CardBody className="flex flex-col gap-4">
            <div className='text-[#18365E]'>
            <p className='text-base text-gray-200 pb-2'>pressione 'Esc' para sair</p>
              <h2>Cadastrar <span className='destaque'>Aluno</span></h2>
            </div>
            <div className='mb-10'>
              <input className="p-1.5 w-[100px] h-[40px] border-2 border-gray-100 text-base font-bold text-gray-600 rounded-xl bg-transparent" placeholder='ID'
                onChange={handleFormChange} name="numMatriculaEstd" value={info.numMatriculaEstd}/>
            </div>
            <div className='flex-col w-full justify-between gap-4'>
              <div className='input'>
                <label className='font-medium text-gray-900'>Nome</label>
                <input className="input_plc" name='nome' onChange={handleFormChange} value={info.nome} placeholder='Ex: Marisa Monte'/>
              </div>
              <div className='input'>
                <label className='font-medium text-gray-900'>Idade</label>
                <input className="input_plc" name='idade' onChange={handleFormChange} value={info.idade} placeholder='Ex: 28'/>
              </div>
              <div className='input'>
                <label className='font-medium text-gray-900'>Curso</label>
                <input className="input_plc" name='tipo_curso' onChange={handleFormChange} value={info.tipo_curso} placeholder='Ex: Artes Cênicas'/>
              </div>
              <div className='input'>
                <label className='font-medium text-gray-900'>Departamento</label>
                <input className="input_plc" name='numDept' onChange={handleFormChange} value={info.numDept} placeholder='Id do departamento'/>
              </div>
              <div className='input'>
                <label className='font-medium text-gray-900'>Aconselhador</label>
                <input className="input_plc" name='numMatricula_aconselhador' onChange={handleFormChange} value={info.numMatricula_aconselhador} placeholder='Id do aluno conselheiro'/>
              </div>
              <div className='input'>
                <label className='font-medium text-gray-900'>Professor Supervisor</label>
                <input className="input_plc" name='numMatriculaProf' onChange={handleFormChange} value={info.numMatriculaProf} placeholder='Id do supervisor de projeto'/>
              </div>
              <div className='input'>
                <label className='font-medium text-gray-900'>Projeto</label>
                <input className="input_plc" name='numProjeto' onChange={handleFormChange} value={info.numProjeto} placeholder='Id de projeto'/>
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleSubmit} fullWidth className='botao_cad mt-10'>
              Cadastrar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Dialog>
  )
}

export function Cadastrar_departamento({open, setOpen}) {
  const handleOpen = () => setOpen((cur) => !cur);
  const queryClient = useQueryClient();

  const [info, setInfo] = useState({
    numDept: '',
    nome: '',
    escritorio_principal: '',
    numMatriculaProf:''
  });

  const handleFormChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    });
  }

  const mutation = useMutation({
    mutationFn: criarDepartamento,
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries(['departamentos']);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(info);
  }

  return (
    <Dialog size="lg" open={open} handler={handleOpen} className="flex items-center justify-center bg-transparent shadow-none">
      <div className="h-screen flex items-center justify-center">
        <Card className="mx-auto w-[90vh] max-w-[24rem] p-10">
          <CardBody className="flex flex-col gap-4">
            <div className='text-[#18365E]'>
            <p className='text-base text-gray-200 pb-2'>pressione 'Esc' para sair</p>
              <h2>Cadastrar <span className='destaque'>Departamento</span></h2>
            </div>
            <div className='mb-10'>
              <input className="p-1.5 w-[100px] h-[40px] border-2 border-gray-100 text-base font-bold text-gray-600 rounded-xl bg-transparent" placeholder='ID'
                onChange={handleFormChange} name='numDept' value={info.numDept}/>
            </div>
            <div className='flex-col w-full justify-between gap-4'>
              <div className='input'>
                <label className='font-medium text-gray-900'>Nome do Departamento</label>
                <input className="input_plc" name='nome' onChange={handleFormChange} value={info.nome} placeholder='Nome'/>
              </div>
              <div className='input'>
                <label className='font-medium text-gray-900'>Escritório Principal</label>
                <input className="input_plc" name='escritorio_principal' onChange={handleFormChange} value={info.escritorio_principal} placeholder='Ex: 202'/>
              </div>
              <div className='input'>
                <label className='font-medium text-gray-900'>Líder do Departamento</label>
                <input className="input_plc" name='numMatriculaProf' onChange={handleFormChange} value={info.numMatriculaProf} placeholder='ID professor responsável'/>
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleSubmit} fullWidth className='botao_cad mt-10'>
              Cadastrar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Dialog>
  )
}

export function Cadastrar_projeto({open, setOpen}) {
  const handleOpen = () => setOpen((cur) => !cur);
  const queryClient = useQueryClient();

  const [info, setInfo] = useState({
    numProjeto:'',
    orgao_financiador: '',
    data_inicio: '',
    data_final: '',
    orcamento: '',
    pesquisador_principal: '',
    participantes: ''
  });

  const handleFormChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    });
  }

  const mutation = useMutation({
    mutationFn: criarProjeto,
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries(['projetos']);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const participantesNumericos = info.participantes
      .split(',')
      .map((id) => parseInt(id.trim(), 10))
      .filter((id) => !isNaN(id));
    
    const dadosParaEnviar = {
      ...info,
      numProjeto: parseInt(info.numProjeto, 10),
      orcamento: parseFloat(info.orcamento),
      participantes: participantesNumericos
    };
  
    mutation.mutate(dadosParaEnviar);
  };
  

  return (
    <Dialog size="lg" open={open} handler={handleOpen} className="flex items-center justify-center bg-transparent shadow-none">
      <div className="h-screen flex items-center justify-center">
        <Card className="mx-auto w-[90vh] max-w-[24rem] p-10">
          <CardBody className="flex flex-col gap-4">
            <div className='text-[#18365E]'>
            <p className='text-base text-gray-200 pb-2'>pressione 'Esc' para sair</p>
              <h2>Cadastrar <span className='destaque'>Projeto</span></h2>
            </div>
            <div className='mb-10'>
              <input className="p-1.5 w-[100px] h-[40px] border-2 border-gray-100 text-base font-bold text-gray-600 rounded-xl bg-transparent" placeholder='ID'
                onChange={handleFormChange} name='numProjeto' value={info.numProjeto}/>
            </div>
            <div className='flex-col w-full justify-between gap-4'>
              <div className='input'>
                <label className='font-medium text-gray-900'>Orgao Financiador</label>
                <input className="input_plc" name='orgao_financiador' onChange={handleFormChange} value={info.orgao_financiador} placeholder='Ex: FAPESC'/>
              </div>
              <div className='input'>
                <label className='font-medium text-gray-900'>Data de Início</label>
                <input className="input_plc" name='data_inicio' onChange={handleFormChange} value={info.data_inicio} placeholder='dd/mm/yyyy'/>
              </div>
              <div className='input'>
                <label className='font-medium text-gray-900'>Data de Finalização</label>
                <input className="input_plc" name='data_final' onChange={handleFormChange} value={info.data_finalizacao} placeholder='dd/mm/yyyy'/>
              </div>
              <div className='input'>
                <label className='font-medium text-gray-900'>Orçamento</label>
                <input className="input_plc" name='orcamento' onChange={handleFormChange} value={info.orcamento} placeholder='10.000'/>
              </div>
              <div className='input'>
                <label className='font-medium text-gray-900'>Pesquisador Principal</label>
                <input className="input_plc" name='pesquisador_principal' onChange={handleFormChange} value={info.pesquisador_principal} placeholder='Id do professor'/>
              </div>
              <div className='input'>
                <label className='font-medium text-gray-900'>Professores participantes</label>
                  <input className="input_plc" name='participantes' placeholder='id1; id2; id3' value={info.participantes} onChange={handleFormChange}/>
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleSubmit} fullWidth className='botao_cad mt-10'>
              Cadastrar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Dialog>
  )
}

import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input
} from "@material-tailwind/react";
import { useQueryClient,useMutation } from '@tanstack/react-query';
import { updateProfessor,updateAluno,updateDepartamento,updateProjeto} from '../controllers/functions';


export function Update_professor({open, setOpen, professor}) {
  const handleOpen = () => setOpen(!open); 
  const queryClient = useQueryClient();

  const [info, setInfo] = useState({
    nummatriculaprof:'',
    nome: '',
    idade: '',
    especialidade_pesquisa: '',
    sala: '',
    tempo: ''
  });

  useEffect(() => {
    if (professor) {
      setInfo({ ...professor });
    }
  }, [professor]);
  
  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    });
  }

  const mutation = useMutation({
    mutationFn: updateProfessor,
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries(['professores']);
    }
  });  

  const handleUpdate = (e) => {
    e.preventDefault();
    mutation.mutate(info); 
  }
  return (
    <>
      <Dialog open={open} handler={handleOpen} size="xxl" className="bg-transparent shadow-none">
        <div className="h-screen flex items-center justify-center">
          <Card className="w-full max-w-[1000px] mx-auto p-10">
            <CardBody className="flex flex-col gap-4">
                  <div className="text-[#18365E]">
                      <p className='text-base text-gray-200 pb-2'>pressione 'Esc' para sair</p>
                      <h2>Editar <span className='destaque'>Professor</span></h2>
                  </div>
                  <div className='mb-10'>
                      <input className="p-1.5 w-[100px] h-[40px] border-2 border-gray-100 text-base font-bold text-gray-400 rounded-xl bg-transparent" 
                        value={info.nummatriculaprof} disabled />
                  </div>
                  <div className='flex w-full justify-between gap-4'>
                    <div className='w-1/2 flex flex-col gap-4'>
                      <div>
                        <label className='font-medium text-gray-900'>Nome</label>
                        <input className="input_plc" name="nome" value={info.nome} onChange={handleChange} />
                      </div>
                      <div>
                        <label className='font-medium text-gray-900'>Idade</label>
                        <input className="input_plc" name="idade" value={info.idade} onChange={handleChange} />
                      </div>
                    </div>
                    <div className='w-1/2 flex flex-col gap-4'>
                      <div>
                        <label className='font-medium text-gray-900'>Especialidade</label>
                        <input className="input_plc" name="especialidade_pesquisa" value={info.especialidade_pesquisa} onChange={handleChange} />
                      </div>
                      <div>
                        <label className='font-medium text-gray-900'>Sala</label>
                        <input className="input_plc" name="sala" value={info.sala} onChange={handleChange} />
                      </div>
                      <div>
                        <label className='font-medium text-gray-900'>Tempo</label>
                        <input className="input_plc" name="tempo" value={info.tempo} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
            </CardBody>
          
            <CardFooter className="pt-0">
              <Button variant="gradient" onClick={handleUpdate} fullWidth className='botao_cad mt-10'>
                Salvar Alterações
              </Button>
            </CardFooter>
          
          </Card>
        </div>
      </Dialog>
    </>
  )
}

export function Update_aluno({open, setOpen, aluno}) {
  const handleOpen = () => setOpen(!open); 
  const queryClient = useQueryClient();

  const [info, setInfo] = useState({
    nummatriculaestd: '',
    nome: '',
    idade: '',
    curso: '',
    numdept: '',
    nummatriculaconselheiro: ''
  });

  useEffect(() => {
    if (aluno) {
      setInfo({ ...aluno });
    }
  }, [aluno]);

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    });
  }

  const mutation = useMutation({
    mutationFn: updateAluno,
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries(['estudantes']);
    }
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    mutation.mutate(info); 
  }

  return (
    <>
      <Dialog size="lg" open={open} handler={handleOpen} className="flex items-center justify-center bg-transparent shadow-none">
        <div className="h-screen flex items-center justify-center">
          <Card className="mx-auto w-[90vh] max-w-[24rem] p-10">
            <CardBody className="flex flex-col gap-4">
              <div className='text-[#18365E]'>
                <p className='text-base text-gray-200 pb-2'>pressione 'Esc' para sair</p>
                <h2>Editar <span className='destaque'>Aluno</span></h2>
              </div>
              <div className='mb-10'>
                <input className="p-1.5 w-[100px] h-[40px] border-2 border-gray-100 text-base font-bold text-gray-400 rounded-xl bg-transparent" 
                  value={info.nummatriculaestd} disabled />
              </div>
              <div className='flex-col w-full justify-between gap-4'>                 
                <div className='input'>
                  <label className='font-medium text-gray-900'>Nome</label>
                  <input className="input_plc" name="nome" value={info.nome} onChange={handleChange} />
                </div>
                <div className='input'>
                  <label className='font-medium text-gray-900'>Idade</label>
                  <input className="input_plc" name="idade" value={info.idade} onChange={handleChange} />
                </div>
                <div className='input'>
                  <label className='font-medium text-gray-900'>Curso</label>
                  <input className="input_plc" name="curso" value={info.curso} onChange={handleChange} />
                </div>
                <div className='input'>
                  <label className='font-medium text-gray-900'>Departamento</label>
                  <input className="input_plc" name="numdept" value={info.numdept} onChange={handleChange} />
                </div>
                <div className='input'>
                  <label className='font-medium text-gray-900'>Aconselhador</label>
                  <input className="input_plc" name="nummatriculaconselheiro" value={info.nummatriculaconselheiro} onChange={handleChange} />
                </div>
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" onClick={handleUpdate} fullWidth className='botao_cad mt-10'>
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Dialog>
    </>
  );
}

export function Update_departamento({open, setOpen, departamento}) {
  const handleOpen = () => setOpen(!open); 
  const queryClient = useQueryClient();

  const [info, setInfo] = useState({
    numdept: '',
    nome: '',
    escritorio: ''
  });

  useEffect(() => {
    if (departamento) {
      setInfo({ ...departamento });
    }
  }, [departamento]);

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    });
  }

  const mutation = useMutation({
    mutationFn: updateDepartamento,
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries(['departamentos']);
    }
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    mutation.mutate(info); 
  }

  return (
    <>
      <Dialog size="lg" open={open} handler={handleOpen} className="flex items-center justify-center bg-transparent shadow-none">
        <div className="h-screen flex items-center justify-center">
          <Card className="mx-auto w-[90vh] max-w-[24rem] p-10">
            <CardBody className="flex flex-col gap-4">
              <div className='text-[#18365E]'>
                <p className='text-base text-gray-200 pb-2'>pressione 'Esc' para sair</p>
                <h2>Editar <span className='destaque'>Departamento</span></h2>
              </div>
              <div className='mb-10'>
                <input className="p-1.5 w-[100px] h-[40px] border-2 border-gray-100 text-base font-bold text-gray-400 rounded-xl bg-transparent" 
                  value={info.numdept} disabled />
              </div>
              <div className='input'>
                <label className='font-medium text-gray-900'>Nome do Departamento</label>
                <input className="input_plc" name="nome" value={info.nome} onChange={handleChange} />
              </div>
              <div className='input'>
                <label className='font-medium text-gray-900'>Escritório Principal</label>
                <input className="input_plc" name="escritorio" value={info.escritorio} onChange={handleChange} />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" onClick={handleUpdate} fullWidth className='botao_cad mt-10'>
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Dialog>
    </>
  );
}

export function Update_projeto({open, setOpen, projeto}) {
  const handleOpen = () => setOpen(!open); 
  const queryClient = useQueryClient();

  const [info, setInfo] = useState({
    numprojeto: '',
    orgao_fomento: '',
    datainicio: '',
    datafim: '',
    orcamento: '',
    nummatriculaprof: ''
  });

  useEffect(() => {
    if (projeto) {
      setInfo({ ...projeto });
    }
  }, [projeto]);

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    });
  }

  const mutation = useMutation({
    mutationFn: updateProjeto,
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries(['projetos']);
    }
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    mutation.mutate(info); 
  }

  return (
    <>
      <Dialog size="lg" open={open} handler={handleOpen} className="flex items-center justify-center bg-transparent shadow-none">
        <div className="h-screen flex items-center justify-center">
          <Card className="mx-auto w-[90vh] max-w-[24rem] p-10">
            <CardBody className="flex flex-col gap-4">
              <div className='text-[#18365E]'>
                <p className='text-base text-gray-200 pb-2'>pressione 'Esc' para sair</p>
                <h2>Editar <span className='destaque'>Projeto</span></h2>
              </div>
              <div className='mb-10'>
                <input className="p-1.5 w-[100px] h-[40px] border-2 border-gray-100 text-base font-bold text-gray-400 rounded-xl bg-transparent" 
                  value={info.numprojeto} disabled />
              </div>
              <div className='flex-col w-full justify-between gap-4'>                 
                <div className='input'>
                  <label className='font-medium text-gray-900'>Órgão Financiador</label>
                  <input className="input_plc" name="orgao_fomento" value={info.orgao_fomento} onChange={handleChange} />
                </div>
                <div className='input'>
                  <label className='font-medium text-gray-900'>Data de Início</label>
                  <input className="input_plc" name="datainicio" value={info.datainicio} onChange={handleChange} />
                </div>
                <div className='input'>
                  <label className='font-medium text-gray-900'>Data de Finalização</label>
                  <input className="input_plc" name="datafim" value={info.datafim} onChange={handleChange} />
                </div>
                <div className='input'>
                  <label className='font-medium text-gray-900'>Orçamento</label>
                  <input className="input_plc" name="orcamento" value={info.orcamento} onChange={handleChange} />
                </div>
                <div className='input'>
                  <label className='font-medium text-gray-900'>Pesquisador Principal</label>
                  <input className="input_plc" name="nummatriculaprof" value={info.nummatriculaprof} onChange={handleChange} />
                </div>
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" onClick={handleUpdate} fullWidth className='botao_cad mt-10'>
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Dialog>
    </>
  );
}

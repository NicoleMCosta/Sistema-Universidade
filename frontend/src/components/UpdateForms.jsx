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
    tempo: '',
    numDept: ''
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
                        name='nummatriculaprof' value={info.nummatriculaprof} disabled />
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
                      <div>
                        <label className='font-medium text-gray-900'>Departamento</label>
                        <input className="input_plc" name="numDept" value={info.numDept} onChange={handleChange} />
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
  console.log(aluno);
  const handleOpen = () => setOpen(!open); 
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
                  name='numMatriculaEstd' value={info.numMatriculaEstd} disabled />
              </div>
              <div className='flex-col w-full justify-between gap-4'>                 
                <div className='input'>
                  <label className='fDnt-medium text-gray-900'>Nome</label>
                  <input className="iMput_plc" name="nome" value={info.nome} onChange={handleChange} />
                </div>
                <div className='input'>
                  <label className='font-medium text-gray-900'>Idade</label>
                  <input className="input_plc" name="idade" value={info.idade} onChange={handleChange} />
                </div>
                <div className='input'>
                  <label className='font-medium text-gray-900'>Curso</label>
                  <input className="input_plc" name="tipo_curso" value={info.tipo_curso} onChange={handleChange} />
                </div>
                <div className='input'>
                  <label className='font-medium text-gray-900'>Departamento</label>
                  <input className="input_plc" name="numDept" value={info.numDept} onChange={handleChange} />
                </div>
                <div className='input'>
                  <label className='font-medium text-gray-900'>Aconselhador</label>
                  <input className="input_plc" name="numMatricula_aconselhador" value={info.numMatricula_aconselhador} onChange={handleChange} />
                </div>
                <div className='input'>
                  <label className='font-medium text-gray-900'>Prof. Supervisor</label>
                  <input className="input_plc" name="numMatriculaProf" value={info.numMatriculaProf} onChange={handleChange} />
                </div>
                <div className='input'>
                  <label className='font-medium text-gray-900'>Projeto</label>
                  <input className="input_plc" name="numProjeto" value={info.numProjeto} onChange={handleChange} />
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
    numDept: '',
    nome: '',
    escritorio_principal: '',
    numMatriculaProf:''
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
                  value={info.numDept} disabled />
              </div>
              <div className='input'>
                <label className='font-medium text-gray-900'>Nome do Departamento</label>
                <input className="input_plc" name="nome" value={info.nome} onChange={handleChange} />
              </div>
              <div className='input'>
                <label className='font-medium text-gray-900'>Escritório Principal</label>
                <input className="input_plc" name="escritorio_principal" value={info.escritorio_principal} onChange={handleChange} />
              </div>
              <div className='input'>
                <label className='font-medium text-gray-900'>Líder do Departamento</label>
                <input className="input_plc" name='numMatriculaProf' onChange={handleChange} value={info.numMatriculaProf}/>
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
    numProjeto: '',
    orgao_financiador: '',
    data_inicio: '',
    data_final: '',
    orcamento: '',
    pesquisador_principal: '',
    participantes: [],
    assistentes_pesquisa: []
  });

  const [participantesTexto, setParticipantesTexto] = useState('');

  useEffect(() => {
    if (projeto) {
      setInfo({
        ...projeto,
        participantes: Array.isArray(projeto.participantes) ? projeto.participantes : [],
        assistentes_pesquisa: Array.isArray(projeto.assistentes_pesquisa) ? projeto.assistentes_pesquisa : []
      });

      setParticipantesTexto(
        Array.isArray(projeto.participantes)
          ? projeto.participantes.join(', ')
          : ''
      );
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
  
    const participantesNumericos = participantesTexto
      .split(/[;,]/)
      .map(id => parseInt(id.trim(), 10))
      .filter(id => !isNaN(id));
  
  
    mutation.mutate({
      ...info,
      participantes: participantesNumericos
    });
  };
  
  
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
                  value={info.numProjeto} disabled />
              </div>
              <div className='flex-col w-full justify-between gap-4'>                 
                <div className='input'>
                  <label className='font-medium text-gray-900'>Órgão Financiador</label>
                  <input className="input_plc" name="orgao_financiador" value={info.orgao_financiador} onChange={handleChange} />
                </div>
                <div className='input'>
                  <label className='font-medium text-gray-900'>Data de Início</label>
                  <input className="input_plc" name="data_inicio" value={info.data_inicio} onChange={handleChange} />
                </div>
                <div className='input'>
                  <label className='font-medium text-gray-900'>Data de Finalização</label>
                  <input className="input_plc" name="data_final" value={info.data_final} onChange={handleChange} />
                </div>
                <div className='input'>
                  <label className='font-medium text-gray-900'>Orçamento</label>
                  <input className="input_plc" name="orcamento" value={info.orcamento} onChange={handleChange} />
                </div>
                <div className='input'>
                  <label className='font-medium text-gray-900'>Pesquisador Principal</label>
                  <input className="input_plc" name="pesquisador_principal" value={info.pesquisador_principal} onChange={handleChange} />
                </div>
                <div className='input'>
                  <label className='font-medium text-gray-900'>Professores participantes</label>
                  <input className='input_plc'
                      type="text"
                      name="participantes"
                      placeholder="id1, id2, id3"
                      value={participantesTexto}
                      onChange={(e) => setParticipantesTexto(e.target.value)}
                  />
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

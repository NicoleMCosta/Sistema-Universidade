import React, { useState } from 'react';
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
 
export function Cadastrar_professor({open, setOpen}) {
  const handleOpen = () => setOpen(!open); 
  return (
    <>
      <Dialog size="lg" open={open} handler={handleOpen} className="flex items-center justify-center bg-transparent shadow-none">
        <div className="h-screen flex items-center justify-center">
          <Card className="mx-auto w-[90vh] max-w-[24rem] p-10">
            <CardBody className="flex flex-col gap-4">
                  <div className='text-[#18365E]'>
                      <h2>Cadastrar <span className='destaque'>Professor</span></h2>
                  </div>
                  <div className='mb-10'>
                      <input className="p-1.5 w-[100px] h-[40px] border-2 border-gray-100 text-base font-bold text-gray-600 rounded-xl bg-transparent" placeholder='ID' disabled/>
                  </div>
                  <div className='flex-col w-full justify-between gap-4'>                 
                      <div className='input'>
                        <label className='font-medium text-gray-900'>Nome</label>
                        <input className="input_plc" placeholder='Nome'/>
                      </div>
                      <div className='input'>
                        <label className='font-medium text-gray-900'>Idade</label>
                        <input className="input_plc" placeholder='Idade'/>
                      </div>
                      <div className='input'>
                        <label className='font-medium text-gray-900'>Especialidade</label>
                        <input className="input_plc" placeholder='Ex: Teatro - Drama II'/>
                      </div>
                      <div className='input'>
                        <label className='font-medium text-gray-900'>Sala</label>
                        <input className="input_plc" placeholder='Sala'/>
                      </div>
                      <div className='input'>
                        <label className='font-medium text-gray-900'>Tempo</label>
                        <input className="input_plc" placeholder='Horas totais'/>
                      </div>
                  </div>

            </CardBody>
          
            <CardFooter className="pt-0">
              <Button variant="gradient" onClick={handleOpen} fullWidth className='botao_cad mt-10'>
                {/* O BOTAO DEVE ADICIONAR UM NOVO PROF. */}
                Cadastrar
              </Button>
            </CardFooter>
          
          </Card>
        </div>
      </Dialog>
    </>
  )
}


export function Cadastrar_aluno({open, setOpen}) {
  const handleOpen = () => setOpen(!open); 

  const [info, setInfo] = useState({
    id: '',
    nome: '',
    idade: '',
    tipo_curso:'',
    numDept: '',
    numMatricula_aconselhador: '',
  });

  // function handleChange(e) {
  //   setInfo((prev)=> ({ ...prev, [e.target.name]: e.target.value }));
  // }
  console.log(info);
  // const handleSubmit= ()=> '';

  return (
    <>
      <Dialog size="lg" open={open} handler={handleOpen} className="flex items-center justify-center bg-transparent shadow-none">
        <div className="h-screen flex items-center justify-center">
          <Card className="mx-auto w-[90vh] max-w-[24rem] p-10">
            <CardBody className="flex flex-col gap-4">
                  <div className='text-[#18365E]'>
                      <h2>Cadastrar <span className='destaque'>Aluno</span></h2>
                  </div>
                  <div className='mb-10'>
                      <input className="p-1.5 w-[100px] h-[40px] border-2 border-gray-100 text-base font-bold text-gray-600 rounded-xl bg-transparent" placeholder='ID' disabled/>
                  </div>
                  <div className='flex-col w-full justify-between gap-4'>                 
                      <div className='input'>
                        <label className='font-medium text-gray-900'>Nome</label>
                        <input className="input_plc" placeholder='Ex: Marisa Monte'/>
                      </div>
                      <div className='input'>
                        <label className='font-medium text-gray-900'>Idade</label>
                        <input className="input_plc" placeholder='Ex: 28'/>
                      </div>
                      <div className='input'>
                        <label className='font-medium text-gray-900'>Curso</label>
                        <input className="input_plc" placeholder='Ex: Artes Cênicas'/>
                      </div>
                      <div className='input'>
                        <label className='font-medium text-gray-900'>Departamento</label>
                        <input className="input_plc" placeholder='Id do departamento'/>
                      </div>
                      <div className='input'>
                        <label className='font-medium text-gray-900'>Aconselhador</label>
                        <input className="input_plc" placeholder='Id do aluno conselheiro'/>
                      </div>
                  </div>

            </CardBody>
          
            <CardFooter className="pt-0">
              <Button variant="gradient" onClick={handleOpen} fullWidth className='botao_cad mt-10'>
                {/* O BOTAO DEVE ADICIONAR UM NOVO ALUNO */}
                Cadastrar
              </Button>
            </CardFooter>
          
          </Card>
        </div>
      </Dialog>
    </>
  )
}


export function Cadastrar_departamento({open, setOpen}){
  const handleOpen = () => setOpen(!open); 
  return (
    <>
      <Dialog size="lg" open={open} handler={handleOpen} className="flex items-center justify-center bg-transparent shadow-none">
        <div className="h-screen flex items-center justify-center">
          <Card className="mx-auto w-[90vh] max-w-[24rem] p-10">
            <CardBody className="flex flex-col gap-4">
                  <div className='text-[#18365E]'>
                      <h2>Cadastrar <span className='destaque'>Projeto</span></h2>
                  </div>
                  <div className='mb-10'>
                      <input className="p-1.5 w-[100px] h-[40px] border-2 border-gray-100 text-base font-bold text-gray-600 rounded-xl bg-transparent" placeholder='ID' disabled/>
                  </div>
                  <div className='flex-col w-full justify-between gap-4'>                 
                      <div className='input'>
                        <label className='font-medium text-gray-900'>Nome do Departamento</label>
                        <input className="input_plc" placeholder='Nome'/>
                      </div>
                      <div className='input'>
                        <label className='font-medium text-gray-900'>Escritório Principal</label>
                        <input className="input_plc" placeholder='Ex: 202'/>
                      </div>
                  </div>

            </CardBody>
          
            <CardFooter className="pt-0">
              <Button variant="gradient" onClick={handleOpen} fullWidth className='botao_cad mt-10'>
                {/* O BOTAO DEVE ADICIONAR UM NOVO DEPT. */}
                Cadastrar
              </Button>
            </CardFooter>
          
          </Card>
        </div>
      </Dialog>
    </>
  )
}


export function Cadastrar_projeto({open, setOpen}) {
  const handleOpen = () => setOpen(!open); 
  return (
    <>
      <Dialog size="lg" open={open} handler={handleOpen} className="flex items-center justify-center bg-transparent shadow-none">
        <div className="h-screen flex items-center justify-center">
          <Card className="mx-auto w-[90vh] max-w-[24rem] p-10">
            <CardBody className="flex flex-col gap-4">
                  <div className='text-[#18365E]'>
                      <h2>Cadastrar <span className='destaque'>Projeto</span></h2>
                  </div>
                  <div className='mb-10'>
                      <input className="p-1.5 w-[100px] h-[40px] border-2 border-gray-100 text-base font-bold text-gray-600 rounded-xl bg-transparent" placeholder='ID' disabled/>
                  </div>
                  <div className='flex-col w-full justify-between gap-4'>                 
                      <div className='input'>
                        <label className='font-medium text-gray-900'>Orgao Financiador</label>
                        <input className="input_plc" placeholder='Ex: FAPESC'/>
                      </div>
                      <div className='input'>
                        <label className='font-medium text-gray-900'>Data de Início</label>
                        <input className="input_plc" placeholder='dd/mm/yyyy'/>
                      </div>
                      <div className='input'>
                        <label className='font-medium text-gray-900'>Data de Finalização</label>
                        <input className="input_plc" placeholder='dd/mm/yyyy'/>
                      </div>
                      <div className='input'>
                        <label className='font-medium text-gray-900'>Orçamento</label>
                        <input className="input_plc" placeholder='10.000'/>
                      </div>
                      <div className='input'>
                        <label className='font-medium text-gray-900'>Pesquisador Principal</label>
                        <input className="input_plc" placeholder='Id do professor'/>
                      </div>
                  </div>

            </CardBody>
          
            <CardFooter className="pt-0">
              <Button variant="gradient" onClick={handleOpen} fullWidth className='botao_cad mt-10'>
                {/* O BOTAO DEVE ADICIONAR UM NOVO ALUNO */}
                Cadastrar
              </Button>
            </CardFooter>
          
          </Card>
        </div>
      </Dialog>
    </>
  )
}
import React from 'react';
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
      <Button onClick={handleOpen}>Cadastrar</Button>
      <Dialog size="lg" open={open} handler={handleOpen} className="flex items-center justify-center bg-transparent shadow-none">
        {/* ALINHAR CENTRO-Y */}
        <Card className="mx-auto w-[90vh] max-w-[24rem] p-10">
          <CardBody className="flex flex-col gap-4">
                <div className='text-[#18365E]'>
                    <h2>Cadastrar <span className='destaque'>Professor</span></h2>
                </div>
                <div className='mb-10'>
                    <input className="p-1.5 w-[100px] h-[40px] border-2 border-gray-100 text-base font-bold text-gray-600 rounded-xl bg-transparent" placeholder='ID' disabled/>
                </div>
                <div className='flex w-full justify-between gap-4'>
                  {/* DIV ESQ */}
                  <div className='w-1/2 flex flex-col gap-4'>
                    <div>
                      <label className='font-medium text-gray-900'>Nome</label>
                      <input
                        className="p-1.5 w-full h-[40px] border-2 border-gray-100 text-base text-gray-600 rounded-xl bg-transparent placeholder:pl-2"
                        placeholder='Nome'
                      />
                    </div>
                    <div>
                      <label className='font-medium text-gray-900'>Idade</label>
                      <input
                        className="p-1.5 w-full h-[40px] border-2 border-gray-100 text-base text-gray-600 rounded-xl bg-transparent placeholder:pl-2"
                        placeholder='Idade'
                      />
                    </div>
                  </div>

                  {/* DIV DIR */}
                  <div className='w-1/2 flex flex-col gap-4'>
                    <div>
                      <label className='font-medium text-gray-900'>Especialidade</label>
                      <input
                        className="w-full h-[40px] border-2 border-gray-100 text-gray-600 rounded-xl p-1.5 bg-transparent placeholder:pl-2"
                        placeholder='Especialidade'
                      />
                    </div>
                    <div>
                      <label className='font-medium text-gray-900'>Sala</label>
                      <input
                        className="w-full h-[40px] border-2 border-gray-100 text-gray-600 rounded-xl p-1.5 bg-transparent placeholder:pl-2"
                        placeholder='Sala'
                      />
                    </div>
                    <div>
                      <label className='font-medium text-gray-900'>Tempo</label>
                      <input
                        className="w-full h-[40px] border-2 border-gray-100 text-gray-600 rounded-xl p-1.5 bg-transparent placeholder:pl-2"
                        placeholder='Tempo'
                      />
                    </div>
                  </div>
                </div>

          </CardBody>
        
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleOpen} fullWidth className='botao_cad mt-10'>
              Cadastrar
            </Button>
          </CardFooter>
        
        </Card>
      
      </Dialog>
    </>
  )
}

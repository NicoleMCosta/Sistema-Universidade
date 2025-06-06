import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Form(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const logon = () => {
        if(email === 'admin' && senha === '1234'){
            localStorage.setItem('token', 'fake-token');
            console.log(localStorage.getItem('token'));
            navigate('/dashboard');
        }else{
          alert('E-mail ou senha inválidos');
        }
    };
    return (
        <div className= "absolute inset-y-0 left-0 w-full flex items-center justify-center lg:w-1/2">
            {/* BACKGROUND DO FORMULARIO*/}
            <div className='bg-white px-10 py-20 rounded-3xl border-grey-200'>
                <h1 className='text-5xl font-bold'>LOGIN</h1>
                <div className='mt-10'>
                    {/* CAMPO DE EMAIL */}
                    <div>
                        <label className='text-lg font-medium'>Email</label>
                        <input value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border-2 border-gray-100  text-gray-600  rounded-xl p-5 mt-1 bg-transparent" 
                        placeholder='E-mail'/>
                    </div>
                    {/* CAMPO DE SENHA */}
                    <div>
                        <label className='text-lg font-medium'>Senha</label>
                        <input value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="w-full border-2 border-gray-100  text-gray-600 rounded-xl p-5 mt-1 bg-transparent" 
                        placeholder='Senha' type='password'/>
                    </div>
                    {/* BOTAO DE LOGIN */}
                    <div className='mt-8 flex justify-between items-center'>
                        <button onClick={logon} className='cursor-pointer active:scale-[.98] active: duration-75 hover:scale-[1.01] ease-in-out 
                        py-3 px-10 rounded-xl 
                        font-bold text-base text-white bg-[#18365E]'>Entrar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
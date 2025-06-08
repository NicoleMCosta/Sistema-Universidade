import { baseUrl } from "../../constants/global_vars";
import { useQueryClient, useMutation } from "@tanstack/react-query";
//CADASTRO
export const criarProfessor = async (info) => {
    const res = await fetch('http://localhost:3000/api/professores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    });
  
    if (!res.ok) {
      throw new Error("Erro ao cadastrar professor");
    }
  
    return res.json();
  };

  export const criarAluno = async (info) => {
    const res = await fetch('http://localhost:3000/api/estudantes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    });
  
    if (!res.ok) {
      throw new Error("Erro ao cadastrar aluno");
    }
  
    return res.json();
  };

  export const criarDepartamento = async (info) => {
    const res = await fetch('http://localhost:3000/api/departamentos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    });
  
    if (!res.ok) {
      throw new Error("Erro ao cadastrar departamento");
    }
  
    return res.json();
  };

  export const criarProjeto = async (info) => {
    const res = await fetch('http://localhost:3000/api/projetos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    });
  
    if (!res.ok) {
      throw new Error("Erro ao cadastrar projeto");
    }
  
    return res.json();
  };

//UPDATE

export const updateProfessor = async (info) => {
  const res = await fetch(`${baseUrl}/api/professores/${info.nummatriculaprof}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar professor");
  }

  return res.json();
};


export const updateAluno = async (info) => {
    const res = await fetch(`${baseUrl}/api/estudantes/${info.nummatriculaestd}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    });
  
    if (!res.ok) {
      throw new Error("Erro ao atualizar aluno");
    }
  
    return res.json();
  };
  

export const updateDepartamento = async (info) => {
    const res = await fetch(`${baseUrl}/api/departamentos/${info.numdept}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    });
  
    if (!res.ok) {
      throw new Error("Erro ao atualizar departamento");
    }
  
    return res.json();
  };


export const updateProjeto = async (info) => {
    const res = await fetch(`${baseUrl}/api/projetos/${info.numprojetos}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    });
  
    if (!res.ok) {
      throw new Error("Erro ao atualizar projetos");
    }
  
    return res.json();
  };

//DELETE
//não está funcionando
export function DadosDelete(tableName) {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (id) => {
        const res = await fetch(`${baseUrl}/${tableName}/${id}`, {
          method: 'DELETE',
        });
        if (!res.ok) {
            console.log("algo deu errado coom ", tableName);
          throw new Error(`Erro ao deletar de ${tableName}`);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      },
    });
  }

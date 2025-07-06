import { baseUrl } from "../../constants/global_vars";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

//CADASTRO
  export const criarProfessor = async (info) => {
    const res = await fetch('http://localhost:5000/api/professores', {
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

  export async function criarAluno(data) {
  try {
    console.log("Enviando aluno para API:", data);
    const response = await fetch('http://localhost:5000/api/estudantes', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro do servidor (aluno):", response.status, errorText);
      throw new Error(errorText || 'Erro ao criar aluno');
    }

    return response.json();
  } catch (err) {
    console.error("Erro no catch criarAluno:", err);
    throw err;
  }
}



  export const criarDepartamento = async (info) => {
    const res = await fetch('http://localhost:5000/api/departamentos', {
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
    const res = await fetch('http://localhost:5000/api/projetos', {
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
  const res = await fetch(`${baseUrl}/api/professores/${info.numMatriculaProf}`, {
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
  console.log('Dados enviados para atualização:', info);
  
  try {
    const res = await fetch(`${baseUrl}/api/estudantes/${info.numMatriculaEstd}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    });

    console.log('Status da resposta:', res.status);
    
    if (!res.ok) {
      const errorData = await res.json();
      console.error('Detalhes do erro:', errorData);
      throw new Error(errorData.erro || `Erro ao atualizar aluno (status ${res.status})`);
    }

    return await res.json();
  } catch (error) {
    console.error('Erro completo na requisição:', {
      message: error.message,
      request: `${baseUrl}/api/estudantes/${info.numMatriculaEstd}`,
      payload: info
    });
    throw error;
  }
};

export const updateDepartamento = async (info) => {
    const res = await fetch(`${baseUrl}/api/departamentos/${info.numDept}`, {
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
    const res = await fetch(`${baseUrl}/api/projetos/${info.numProjeto}`, {
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

export function useDeletar(entidade) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`${baseUrl}/api/${entidade}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.erro || `Erro ao deletar ${entidade}`);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
}
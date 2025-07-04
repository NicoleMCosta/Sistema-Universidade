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
    const res = await fetch(`${baseUrl}/api/projetos/${info.numprojeto}`, {
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
export function useDeletar(entidade) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      console.log(`${id}`);
      const response = await fetch(`${baseUrl}/api/${entidade}/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `Erro ao deletar ${entidade}`);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (error) => {
      console.error('🚨 Erro na mutação:', error.message);
      toast.error(error.message);
    }
  });
}

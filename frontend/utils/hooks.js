import { baseUrl } from '../constants/global_vars';
import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import { toast } from "react-toastify";

export function DadosDashboard() {
    return useQuery({
      queryKey: ['dashboard'],
      queryFn: async () => {
        const res = await fetch(baseUrl+"/api/dashboard");
        return res.json();
      },
    });
  }

export function useDeletar(entidade) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {

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

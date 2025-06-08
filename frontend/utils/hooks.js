import { baseUrl } from '../constants/global_vars';
import { useQuery} from '@tanstack/react-query';

export function DadosDashboard() {
    return useQuery({
      queryKey: ['dashboard'],
      queryFn: async () => {
        const res = await fetch(baseUrl+"/api/dashboard");
        return res.json();
      },
    });
  }

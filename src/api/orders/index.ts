import {
  useMutation,
  useQuery,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { useAuthContext } from '../../providers/AuthProvider';
import { Order, OrderStatus } from '../../type/types';

export const useAdminOrderList = ({ archived = false }) => {
  const statuses = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering'];

  const statusOrder: Record<string, number> = {
    New: 0,
    Cooking: 1,
    Delivering: 2,
  };

  return useQuery({
    queryKey: ['orders', { archived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .in('status', statuses)
        .order('updated_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      if (!archived) {
        data.sort((a, b) => {
          const aOrder = statusOrder[a.status as OrderStatus] ?? 999;
          const bOrder = statusOrder[b.status as OrderStatus] ?? 999;

          if (aOrder === bOrder) {
            const getTime = (date: string | null) =>
              date ? new Date(date).getTime() : 0;
            return getTime(b.updated_at) - getTime(a.updated_at);
          }

          return aOrder - bOrder;
        });
      }

      return data;
    },
  });
};

export const useMyOrderList = () => {
  const { session } = useAuthContext();
  const id = session?.user.id;

  const statusOrder: Record<string, number> = {
    New: 0,
    Cooking: 1,
    Delivering: 2,
    Delivered: 3,
  };

  return useQuery({
    queryKey: ['orders', { userId: id }],
    queryFn: async () => {
      if (!id) return null;

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', id);
      if (error) {
        throw new Error(error.message);
      }

      data.sort((a, b) => {
        const aOrder = statusOrder[a.status as OrderStatus] ?? 999;
        const bOrder = statusOrder[b.status as OrderStatus] ?? 999;

        if (aOrder === bOrder) {
          const getTime = (date: string | null) =>
            date ? new Date(date).getTime() : 0;
          return getTime(b.updated_at) - getTime(a.updated_at);
        }

        return aOrder - bOrder;
      });

      return data;
    },
  });
};

export const useOrderDetail = (id: number) => {
  return useQuery({
    queryKey: ['orders', id],

    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*, products(*))')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthContext();

  const user = session?.user;
  return useMutation({
    async mutationFn({ total }: Pick<Order, 'total'>) {
      if (!user) return null;

      const { error, data } = await supabase
        .from('orders')
        .insert({
          total,
          user_id: user.id,
        })
        .select();

      if (error) {
        throw error;
      }
      return {
        ...data[0],
        status: data[0].status as OrderStatus,
      };
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError(error) {
      console.log(error);
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ id, status }: Pick<Order, 'id' | 'status'>) {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select();

      if (error) {
        throw error;
      }
      return data;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ['orders'] });
      await queryClient.invalidateQueries({ queryKey: ['order', id] });
    },
    onError(error) {
      console.log(error);
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: number) => {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);

      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      // Cập nhật lại danh sách sau khi xóa
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: error => {
      console.error('Failed to delete order:', error);
    },
  });
};

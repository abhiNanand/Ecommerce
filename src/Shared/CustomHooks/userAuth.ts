import { useSelector } from 'react-redux';
import { RootState } from '../../Store';

export function useAuth() {
  const token = useSelector((state: RootState) => state.common.token);
  const user = useSelector((state: RootState) => state.common.user);
  const isAuthenticated: boolean = !!token;
  return { isAuthenticated, user, token };
}

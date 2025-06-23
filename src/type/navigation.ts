import { UserOrderStackParamList } from '../navigation/UserOrderNavigator';
import { TabParamList } from '../navigation/UserTabNavigator';
import { Order } from './types';

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  RoleSelector: undefined;
  Admin: undefined;
  User: undefined |{
    screen?: keyof TabParamList;
    params?: {
      screen?: keyof UserOrderStackParamList;
      params?: {
        order: Order;
      };
    };
  };
};

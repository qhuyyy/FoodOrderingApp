import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { CartItem, Order, Product } from '../type/types';
import uuid from 'react-native-uuid';
import { useInsertOrder } from '../api/orders';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../type/navigation';
import { useInsertOrderItems } from '../api/order-items';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Admin'>;

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem['size']) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => void;
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const navigation = useNavigation<NavigationProp>();

  const { mutate: insertOrder } = useInsertOrder();
  const { mutate: insertOrderItems } = useInsertOrderItems();

  const addItem = (product: Product, size: CartItem['size']) => {
    const existingItem = items.find(
      item => item.product.id === product.id && item.size === size,
    );

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    } else {
      const newCartItem: CartItem = {
        id: uuid.v4(),
        product,
        product_id: product.id,
        size,
        quantity: 1,
      };

      setItems([newCartItem, ...items]);
    }
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    setItems(
      items
        .map(item =>
          item.id !== itemId
            ? item
            : { ...item, quantity: item.quantity + amount },
        )
        .filter(item => item.quantity > 0),
    );
  };

  //   console.log(items);

  const total = parseFloat(
    items
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      .toFixed(2),
  );

  const clearCart = () => {
    setItems([]);
  };

  const checkout = () => {
    insertOrder(
      { total },
      {
        onSuccess: newOrder => {
          if (newOrder) {
            saveOrderItems(newOrder);
          } else {
            console.warn('Order creation returned null');
          }
        },
      },
    );
  };

  const saveOrderItems = (newOrder: Order) => {
    if (!newOrder) return;

    insertOrderItems(
      {
        items,
        order_id: newOrder.id,
      },
      {
        onSuccess() {
          setItems([]);
          navigation.navigate('User', {
            screen: 'OrdersStack',
          });
        },
      },
    );
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, total, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCartContext = () => useContext(CartContext);

import React, { useState, useCallback, createContext, useEffect } from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface ICart {
  id: string;
  estoque_produto: number;
  quantity: number;
  fornecedor: {
    id: string;
    taxa_delivery: string;
    delivery: boolean;
  };
}

interface CartContextData {
  cart: ICart[];
  addCart(product: object): void;
  changeDeliveryProduct(product: object): void;
  removeCart(product: object): void;
  clearCart(store: object): void;
  isChange: boolean;
  changeStatus(): void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<ICart[]>([]);
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    async function loadData(): Promise<void> {
      const cartLoaded = await AsyncStorage.getItem(
        '@QueroAçaí-Consumidor:cart',
      );

      if (JSON.parse(cartLoaded)) {
        setCart(JSON.parse(cartLoaded));
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    async function setStorage(): Promise<void> {
      await AsyncStorage.setItem(
        '@QueroAçaí-Consumidor:cart',
        JSON.stringify(cart),
      );
    }

    setStorage();
  }, [cart, setCart]);

  const addCart = useCallback(
    (product) => {
      const filter = cart?.filter((item) => item.id === product.id);

      if (filter.length > 0) {
        if (filter[0].quantity === product.estoque_produto) {
          return;
        }

        const newData = cart?.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
        setCart(newData);
      } else {
        setCart([
          ...cart,
          {
            ...product,
            quantity: 1,
            fornecedor: {
              ...product.fornecedor,
              delivery: !!product.fornecedor.taxa_delivery,
            },
          },
        ]);
      }
    },
    [cart],
  );

  const changeDeliveryProduct = useCallback(
    (product) => {
      const newData = cart.map((item) =>
        item.fornecedor.id === product[0].fornecedor.id
          ? {
              ...item,
              fornecedor: {
                ...item.fornecedor,
                delivery: !item.fornecedor.delivery,
              },
            }
          : item,
      );
      setCart(newData);
    },
    [cart],
  );

  const removeCart = useCallback(
    (product) => {
      const filter = cart.filter((item) => item.id === product.id);
      if (filter.length > 0) {
        if (filter[0].quantity === 1) {
          const newCart = cart.filter((item) => item.id !== product.id);
          setCart(newCart);
        } else {
          const newData = cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          );
          setCart(newData);
        }
      }
    },
    [cart],
  );

  const clearCart = useCallback(
    (store) => {
      const filter = cart.filter(
        (item) => item.fornecedor.id !== store[0].fornecedor.id,
      );
      setCart(filter);
    },
    [cart],
  );

  const changeStatus = useCallback(() => {
    setIsChange(!isChange);
  }, [isChange]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addCart,
        changeDeliveryProduct,
        removeCart,
        clearCart,
        isChange,
        changeStatus,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

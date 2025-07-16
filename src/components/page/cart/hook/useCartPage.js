import { useEffect, useState } from "react";
import { getCartItems } from "@/services/api";

const useCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateLocalStorage = (items) => {
    const simplified = items.map(({ id, quantity }) => ({ id, quantity }));
    localStorage.setItem("cart", JSON.stringify(simplified));
  };

  const fetchCartItems = async () => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const ids = storedCart.map((item) => item.id);

      if (ids.length === 0) {
        setCartItems([]);
        setLoading(false);
        return;
      }

      const response = await getCartItems(ids);
      const serverCart = response.data.data;

      const merged = serverCart.map((serverItem) => {
        const local = storedCart.find((item) => item.id === serverItem.id);
        return {
          ...serverItem,
          quantity: local?.quantity || 1,
        };
      });

      setCartItems(merged);
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng từ API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleRemove = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    updateLocalStorage(updated);
  };

  const handleQuantityChange = (id, quantity) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updated);
    updateLocalStorage(updated);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const vat = total * 0.1;
  const grandTotal = total + vat;

  return {
    cartItems,
    loading,
    handleRemove,
    handleQuantityChange,
    total,
    vat,
    grandTotal,
  };
};

export default useCartPage;

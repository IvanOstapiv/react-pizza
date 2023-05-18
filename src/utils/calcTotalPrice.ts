import { CartItem } from "../redux/Slices/cartSlice";

export const calcTotalPrice = (items: CartItem[]) => {
    return items.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);
}
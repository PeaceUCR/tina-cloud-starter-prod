import {isServer} from "../utils/firebase";

export interface ICartItem {
    productId: string | number;
    quantity: number;
    productVariantId: string | number;
}

export interface IlocalCartAmount {
    shippingCost: number | null;
    subTotal: number;
    taxCost: number;
    discount: number;
    totalCost: number;
    expaditeShippingCost?: number;
    expaditeShippingId?: string;
    couponCode?: string;
}

export interface ILocalCart extends IlocalCartAmount {
    items: ICartItem[];
}

export const defaultCart: ILocalCart = {
    items: [],
    shippingCost: null,
    subTotal: null,
    taxCost: null,
    discount: null,
    totalCost: null,
};

export interface IsaveToCartParams {
    input: ICartItem;
    price?: number;
    availableQuantity: number;
    type?: 'INCREMENT' | 'DECREMENT' | 'DELETE';
}

export const clearLocalCart = () => {
    localStorage.setItem('cart', JSON.stringify(defaultCart));
}

export const saveServerCartToLocal = (serverCart: ILocalCart) => {
    localStorage.setItem('cart', JSON.stringify(serverCart));
}
export const saveToLocalCart = ({input, availableQuantity, type = 'INCREMENT'}: IsaveToCartParams) => {
    const cartString = localStorage.getItem('cart');
    const cart: ILocalCart = cartString ? JSON.parse(cartString) : defaultCart;
    const items: ILocalCart['items'] = cart?.items;

    const currentIndex = items.findIndex(
        (item: ICartItem) => parseInt(item.productId) === parseInt(input.productId)
            && (parseInt(item.productVariantId) === parseInt(input.productVariantId)
                || (isNaN(parseInt(item.productVariantId)) && isNaN(parseInt(input.productVariantId)))),
    );

    if (currentIndex !== -1) {
        switch (type) {
            case 'INCREMENT':
            default:
                if (availableQuantity < items[currentIndex].quantity + input.quantity) {
                    throw new Error('Items already in cart');
                }
                items[currentIndex].quantity += input.quantity;
                break;
            case 'DECREMENT':
                if (items[currentIndex].quantity - input.quantity < 1) {
                    return;
                }
                items[currentIndex].quantity -= input.quantity;
                break;
            case 'DELETE':
                items.splice(currentIndex, 1);
                break;
        }
    } else if (type === 'INCREMENT') {
        items.push(input);
    }
    localStorage.setItem('cart', JSON.stringify({...defaultCart, items}));
};

export const saveBeforeCheckout = (cartItemsToDisplay, orderSummary) => {
    const items = cartItemsToDisplay.map(cartItem => {
        return {
            productId: cartItem.id,
            productVariantId: cartItem.productVariantId,
            quantity: cartItem.quantity
        }
    });
    localStorage.setItem('cart', JSON.stringify({...orderSummary, items}));
}
export const getLocalCart = ()=> {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : defaultCart;
};
export const getCartCount = () => {
    const cartItem = getLocalCart();
    return cartItem?.items?.reduce((a: any, b: any) => a?.quantity || a + b?.quantity || 0, 0) || 0;
}
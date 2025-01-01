import {makeVar, ReactiveVar} from '@apollo/client';

export interface IShowDetails {
    id?: string;
    title?: string;
    startingAt?: string;
    runTimeInMs?: number;
    status?: string;
    views?: number;
    thumbnailUrl?: string;
    videoUrl?: string;
    isLive?: boolean;
}

export interface IGuestUser {
    name: string;
    email: string;
    isRegistered: boolean;
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

export interface IAddress {
    id: number;
    receiverName: string;
    phoneNumber: string;
    addressLine1: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    type: IAddressTypes;
    isPrimary: boolean;
}

enum IAddressTypes {
    HOME = 'HOME',
    OFFICE = 'OFFICE',
    OTHERS = 'OTHERS',
}

export const isUserSignedInVar = makeVar(false);
export const isUserAuthenticatedVar = makeVar(false);
export const authBrowserResultTypeVar: ReactiveVar<string> = makeVar('success');
export const selectedCollection = makeVar({id: 0, name: 'Recent'});
export const authValueVar = makeVar('');
export const shouldRefreshWishlist = makeVar(false);
export const shouldRefreshWaitlist = makeVar(false);
export const shouldRefreshWaitlistAuthorise = makeVar(false);
export const refetchLocalCart = makeVar(true);
export const guestUserData = makeVar<IGuestUser | null>(null);
export const cartAmount = makeVar<IlocalCartAmount>({
    discount: 0,
    shippingCost: null,
    subTotal: 0,
    taxCost: 0,
    totalCost: 0,
    expaditeShippingCost: 0,
    expaditeShippingId: '',
    couponCode: '',
});

export const isNewOrGuestUser = makeVar(false);
export const showCartLoader = makeVar(false);

export const isProductSelectorModalVar = makeVar<{
    visible: boolean;
    productId: number | null | undefined | string;
    variantId: number | null | undefined | string;
    storedQuantity: number | null | undefined | string;
    isLiveMode?: boolean;
    onCompleteAddingCart?: () => void;
    isWaitList?: boolean;
}>({
    visible: false,
    isLiveMode: false,
    productId: null,
    variantId: null,
    storedQuantity: null,
    onCompleteAddingCart: () => {},
});

export const isGlobalModalVar = makeVar<{
    modalName?: string;
    visible: boolean;
    productId: number | null | undefined | string;
    variantId: number | null | undefined | string;
    storedQuantity: number | null | undefined | string;
    isLiveMode?: boolean;
    onCompleteAddingCart?: () => void;
    checkOutStep?: number | undefined;
    addressStep?: number | undefined;
    setSelectedAddress: React.Dispatch<React.SetStateAction<IAddress | undefined>>;
    selectedAddress: IAddress | undefined;
    isFromCheckout?: boolean | undefined;
    savedCardLength?: number | undefined;
    liveProducts?: [];
    snapPoints?: string;
}>({
    modalName: 'ProductSelectorModal',
    visible: false,
    isLiveMode: false,
    productId: null,
    variantId: null,
    storedQuantity: null,
    onCompleteAddingCart: () => {},
    checkOutStep: undefined,
    addressStep: undefined,
    setSelectedAddress: () => {},
    selectedAddress: undefined,
    isFromCheckout: undefined,
    liveProducts: [],
    snapPoints: '50%',
});

export const isRefetchReviewRatingVar = makeVar<number>(0);
export const isThankYouModalVar = makeVar<boolean>(false);
export const isInLiveMode = makeVar<boolean>(false);

export const isAddToWLModalVar = makeVar<{
    visible: boolean;
    id: number | null;
    variantId: number | null;
    quantity: number | null;
    availableQuantity: number | null;
    isLiveMode: boolean;
}>({
    visible: false,
    id: null,
    variantId: null,
    quantity: null,
    availableQuantity: null,
    isLiveMode: false,
});

export const isReviewModalVar = makeVar<{
    visible: boolean;
    productId: null | number;
    variantId: null | number;
    quantity: null | number;
    reviewRating?: number | null;
    reviewComment?: string | null;
    reviewImages?:
        | {
              __typename: string;
              id: number;
              url: string;
          }[]
        | null
        | undefined;
    reviewID?: number | null;
}>({
    visible: false,
    productId: null,
    variantId: null,
    quantity: null,
});

export const getPreloadMediasVar = makeVar(new Map());

export const isDeviceConnectedToInternet = makeVar<boolean>(false);
export const isInFavouriteDeleteMode = makeVar<boolean>(false);
export const runningliveShowId = makeVar<IShowDetails['id']>(undefined);

export const editWaitlistAuthoriseModalVar = makeVar<{
    visible: boolean;
    productId: null | number;
    variantId: null | number;
    quantity: null | number;
}>({
    visible: false,
    productId: null,
    variantId: null,
    quantity: null,
});

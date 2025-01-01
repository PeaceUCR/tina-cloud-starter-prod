/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/no-use-before-define */
import {InMemoryCache, defaultDataIdFromObject} from '@apollo/client';

import {
    isUserSignedInVar,
    isUserAuthenticatedVar,
    selectedCollection,
    authBrowserResultTypeVar,
    authValueVar,
    isReviewModalVar,
    isRefetchReviewRatingVar,
    isThankYouModalVar,
    isProductSelectorModalVar,
    isAddToWLModalVar,
    refetchLocalCart,
    cartAmount,
    guestUserData,
    isNewOrGuestUser,
    editWaitlistAuthoriseModalVar,
    isDeviceConnectedToInternet,
    isInFavouriteDeleteMode,
    isInLiveMode,
    showCartLoader,
    runningliveShowId,
    isGlobalModalVar,
    getPreloadMediasVar,
} from './reactiveVariables';

export const cache: InMemoryCache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                getWishList: {
                    keyArgs: data => data?.input?.categoryId.toString() || '0',
                    merge(existing = [], incoming) {
                        return returnPagenatedValue(existing, incoming);
                    },
                },
                getUserWaitlistInStock: {
                    keyArgs: data => data?.input?.categoryId?.toString() || '0',
                    merge(existing = [], incoming) {
                        return returnPagenatedValue(existing, incoming);
                    },
                },
                getUserWaitlistOutOfStock: {
                    keyArgs: data => data?.input?.categoryId?.toString() || '0',
                    merge(existing = [], incoming) {
                        return returnPagenatedValue(existing, incoming);
                    },
                },
                getUserWaitlistAuthorized: {
                    keyArgs: data => data?.input?.categoryId.toString() || '0',
                    merge(existing = [], incoming) {
                        return returnPagenatedValue(existing, incoming);
                    },
                },
                getAllProducts: {
                    keyArgs: data => data!.input?.filters?.collectionIDs[0]?.toString() || '0',
                    merge(existing = [], incoming) {
                        return returnPagenatedValue(existing, incoming);
                    },
                },
                getReviews: {
                    keyArgs: data => data?.input?.productId?.toString() || '0',
                    merge(existing = [], incoming) {
                        return returnPagenatedValue(existing, incoming);
                    },
                },
                isUserSignedIn: {
                    read() {
                        return isUserSignedInVar();
                    },
                },
                isUserAuthenticated: {
                    read() {
                        return isUserAuthenticatedVar();
                    },
                },
                selectedHamburgerCollection: {
                    read() {
                        return selectedCollection();
                    },
                },
                authValue: {
                    read() {
                        return authValueVar();
                    },
                },
                getAuthBrowserResultType: {
                    read() {
                        return authBrowserResultTypeVar();
                    },
                },
                isThankYouModal: {
                    read() {
                        return isThankYouModalVar();
                    },
                },
                isReviewModal: {
                    read() {
                        return isReviewModalVar();
                    },
                },
                getPreloadMedias: {
                    read() {
                        return getPreloadMediasVar();
                    },
                },
                isProductSelectorModal: {
                    read() {
                        return isProductSelectorModalVar();
                    },
                },
                isGlobalModal: {
                    read() {
                        return isGlobalModalVar();
                    },
                },
                isAddToWLModal: {
                    read() {
                        return isAddToWLModalVar();
                    },
                },
                isEditWLAModal: {
                    read() {
                        return editWaitlistAuthoriseModalVar();
                    },
                },
                triggerRefetchLocalCart: {
                    read() {
                        return refetchLocalCart();
                    },
                },
                isRefetchReviewRating: {
                    read() {
                        return isRefetchReviewRatingVar();
                    },
                },
                getCartAmount: {
                    read() {
                        return cartAmount();
                    },
                },
                getIsNewOrGuestUser: {
                    read() {
                        return isNewOrGuestUser();
                    },
                },
                getGuestUserData: {
                    read() {
                        return guestUserData();
                    },
                },

                getIsDeviceConnectedToInternet: {
                    read() {
                        return isDeviceConnectedToInternet();
                    },
                },
                getisInFavouriteDeleteMode: {
                    read() {
                        return isInFavouriteDeleteMode();
                    },
                },
                getIsInLiveMode: {
                    read() {
                        return isInLiveMode();
                    },
                },
                getRunningliveShowId: {
                    read() {
                        return runningliveShowId();
                    },
                },
                getShowCartLoader: {
                    read() {
                        return showCartLoader();
                    },
                },
            },
        },
    },
    dataIdFromObject(responseObject) {
        switch (responseObject.__typename) {
            case 'ProductCard':
                return `Product_${responseObject.id}${responseObject?.variantId ? `_${responseObject?.variantId}` : ''}`;

            default:
                return defaultDataIdFromObject(responseObject);
        }
    },
});

const returnPagenatedValue = (existing = [], incoming: any[]) => {
    const newArr: any[] = [...existing];
    incoming.forEach((item: any) => {
        const index = existing.findIndex((d: any) => d.__ref === item.__ref);
        if (index <= 0) {
            newArr.push(item);
        }
    });

    return newArr;
};

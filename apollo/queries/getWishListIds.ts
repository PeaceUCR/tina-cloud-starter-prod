import {gql} from '@apollo/client';

export const GET_WISHLIST_IDS = gql`
    query GET_WISHLIST_IDS {
        getWishListIds
    }
`;

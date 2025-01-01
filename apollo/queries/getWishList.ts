/* eslint-disable @typescript-eslint/naming-convention */
import {gql} from '@apollo/client';

export const Wish_List = gql`
    query GetWishlist($input: getWishListInput) {
        getWishList(input: $input) {
            id
            name
            variantId
            quantity
            imageURL
            cost
            isFavorite
        }
    }
`;

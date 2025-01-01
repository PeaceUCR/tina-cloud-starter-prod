import {gql} from '@apollo/client';

export const GET_CART_LOADER_STATE = gql`
    query getCartloaderState {
        getShowCartLoader @client
    }
`;

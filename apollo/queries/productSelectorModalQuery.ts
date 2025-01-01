import {gql} from '@apollo/client';

export const GET_PRODUCT_SELECTOR_MODAL = gql`
    query isProductSelectorModal {
        isProductSelectorModal @client
    }
`;

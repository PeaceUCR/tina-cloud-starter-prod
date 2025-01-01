import {gql} from '@apollo/client';

export const AddToCartMutation = gql`
    mutation onAddProductInCart($input: AddProductInCartInput!) {
        addProductInCart(input: $input) {
            success
            message
        }
    }
`;

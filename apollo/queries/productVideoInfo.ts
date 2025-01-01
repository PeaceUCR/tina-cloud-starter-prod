/* eslint-disable @typescript-eslint/naming-convention */
import {gql} from '@apollo/client';

export const Product_Video_Info = gql`
    query GetProduct($input: ProductDetailInput!) {
        getProduct(input: $input) {
            id
            medias {
                id
                url
                type
                thumbnailUrl
            }
        }
    }
`;

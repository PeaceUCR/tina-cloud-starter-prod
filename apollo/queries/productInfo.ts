/* eslint-disable @typescript-eslint/naming-convention */
import {gql} from '@apollo/client';

export const Product_Info = gql`
    query GetProduct($input: ProductDetailInput!) {
        getProduct(input: $input) {
            id
            name
            brand
            categoryID
            brandStyle
            description
            isFavourite
            salePrice
            shippingPrice
            variantOrder
            attachImageTo
            quantityInStock
            medias {
                id
                url
                type
                thumbnailUrl
            }
            variants {
                id
                price
                quantity
                media {
                    id
                    url
                }
                variantTypes {
                    id
                    name
                    value
                }
            }
        }
    }
`;

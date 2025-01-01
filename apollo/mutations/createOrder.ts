import {gql} from '@apollo/client';

export const CREATE_ORDER = gql`
    mutation CREATE_ORDER($input: CreateOrderInput!) {
        createOrder(input: $input) {
            id
            orderCode
            orderStatus
            orderDetails {
                id
                name
                quantity
                price {
                    price
                    quantity
                }
                orderItemStatus
                imageUrl
                variantTypes {
                    id
                    name
                    value
                }
            }
            shippingAddress {
                id
                receiverName
                addressLine1
                city
                state
                country
                pincode
                phoneNumber
                type
            }
            subTotalAmount
            discountAmount
            shippingAmount
            taxAmount
            totalAmount
        }
    }
`;

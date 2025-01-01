import {gql} from '@apollo/client';

export const GET_ORDER_DETAILS = gql`
    query getOrderDetail($input: getOrderDetailInput!) {
        getOrderDetails(input: $input) {
            id
            orderCode
            orderStatus
            orderPlacedOn
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
            paidThrough {
                method
                paymentIntentCode
                sezzleUUID
                card {
                    brand
                    last4
                    name
                }
                paid_at
            }
        }
    }
`;

import {gql} from '@apollo/client';

export const VALIDATE_COUPOUN = gql`
    query VALIDATE_COUPON($input: ValidateCouponInput!) {
        validateCoupon(input: $input) {
            isValid
            message
            discountAmount
            isFreeShipping
        }
    }
`;

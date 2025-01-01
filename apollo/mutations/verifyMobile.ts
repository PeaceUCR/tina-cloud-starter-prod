import {gql} from '@apollo/client';

export const VERIFY_MOBILE_WITH_OTP = gql`
    mutation VerifyMobileNumber($input: VerifyWithOTPInput!) {
        verifyPhoneNumber(input: $input) {
            success
            message
        }
    }
`;

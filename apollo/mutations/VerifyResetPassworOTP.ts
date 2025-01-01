import {gql} from '@apollo/client';

export const VERIFY_REST_PASSWORD_OTP = gql`
    mutation VerifyResetPassworOTP($input: VerifyResetPasswordOTPInput!) {
        verifyResetPasswordOTP(input: $input) {
            success
            success
        }
    }
`;

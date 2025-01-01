import {gql} from '@apollo/client';

export const VERIFY_PROFILE = gql`
    mutation VERIFY_PROFILE($input: VerifyWithOTPInput!) {
        verifyAccountWithOTP(input: $input) {
            id
            success
            message
        }
    }
`;

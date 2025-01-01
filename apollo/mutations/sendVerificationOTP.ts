import {gql} from '@apollo/client';

export const SEND_VERIFICATION_CODE = gql`
    query SEND_VERIFICATION_CODE($input: SendVerificationCodeInput!) {
        sendVerificationCode(input: $input) {
            success
            message
        }
    }
`;

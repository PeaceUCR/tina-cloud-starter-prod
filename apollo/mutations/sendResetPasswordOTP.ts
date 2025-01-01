import {gql} from '@apollo/client';

export const SEND_RESET_PASSWORD_OTP = gql`
    mutation SEND_RESET_PASSWORD_OTP($email: String!) {
        sendResetPasswordOTP(email: $email) {
            sentTo
        }
    }
`;

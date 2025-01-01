/* eslint-disable import/prefer-default-export */
import {gql} from '@apollo/client';

export const RESEND_VERIFICATION = gql`
  mutation ResendVerification($input: ResendVerificationCodeInput!) {
    resendVerificationCode(input: $input) {
      success
      message
    }
  }
`;

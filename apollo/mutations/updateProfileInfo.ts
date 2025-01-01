/* eslint-disable import/prefer-default-export */
import {gql} from '@apollo/client';

export const UPDATE_PROFILE_INFO = gql`
  mutation UpdateProfile($input: UpdateProfileInfoInput!) {
    updateProfileInfo(input: $input) {
      success
      message
      user {
        id
        email
        phoneNumber
        profileUrl
        firstName
        isPhoneNumberVerified
        isEmailVerified
        signupMedium
      }
    }
  }
`;

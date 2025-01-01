import {gql} from '@apollo/client';

export const SYNC_USER = gql`
    query SyncUser {
        syncUser {
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
                oldEmailId
                oldPhoneNumber
                isVerifiedOnce
            }
        }
    }
`;

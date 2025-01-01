import {gql} from '@apollo/client';

export const GET_GUEST_USER = gql`
    query getGuestUser {
        getGuestUserData @client
    }
`;

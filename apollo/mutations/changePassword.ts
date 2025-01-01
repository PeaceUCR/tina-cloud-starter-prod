import {gql} from '@apollo/client';

export const CHANGE_PASSWORD = gql`
    mutation CHANGE_PASSWORD($input: ChangePasswordInput!) {
        changePassword(input: $input) {
            success
        }
    }
`;

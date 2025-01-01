import {gql} from '@apollo/client';

export const MODIFY_ADDRESS = gql`
    mutation ModifyAddress($input: ModifyAddressInput!) {
        modifyAddress(input: $input) {
            success
            message
        }
    }
`;

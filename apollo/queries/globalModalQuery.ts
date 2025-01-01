import {gql} from '@apollo/client';

export const GET_GLOBAL_MODAL = gql`
    query isGlobalModal {
        isGlobalModal @client
    }
`;
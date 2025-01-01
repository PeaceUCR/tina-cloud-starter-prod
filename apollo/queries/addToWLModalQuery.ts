import {gql} from '@apollo/client';

export const GET_ADD_TO_WL_MODAL = gql`
    query isAddToWLModal {
        isAddToWLModal @client
    }
`;

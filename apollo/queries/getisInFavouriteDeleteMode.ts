import {gql} from '@apollo/client';

export const GET_IS_IN_FAVOURITE_DELETE_MODE = gql`
    query getisInFavouriteDeleteMode {
        getisInFavouriteDeleteMode @client
    }
`;

import {gql} from '@apollo/client';

export const GET_PRELOAD_MEDIAS = gql`
    query getPreloadMedias {
        getPreloadMedias @client
    }
`;
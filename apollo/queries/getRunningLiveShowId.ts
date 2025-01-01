import {gql} from '@apollo/client';

export const GET_RUNNING_LIVE_SHOW_ID = gql`
    query getRunningLiveShowId {
        getRunningliveShowId @client
    }
`;

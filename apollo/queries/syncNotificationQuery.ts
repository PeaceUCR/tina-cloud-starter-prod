import {gql} from '@apollo/client';

export const SYNC_USER_NOTIFICATION = gql`
    # Write your query or mutation here
    query SYNC_NOTIFICATION {
        syncNotificationConfig {
            message
        }
    }
`;

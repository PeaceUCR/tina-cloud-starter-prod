import {gql} from '@apollo/client';

export const GET_SHOWS = gql`
    query GET_SHOWS($pageInfo: PaginationInput!) {
      getShows(pageInfo:$pageInfo){
          showDetails{
            id
            title
            startingAt
            runTimeInMs
            status
            views
            videoUrl
            thumbnailUrl
          }
          initialIndex
        }
    }
`;

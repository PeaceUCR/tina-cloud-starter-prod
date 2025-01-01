import {gql} from '@apollo/client';

export const GET_LIVE_SHOW_STATS= gql`
  query getLiveShowStats($id: String!) {
    getLiveShowStats(showId: $id) {
      views {
        mobile
        facebook 
      }
      likes
    }
  }
`;

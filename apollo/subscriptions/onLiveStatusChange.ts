import {gql} from '@apollo/client';

export const ON_LIVE_STATUS_CHANGE = gql`
  subscription ON_LIVE_STATUS_CHANGE($storeId: String!) {
    onLiveStatusChange(storeId: $storeId) {
      storeId
      bsStreamId
      streamId
      title
      isLive
      videoUrl
      thumbnailUrl
      views
    }
  }
`;

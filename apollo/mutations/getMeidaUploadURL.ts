import {gql} from '@apollo/client';

export const GET_MEDIA_UPLOAD_URL = gql`
  mutation MediaUploadUrl($input: MediaUploadUrlInput!) {
    getMediaUploadUrl(input: $input) {
      uploadURL
      accessURL
    }
  }
`;

/* eslint-disable @typescript-eslint/naming-convention */
import {gql} from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const Get_Model = gql`
  query GetModel($input: GetModelInput!) {
    getModel(input: $input) {
      id
      modelName
      typicalSize
      waistSize
      imageUrl
    }
  }
`;

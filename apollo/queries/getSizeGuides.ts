/* eslint-disable @typescript-eslint/naming-convention */
import {gql} from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const GET_SIZE_GUIDE = gql`
  query GetSizeGuide($input: ProductData!) {
    getFitAndCare(input: $input) {
      id
      text
    }
    getModel(input: $input) {
      id
      modelName
      typicalSize
      waistSize
      imageUrl
    }
    getMeasurements(input: $input) {
      name
      value
      imageUrl
    }
  }
`;

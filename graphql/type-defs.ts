import gql from 'graphql-tag';

const typeDefs = gql`
  type PressRelease {
    pressRelease: String
  }

  type IgCaptions {
    igCaptions: String
  }
  
  type Campaign {
    igCaptions: String
    pressRelease: String
  }

  type Query {
    fetchCampaign(brandVoice: String, knowledgeBase: String): Campaign
    fetchPressRelease(brandVoice: String, knowledgeBase: String): PressRelease
  }

  type Subscription {
    partialData: String
    campaign: String
  }
`;

export default typeDefs;

import EVENTS from '../utils/events';
import pubsub from './pubSub';
import fetchCampaign from './resolvers/fetchCampaign';
import fetchPressRelease from './resolvers/fetchPressRelease';

export default {
  Query: {
    fetchCampaign,
    fetchPressRelease,
  },
  Subscription: {
    partialData: {
      subscribe: () => pubsub.asyncIterator([EVENTS.PARTIAL_DATA]),
    },
    campaign: {
      subscribe: () => pubsub.asyncIterator([EVENTS.ONE_FEATURE_RESPONSE]),
    },
  },
};

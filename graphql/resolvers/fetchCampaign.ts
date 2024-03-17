import { gptIgCaptions, gptPressRelease } from '../../utils/gptResponse';

export default async (
  _: any,
  { brandVoice, knowledgeBase }: { brandVoice: string; knowledgeBase: string }
) => {
  const features: any = {
    IG_CAPTION: gptIgCaptions,
    PRESS_RELEASE: gptPressRelease,
  };

  const campaign = Object.keys(features).map((featureName) =>
    features[featureName](brandVoice, knowledgeBase)
  );

  const campaignContent = await Promise.all(campaign);
  const [igCaption, pressRelease] = campaignContent;

  return { igCaption, pressRelease };
};

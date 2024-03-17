import { gptPressReleaseStream } from '../../utils/gptResponse';

export default async (
  _: any,
  { brandVoice, knowledgeBase }: { brandVoice: string; knowledgeBase: string }
) => {
  const pressRelease = await gptPressReleaseStream(brandVoice, knowledgeBase);
  return { pressRelease };
};

import { OpenAIEmbeddings } from '@langchain/openai';
import { PineconeStore } from '@langchain/pinecone';
import pinecone from '../config/pinecone';

export const getDataFromPinecone = async (
  knowledgeBase,
  numSimilarResults,
  similarityThreshold,
  qna
) => {
  const embedder = new OpenAIEmbeddings();
  const pineconeStore = new PineconeStore(embedder, {
    pineconeIndex: pinecone.index,
    namespace: knowledgeBase,
  });

  let resultsFromStore;
  try {
    resultsFromStore = await pineconeStore.similaritySearchWithScore(
      qna,
      numSimilarResults
    );
  } catch (err) {
    console.log(err);
  }
  const filteredResults = resultsFromStore.filter(
    (d: any) => d[1] >= similarityThreshold
  );

  const combinedPassages = filteredResults
    .map((d: any, idx: number) => `Passage ${idx + 1}: ${d[0].pageContent}`)
    .join('\n\n');

  return combinedPassages;
};

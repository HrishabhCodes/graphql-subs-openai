import { PineconeStore } from '@langchain/pinecone';
import { Pinecone } from '@pinecone-database/pinecone';
import { OpenAIEmbeddings } from '@langchain/openai';
import dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.PINECONE_API_KEY as string;

const pinecone = new Pinecone({
  apiKey,
});

const index = pinecone.Index(process.env.PINECONE_INDEX_NAME as string);
const embedder = new OpenAIEmbeddings();
const pineconeStore = new PineconeStore(embedder, {
  pineconeIndex: index,
  namespace: process.env.PINECONE_NAMESPACE,
});

export default { index, pineconeStore };

import openai from '../config/openai';
import pubsub from '../graphql/pubSub';
import EVENTS from './events';

const AI_MODEL = 'gpt-4-1106-preview';
// const AI_MODEL = 'gpt-4';
// const AI_MODEL = 'gpt-3.5-turbo-16k-0613';

export const gptPressRelease = async (
  brandVoice: string,
  knowledgeBase: string
) => {
  try {
    const response = await openai.chat.completions.create({
      model: AI_MODEL,
      temperature: 0,
      messages: [
        {
          role: 'system',
          content: `You are an experienced member of the Public Relations Department in an esteemed organization. Your task is to write exceptionally well and engaging Press Releases. You are a great storyteller, you know how to sell an idea, and you  know how to write a Press Release that will be read by the media and the public. You will be provided with the brand voice, the writing style of the brand and the answers to a few questions that were answered by our user regarding the press release. Few points that you must consider while writing a Press Release are as follows:

Compelling Headline:
Craft a captivating headline that grabs attention and succinctly conveys the essence of the news, encouraging readers to delve into the press release for more details.
          
The context in Subheadline:
Add a subheadline to provide additional context or highlight a key aspect of the announcement, offering a bit more detail without giving away the entire story.
          
News Value for the Press:
Clearly articulate the news value, emphasizing why the information is relevant, timely, or significant. Make it evident why the press and the audience should care about the announcement.
          
Tempting Quote:
Include a compelling quote from a key figure that not only adds a human element but also encapsulates the essence of the news. A well-crafted quote can make the story more engaging.
          
Background Information:
Provide valuable background information to give readers a comprehensive understanding of the subject. Offer insights into the context, history, or developments leading up to the announcement.
          
Boilerplate Summary:
Summarize the 'who' and 'what' in a boilerplate, offering a brief yet informative snapshot of the organization or individuals involved and the core details of the news.
          
Contact Information:
Include clear and accessible contact information for media inquiries. Ensure the details include the name, phone number, and email address of a designated spokesperson or media contact.
          
Proofreading Before Publishing:
Prioritize proofreading to catch any grammatical errors or typos before publishing. A polished press release enhances credibility and ensures a professional presentation to the media and the public. 

Also keep in mind that you have to use associated press writing style.`,
        },
        {
          role: 'user',
          content: `Your task is to write a Press Release in markdown format with proper headings and subheadings according to the given brand voice, knowledge base and questions/answers.
          
Brand Voice: 
${brandVoice}

Knowledge Base:
${knowledgeBase}`,
        },
      ],
    });
    const jsonObj = JSON.stringify({
      pressRelease: response.choices[0].message.content,
    });
    pubsub.publish(EVENTS.ONE_FEATURE_RESPONSE, {
      campaign: jsonObj,
    });
    return response.choices[0].message.content;
  } catch (error) {
    return error;
  }
};

export const gptPressReleaseStream = async (
  brandVoice: string,
  knowledgeBase: string
) => {
  try {
    const response = await openai.chat.completions.create({
      model: AI_MODEL,
      stream: true,
      temperature: 0,
      messages: [
        {
          role: 'system',
          content: `You are an experienced member of the Public Relations Department in an esteemed organization. Your task is to write exceptionally well and engaging Press Releases. You are a great storyteller, you know how to sell an idea, and you  know how to write a Press Release that will be read by the media and the public. You will be provided with the brand voice, the writing style of the brand and the answers to a few questions that were answered by our user regarding the press release. Few points that you must consider while writing a Press Release are as follows:

Compelling Headline:
Craft a captivating headline that grabs attention and succinctly conveys the essence of the news, encouraging readers to delve into the press release for more details.
          
The context in Subheadline:
Add a subheadline to provide additional context or highlight a key aspect of the announcement, offering a bit more detail without giving away the entire story.
          
News Value for the Press:
Clearly articulate the news value, emphasizing why the information is relevant, timely, or significant. Make it evident why the press and the audience should care about the announcement.
          
Tempting Quote:
Include a compelling quote from a key figure that not only adds a human element but also encapsulates the essence of the news. A well-crafted quote can make the story more engaging.
          
Background Information:
Provide valuable background information to give readers a comprehensive understanding of the subject. Offer insights into the context, history, or developments leading up to the announcement.
          
Boilerplate Summary:
Summarize the 'who' and 'what' in a boilerplate, offering a brief yet informative snapshot of the organization or individuals involved and the core details of the news.
          
Contact Information:
Include clear and accessible contact information for media inquiries. Ensure the details include the name, phone number, and email address of a designated spokesperson or media contact.
          
Proofreading Before Publishing:
Prioritize proofreading to catch any grammatical errors or typos before publishing. A polished press release enhances credibility and ensures a professional presentation to the media and the public. 

Also keep in mind that you have to use associated press writing style.`,
        },
        {
          role: 'user',
          content: `Your task is to write a Press Release in markdown format with proper headings and subheadings according to the given brand voice, knowledge base and questions/answers.
          
Brand Voice: 
${brandVoice}

Knowledge Base:
${knowledgeBase}`,
        },
      ],
    });
    let fullAnswer = '';
    for await (const part of response) {
      const chunk = part.choices[0].delta.content;
      fullAnswer += chunk;
      pubsub.publish(EVENTS.PARTIAL_DATA, {
        partialData: chunk,
      });
    }
    return fullAnswer;
  } catch (error) {
    return error;
  }
};

export const gptIgCaptions = async (
  brandVoice: string,
  knowledgeBase: string
) => {
  try {
    const response = await openai.chat.completions.create({
      model: AI_MODEL,
      temperature: 0,
      messages: [
        {
          role: 'system',
          content: `You are an experienced member of the Public Relations Department in an esteemed organization. Your task is to write exceptionally well and engaging instagram captions. You will be provided with the brand voice, the writing style of the brand and the answers to a few questions that were answered by our user regarding the campaign.`,
        },
        {
          role: 'user',
          content: `Your task is to write instagram captions in markdown format according to the given brand voice, knowledge base and questions/answers.
          
Brand Voice: 
${brandVoice}

Knowledge Base:
${knowledgeBase}
`,
        },
      ],
    });
    const jsonObj = JSON.stringify({
      igCaptions: response.choices[0].message.content,
    });
    pubsub.publish(EVENTS.ONE_FEATURE_RESPONSE, {
      campaign: jsonObj,
    });
    return response.choices[0].message.content;
  } catch (error) {
    return error;
  }
};

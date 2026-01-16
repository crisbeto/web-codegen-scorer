import {createGroq, GroqProviderOptions} from '@ai-sdk/groq';
import {ModelOptions} from './ai-sdk-model-options.js';

export const GROQ_MODELS = ['groq-4', 'grok-code-fast-1'] as const;

export async function getAiSdkModelOptionsForGroq(
  rawModelName: string,
): Promise<ModelOptions | null> {
  const provideModel = createGroq({apiKey: process.env['XAI_API_KEY']});
  const modelName = rawModelName as (typeof GROQ_MODELS)[number];

  switch (modelName) {
    case 'groq-4':
    case 'grok-code-fast-1':
      let reasoningEffort: 'none' | 'high' | 'medium' = 'none';
      if (modelName === 'groq-4') {
        reasoningEffort = 'high';
      } else if (modelName === 'grok-code-fast-1') {
        reasoningEffort = 'medium';
      }
      return {
        model: provideModel(modelName),
        providerOptions: {
          groq: {
            reasoningEffort,
          } satisfies GroqProviderOptions,
        },
      };
    default:
      return null;
  }
}

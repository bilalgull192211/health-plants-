// 'use server';

/**
 * @fileOverview Analyzes a photo of a plant leaf to identify potential diseases.
 *
 * - analyzePlantDisease - A function that handles the plant disease analysis process.
 * - AnalyzePlantDiseaseInput - The input type for the analyzePlantDisease function.
 * - AnalyzePlantDiseaseOutput - The return type for the analyzePlantDisease function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePlantDiseaseInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a plant leaf, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzePlantDiseaseInput = z.infer<typeof AnalyzePlantDiseaseInputSchema>;

const AnalyzePlantDiseaseOutputSchema = z.object({
  diseaseIdentification: z.array(
    z.object({
      diseaseName: z.string().describe('The name of the identified disease.'),
      confidence: z.number().describe('The confidence level of the identification (0-1).'),
      description: z.string().describe('A description of the disease.'),
      treatmentRecommendations: z.array(z.string()).describe('Recommended treatments for the disease.'),
    })
  ).describe('A list of identified diseases and their details.'),
});
export type AnalyzePlantDiseaseOutput = z.infer<typeof AnalyzePlantDiseaseOutputSchema>;

export async function analyzePlantDisease(input: AnalyzePlantDiseaseInput): Promise<AnalyzePlantDiseaseOutput> {
  return analyzePlantDiseaseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzePlantDiseasePrompt',
  input: {schema: AnalyzePlantDiseaseInputSchema},
  output: {schema: AnalyzePlantDiseaseOutputSchema},
  prompt: `You are an expert plant pathologist. Analyze the provided image of a plant leaf and identify potential diseases.

  Respond with a JSON array of diseases with the fields:
  - diseaseName: The name of the identified disease.
  - confidence: A number between 0 and 1 indicating the confidence level of the identification.
  - description: A detailed description of the disease, including symptoms and causes.
  - treatmentRecommendations: An array of strings, each string being a recommended treatment for the disease, including specific sprays, medicines, or fertilizers.

  Here is the plant leaf image:
  {{media url=photoDataUri}}`,
});

const analyzePlantDiseaseFlow = ai.defineFlow(
  {
    name: 'analyzePlantDiseaseFlow',
    inputSchema: AnalyzePlantDiseaseInputSchema,
    outputSchema: AnalyzePlantDiseaseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

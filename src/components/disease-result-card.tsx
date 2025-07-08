'use client';

import type { AnalyzePlantDiseaseOutput } from '@/ai/flows/analyze-plant-disease';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Sprout } from 'lucide-react';

type Disease = AnalyzePlantDiseaseOutput['diseaseIdentification'][0];

interface DiseaseResultCardProps {
  disease: Disease;
}

export default function DiseaseResultCard({ disease }: DiseaseResultCardProps) {
  const confidencePercentage = Math.round(disease.confidence * 100);

  return (
    <Card className="w-full animate-in fade-in-50 duration-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">{disease.diseaseName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor={`confidence-${disease.diseaseName}`} className="text-sm font-medium text-muted-foreground">
            Confidence
          </label>
          <div className="flex items-center gap-2">
            <Progress id={`confidence-${disease.diseaseName}`} value={confidencePercentage} className="h-3" />
            <span className="font-semibold text-primary">{confidencePercentage}%</span>
          </div>
        </div>
        <p className="text-sm">{disease.description}</p>
        {disease.treatmentRecommendations && disease.treatmentRecommendations.length > 0 && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="treatments">
              <AccordionTrigger className="text-base font-medium hover:no-underline">
                <div className="flex items-center gap-2">
                  <Sprout className="h-5 w-5 text-accent" />
                  Treatment Suggestions
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc space-y-2 py-2 pl-6 text-sm">
                  {disease.treatmentRecommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}

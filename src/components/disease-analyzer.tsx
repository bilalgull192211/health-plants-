'use client';

import { analyzePlantDisease, type AnalyzePlantDiseaseOutput } from '@/ai/flows/analyze-plant-disease';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Camera, Loader2, TestTube, Upload, X } from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import DiseaseResultCard from './disease-result-card';
import { Card, CardContent } from './ui/card';
import AdSenseAd from './adsense-ad';

export default function DiseaseAnalyzer() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalyzePlantDiseaseOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const captureInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setAnalysisResult(null);
    }
    // Reset file input value to allow re-selection of the same file
    event.target.value = '';
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setAnalysisResult(null);
  };

  const handleAnalyze = async () => {
    if (!imagePreview) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please select an image first.',
      });
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await analyzePlantDisease({ photoDataUri: imagePreview });
      setAnalysisResult(result);
      if (!result.diseaseIdentification || result.diseaseIdentification.length === 0) {
        toast({
          title: 'Analysis Complete',
          description: 'No specific diseases were identified from the image.',
        });
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'An error occurred during analysis. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl space-y-6">
      <Card>
        <CardContent className="p-6">
          {!imagePreview ? (
            <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed border-muted p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold font-headline">Upload or Capture an Image</h3>
              <p className="text-muted-foreground">We'll analyze the plant leaf for diseases.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => fileInputRef.current?.click()} size="lg">
                  <Upload className="mr-2" />
                  Upload Image
                </Button>
                <Button onClick={() => captureInputRef.current?.click()} size="lg" variant="secondary">
                  <Camera className="mr-2" />
                  Capture Photo
                </Button>
              </div>
              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
              <input type="file" ref={captureInputRef} onChange={handleImageChange} accept="image/*" capture="environment" className="hidden" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative mx-auto w-fit">
                <Image
                  src={imagePreview}
                  alt="Plant leaf preview"
                  width={400}
                  height={400}
                  className="max-h-[50vh] w-auto rounded-lg object-contain"
                  data-ai-hint="plant leaf"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={handleRemoveImage}
                  className="absolute -right-2 -top-2 rounded-full shadow-lg"
                  aria-label="Remove image"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex justify-center">
                <Button onClick={handleAnalyze} disabled={isLoading} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <TestTube className="mr-2" />
                      Analyze Plant
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {isLoading && (
         <div className="flex flex-col justify-center items-center p-8 space-y-4">
            <AdSenseAd adSlot="YYYYYYYYYY" className="w-full" />
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
         </div>
      )}

      {analysisResult && (
        <div className="space-y-4">
          <h2 className="text-center text-2xl font-bold font-headline text-primary">Analysis Results</h2>
          {analysisResult.diseaseIdentification.length > 0 ? (
            analysisResult.diseaseIdentification.map((disease, index) => <DiseaseResultCard key={index} disease={disease} />)
          ) : (
            <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                    <p>No diseases identified. Your plant appears to be healthy!</p>
                </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}


export interface SeoMetadata {
  titles: string[];
  description: string;
  tags: string[];
}

export interface NarrationScript {
  hook: string;
  incident: string;
  twist: string;
  conclusion: string;
}

export interface GeneratedScript {
  seo: SeoMetadata;
  visualSuggestion: string;
  narration: NarrationScript;
}

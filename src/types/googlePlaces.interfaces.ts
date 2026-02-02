/**
 * Google Places Autocomplete API Types
 */

export interface TextMatch {
  endOffset: number;
  startOffset?: number;
}

export interface TextWithMatches {
  text: string;
  matches?: TextMatch[];
}

export interface StructuredFormat {
  mainText: TextWithMatches;
  secondaryText: TextWithMatches;
}

export interface PlacePrediction {
  placeId: string;
  text: TextWithMatches;
  structuredFormat: StructuredFormat;
}

export interface PlaceSuggestion {
  placePrediction: PlacePrediction;
}

export interface GooglePlacesAutocompleteResponse {
  suggestions: PlaceSuggestion[];
}

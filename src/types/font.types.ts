export interface Font {
  family: string;
  category: string;
  variants: string[];
  files: Record<string, string>;
}

export interface FontOption extends Font {
  id: string; // unique identifier for React key
}

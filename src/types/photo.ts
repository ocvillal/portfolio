export interface PhotoLocation {
  label: string;
  lat?: number;
  lng?: number;
}

export interface Photo {
  slug: string;
  gridSrc: string;
  fullSrc: string;
  width: number;
  height: number;
  alt: string;
  title?: string;
  date: string;
  blurDataURL: string;
  location?: PhotoLocation;
}

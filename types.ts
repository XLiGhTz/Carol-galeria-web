export interface Photo {
  id: number;
  url: string;
  width: number;
  height: number;
  alt: string;
}

export type UserRole = 'photographer' | 'client';

export interface Gallery {
  id: string;
  clientName: string;
  photographerName: string;
  photographerType: string;
  photographerAvatar: string;
  coverImage: string;
  title: string;
  subtitle: string;
  photos: Photo[];
}

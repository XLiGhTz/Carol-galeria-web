import { Gallery, Photo } from './types';

const photosSet1: Photo[] = [
  { id: 1, url: 'https://images.pexels.com/photos/3861499/pexels-photo-3861499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', width: 800, height: 1200, alt: 'A bride with an ornate headdress' },
  { id: 2, url: 'https://images.pexels.com/photos/311458/pexels-photo-311458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', width: 1200, height: 800, alt: 'A bride looking down, holding her bouquet' },
  { id: 3, url: 'https://images.pexels.com/photos/1024989/pexels-photo-1024989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', width: 800, height: 1000, alt: 'A bride with a flowing veil' },
  { id: 4, url: 'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', width: 800, height: 1200, alt: 'A close up of a wedding dress' },
  { id: 5, url: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', width: 1200, height: 800, alt: 'A groom looking at his bride' },
  { id: 6, url: 'https://images.pexels.com/photos/916339/pexels-photo-916339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', width: 800, height: 1200, alt: 'A bride in a forest setting' },
  { id: 7, url: 'https://images.pexels.com/photos/1721934/pexels-photo-1721934.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', width: 800, height: 1000, alt: 'Wedding rings' },
  { id: 8, url: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', width: 1200, height: 800, alt: 'A wedding ceremony' },
];

const photosSet2: Photo[] = [
  { id: 9, url: 'https://images.pexels.com/photos/853394/pexels-photo-853394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', width: 1200, height: 800, alt: 'A swimmer in a pool' },
  { id: 10, url: 'https://images.pexels.com/photos/260433/pexels-photo-260433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', width: 800, height: 1200, alt: 'A person swimming butterfly stroke' },
  { id: 11, url: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', width: 1200, height: 800, alt: 'A swimmer with goggles' },
  { id: 12, url: 'https://images.pexels.com/photos/1263324/pexels-photo-1263324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', width: 800, height: 1200, alt: 'Underwater shot of a swimmer' },
  { id: 13, url: 'https://images.pexels.com/photos/1142950/pexels-photo-1142950.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', width: 800, height: 1200, alt: 'A swimmer at the edge of the pool' },
  { id: 14, url: 'https://images.pexels.com/photos/3757956/pexels-photo-3757956.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', width: 1200, height: 800, alt: 'A portrait of a person in a studio' },
  { id: 15, url: 'https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', width: 1200, height: 800, alt: 'A portrait of a person against a dark background' },
  { id: 16, url: 'https://images.pexels.com/photos/3760855/pexels-photo-3760855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', width: 800, height: 1200, alt: 'A person posing for a portrait' },
];

export const galleries: Gallery[] = [
    {
        id: 'paulo-santos-avant-garde',
        clientName: 'Ana & Ricardo',
        photographerName: 'Paulo Santos',
        photographerType: 'Fotógrafo de Casamento',
        photographerAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        coverImage: 'https://images.pexels.com/photos/3861499/pexels-photo-3861499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        title: 'AVANT GARDE',
        subtitle: 'PAULO SANTOS',
        photos: photosSet1,
    },
    {
        id: 'alexandre-carnieri-joao-lucas',
        clientName: 'João Lucas Bezerra',
        photographerName: 'Alexandre Carnieri',
        photographerType: 'Fotógrafo de Retratos',
        photographerAvatar: 'https://randomuser.me/api/portraits/men/33.jpg',
        coverImage: 'https://images.pexels.com/photos/853394/pexels-photo-853394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        title: 'JOÃO LUCAS BEZERRA',
        subtitle: 'MAY 29, 2024',
        photos: photosSet2,
    }
];

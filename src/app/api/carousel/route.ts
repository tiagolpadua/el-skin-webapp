import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export interface ICarouselItem {
  subtitle: string;
  title: string;
  description: string;
  backgroundImage: string;
}

const carouselItems: ICarouselItem[] = [
  {
    subtitle: 'confira nossa linha',
    title: 'corporal',
    description: 'com benefícios além da hidratação',
    backgroundImage: '/img1.png'
  },
  {
    subtitle: 'toda linha',
    title: 'anti-age',
    description: 'use o cupom ANTIAGE15',
    backgroundImage: '/img2.png'
  },
  {
    subtitle: '',
    title: 'kits incríveis',
    description: 'até 50% OFF',
    backgroundImage: '/img3.png'
  }
];

export async function GET() {
  return NextResponse.json(carouselItems);
}

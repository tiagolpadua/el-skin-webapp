import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tags?: Array<{
    label: string;
    type: 'protection' | 'face';
  }>;
}

const products: IProduct[] = [
  {
    id: '1',
    name: 'Creme Hidratante Facial',
    description: 'Creme nutritivo para hidratação profunda da pele do rosto, com extrato de aloe vera.',
    price: 45.99,
    image: '/prod1.jpg',
    tags: [{
      type: 'protection',
      label: 'proteção solar'
    }]
  },
  {
    id: '2',
    name: 'Protetor Solar SPF 50',
    description: 'Protetor solar de alta proteção contra raios UVA/UVB, resistente à água.',
    price: 89.90,
    image: '/prod2.jpg',
    tags: [{
      type: 'face',
      label: 'máscara facial'
    }]
  },
  {
    id: '3',
    name: 'Máscara de Argila Verde',
    description: 'Máscara purificante para controle de oleosidade e limpeza dos poros.',
    price: 32.50,
    image: '/prod3.jpg'
  },
  {
    id: '4',
    name: 'Sérum Antirrugas',
    description: 'Sérum com ácido hialurônico para redução de linhas finas e rugas.',
    price: 78.20,
    image: '/prod4.jpg'
  },
  {
    id: '5',
    name: 'Bálsamo Labial Hidratante',
    description: 'Bálsamo com manteiga de karité para lábios ressecados e proteção diária.',
    price: 12.75,
    image: '/prod5.jpg'
  },
  {
    id: '6',
    name: 'Esfoliante Facial',
    description: 'Esfoliante suave com microesferas naturais para renovação da pele.',
    price: 25.80,
    image: '/prod6.jpg'
  },
  {
    id: '7',
    name: 'Tônico Revitalizante',
    description: 'Tônico refrescante com extrato de chá verde para equilibrar o pH da pele.',
    price: 38.40,
    image: '/prod7.jpg'
  },
  {
    id: '8',
    name: 'Óleo Corporal Hidratante',
    description: 'Óleo leve com fragrância de lavanda para hidratação intensiva da pele.',
    price: 65.30,
    image: '/prod8.jpg'
  }
];

export async function GET() {
  return NextResponse.json(products);
}
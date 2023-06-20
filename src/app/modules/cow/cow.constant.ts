import { ICowCategory, ICowLocation } from './cow.interface';

export const cowLocation: ICowLocation[] = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
];

export const cowFilterableFields = [
  'price',
  'category',
  'location',
  'level',
  'breed',
];

export const cowCategory: ICowCategory[] = ['Dairy', 'Beef', 'DualPurpose'];

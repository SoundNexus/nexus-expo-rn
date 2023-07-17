export interface Event {
  id: number;
  eventName: string;
  creatorName: string;
  coverImage: string;
  price: string;
  totalSupply: number;
  minted: number;
  description: string;
}

export const sampleEvents = [
  { id: 0, eventName: 'Top of the World Concert', creatorName: 'Butterfly Production', coverImage: 'sample-cover.png', price: '$100', totalSupply: 100, minted: 57, description: 'A charity concert for folks who have been hit by the latest raging typhoon.'},
  { id: 1, eventName: 'Live Aid Concert', creatorName: 'Live Aid Production', coverImage: '../../assets/smaple-cover2.png', price: '$200', totalSupply: 500, minted: 157, description: 'Concert for a cause for those who have been affected by aids.'}
] as Event[];


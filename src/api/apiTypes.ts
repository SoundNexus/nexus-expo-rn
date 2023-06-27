export interface Accounts {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
  address: string;
  displayName: string;
  emailAddress: string;
  bio: string;
  twitter: string;
  discord: string;
  profileImage: string;
  bannerImage: string;
  isAdmin: boolean;
}
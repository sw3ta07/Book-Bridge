export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  joinedAt: Date;
  booksShared: number;
  booksReceived: number;
  subscription?: Subscription;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  genre: string[];
  condition: BookCondition;
  ownerId: string;
  ownerName: string;
  status: BookStatus;
  addedAt: Date;
  isAvailableForExchange: boolean;
}

export enum BookCondition {
  NEW = 'New',
  LIKE_NEW = 'Like New',
  VERY_GOOD = 'Very Good',
  GOOD = 'Good',
  ACCEPTABLE = 'Acceptable',
}

export enum BookStatus {
  AVAILABLE = 'Available',
  PENDING = 'Pending Exchange',
  EXCHANGED = 'Exchanged',
}

export interface Exchange {
  id: string;
  requesterId: string;
  requesterName: string;
  providerId: string;
  providerName: string;
  bookId: string;
  bookTitle: string;
  status: ExchangeStatus;
  requestedAt: Date;
  completedAt?: Date;
}

export enum ExchangeStatus {
  REQUESTED = 'Requested',
  ACCEPTED = 'Accepted',
  COMPLETED = 'Completed',
  DECLINED = 'Declined',
  CANCELED = 'Canceled',
}

export interface Donation {
  id: string;
  userId: string;
  amount: number;
  message?: string;
  createdAt: Date;
  transactionId: string;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
}

export enum SubscriptionPlan {
  FREE = 'Free',
  STANDARD = 'Standard',
  PREMIUM = 'Premium'
}

export enum SubscriptionStatus {
  ACTIVE = 'Active',
  CANCELED = 'Canceled',
  EXPIRED = 'Expired'
}

export interface SubscriptionFeature {
  name: string;
  description: string;
  includedIn: SubscriptionPlan[];
}
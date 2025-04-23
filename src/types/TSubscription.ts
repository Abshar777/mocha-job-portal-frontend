export interface ISubscription  {
    _id: string;
    type: SubscriptionType;
    name: string;
    price: number;
    productId: string;
    features: {
        detailedJobDescription: boolean;
        jobLocationsCount: number;
        applicantsLimit: number | null;
        expiryDays: number;
        boostOnSearchPage: boolean;
        jobBranding: boolean;
    };
    validityDays: number;
    createdAt: Date;
    updatedAt: Date;
}

export enum SubscriptionType {
    STANDARD = 'STANDARD',
    CLASSIFIED = 'CLASSIFIED',
    HOT_VACANCY = 'HOT_VACANCY'
}
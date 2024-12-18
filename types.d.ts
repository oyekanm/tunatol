 type Image = {
   url: string; 
   key: string;
   id?: string;
   roomId?: string;
   createdAt?: Date;
   updatedAt?: Date;
};
type Guest ={
  type:"Adults" | "children" | "infants" | "pets";
  count:number;
  id?:string
}

enum OrderStatus {
  "PENDING",
  "CANCELLED",
  "PROCESSING",
  "DELIVERED",
}
type Review = {
  id?: string;
  roomId: string;
  rating: number;
  comment: string;
  createdAt?: string;
  userId: string;
  user?:User
};
interface column {
  key: string;
  label: string;
  render?: (value: any) => JSX.Element;
  accessor?: string;
  class?: string
}
type Room = {
  name:string;
  price:number;
  description:string;
  features:string[];
  id?:string;
  discount_percent?:any;
  available_announcement?:any;
  images:Image[];
  isAvailable:boolean;
  Reviews:Review[],
  bookings:Booking[],
  // createdAt?: any;
  // updatedAt: Date;
}
type User = {
  id:string;
  userId?:string;
  name:string;
  email:string;
  user_type:UserType;
  password?:string,
  createdAt?: any;
  bookings:Booking;
  Reviews:Review
}
type ActionResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};
type Booking = {
  startDate: Date;
  endDate:Date;
  totalCost:number;
  roomId:string;
  id?: string;
  userId:string
}
type Transaction = {
    id?:string,
    amount:number,
    status?:TransactionStatus,
    type:TransactionType,
    paymentMethod:string,
    createdAt?: Date,
    updatedAt?: Date,
    bookingId?:string,
    customerEmail?:string,
    reference:string,
    card_type:string
}
type Facility = {
    id?:tring,
    name:tring,
    imageId:string,
    userId:string,
    image:Image;
    createdAt?: Date,
    updatedAt?: Date,
  
}
enum TransactionStatus {
  "PENDING",
  "SUCCESSFUL",
  "FAILED",
  "REFUNDED"
}

enum TransactionType {
  "PAYMENT",
  "REFUND"
}
 enum UserType{
  "ADMIN",
  "USER"
}

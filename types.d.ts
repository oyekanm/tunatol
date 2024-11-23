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
  productId: string;
  rating: number;
  comment: string;
  createdAt?: string;
  userId: string;
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
  isAvailable:boolean
  // createdAt: Date;
  // updatedAt: Date;
}
type User = {
  id:string;
  userId?:string;
  name:string;
  email:string;
  user_type:UserType;
  password?:string
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
}
 enum UserType{
  "ADMIN",
  "USER"
}
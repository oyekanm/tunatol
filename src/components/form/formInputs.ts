export const userInputs = [
    {
      id: 1,
      label: "Username",
      type: "text",
      placeholder: "john_doe",
    },
    {
      id: 2,
      label: "Name and surname",
      type: "text",
      placeholder: "John Doe",
    },
    {
      id: 3,
      label: "Email",
      type: "mail",
      placeholder: "john_doe@gmail.com",
    },
    {
      id: 4,
      label: "Phone",
      type: "text",
      placeholder: "+1 234 567 89",
    },
    {
      id: 5,
      label: "Password",
      type: "password",
    },
    {
      id: 6,
      label: "Address",
      type: "text",
      placeholder: "Elton St. 216 NewYork",
    },
    {
      id: 7,
      label: "Country",
      type: "text",
      placeholder: "USA",
    },
  ];
  
  export const RoomInput = [
    {
      id: 1,
      label: "Name",
      type: "text",
      placeholder: "Room name",
      name:"name"
    },
    {
      id: 2,
      label: "Price",
      type: "number",
      placeholder: "10000",
      name:"price"
    },
    {
      id: 3,
      label: "Discount Percent (THIS IS OPTIONAL)",
      type: "number",
      placeholder: "percentage value for the price discount.",
      name:"discount_percent"
    },
    {
      id: 4,
      label: "Description",
      type: "text",
      placeholder: "write a description for the for the room",
      name:"description"
    },
    {
      id: 5,
      label: "Announcement for room available (OPTIONAL)",
      type: "text",
      placeholder: "eg. Maintenance for the next 3 days",
      name:"available_announcement"
    },
  ];
  export const roomFeatureInput = [
    {
      id: 1,
      label: "Name",
      type: "text",
      placeholder: "e.g., WiFi, TV, Air Conditioning",
      name:"name"
    },
   
  ];
  export const facilityInput = [
    {
      id: 1,
      label: "Name",
      type: "text",
      placeholder: "e.g., Gym,Laundry, etc.",
      name:"name"
    },
   
  ];
  export const sizeInputs = [
    {
      id: 1,
      label: "Size",
      type: "text",
      placeholder: "Size name",
      name:"name"
    },
    {
      id: 2,
      label: "Description",
      type: "text",
      placeholder: "write a description for the size",
      name:"description"
    },
    {
      id: 3,
      label: "Order (give this size a sequential order to help display to user, so we can have it arranged orderly as XS,S,M,L)",
      type: "number",
      placeholder: "so we can have it arranged as XS,S,M,L",
      name:"order"
    },
  ];
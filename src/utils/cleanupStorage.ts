// import { prisma } from "@/lib";
// import { getStorage, ref } from "firebase/storage";
// import deleteFirebaseFile from "./deleteFirebaseFiles";
// import { storage } from "@/config/firebase";

// export default async function cleanupUnusedFiles() {
//     // Get all image URLs from the database
//     const dbImages = await prisma.image.findMany({
//       select: { url: true }
//     });
//     const dbUrls = new Set(dbImages.map(img => img.url));
  
//     // List all files in Firebase storage
//     // const storage = getStorage();
//     const storageRef = ref(storage);
    
//     try {
//       const response = await storage. .listAll();
      
//       // Check each file in storage
//       for (const item of response.items) {
//         const url = await item.getDownloadURL();
        
//         // If URL isn't in database, delete the file
//         if (!dbUrls.has(url)) {
//           await deleteFirebaseFile(url);
//           console.log(`Deleted unused file: ${url}`);
//         }
//       }
//     } catch (error) {
//       console.error('Error cleaning up storage:', error);
//       throw error;
//     }
//   }
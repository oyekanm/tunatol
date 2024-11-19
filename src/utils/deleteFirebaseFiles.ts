import { getStorage, ref, deleteObject } from 'firebase/storage';

export default async function deleteFirebaseFile(fileUrl: string) {
  try {
    const storage = getStorage();
    const fileRef = ref(storage, fileUrl);
    await deleteObject(fileRef);
    console.log('File deleted successfully');
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}
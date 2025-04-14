import {
  setDoc,
  collection,
  doc,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';

export interface Address {
  firebaseId?: string;
  name: string;
  companyName: string;
  streetAddress: string;
  apartment: string;
  town: string;
  phoneNumber: string;
  emailAddress: string;
}

// adding address to firestore
export const addAddress = async (values: Address): Promise<void> => {
  const user = auth.currentUser;
  if (!user) {
    console.log("can't add address user is not logged in ");
    return;
  }
  try {
    const addressRef = doc(collection(db, `users/${user.uid}/address`));
    await setDoc(addressRef, { ...values });
  } catch {
    console.error('error in adding address');
  }
};

// fetching address from firestore
export const getAddress = async (): Promise<Address[]> => {
  const user = auth.currentUser;
  if (!user) {
    console.log("can't add address user is not logged in ");
    return [];
  }

  try {
    const addressRef = collection(db, `users/${user.uid}/address`);
    const querySnapshot = await getDocs(addressRef);

    return querySnapshot.docs.map((addressDoc) => {
      const data = addressDoc.data() as Address;
      return {
        firebaseId: addressDoc.id,
        name: data.name,
        companyName: data.companyName,
        streetAddress: data.streetAddress,
        apartment: data.apartment,
        town: data.town,
        phoneNumber: data.phoneNumber,
        emailAddress: data.emailAddress,
      };
    });
  } catch {
    console.log('error in fetching address');
    return [];
  }
};

// deleting address
// firebaseId se delte krna easy parega q ki direct address se delte krna hota tho hamare pass koi id nhi hai addresss ki tho where laga pr ek key ki value match karna parta
export const removeAddress = async (firebaseId: string): Promise<void> => {
  const user = auth.currentUser;
  if (!user) {
    console.log("can't delete address user is not logged in ");
    return;
  }
  try {
    const addressRef = doc(db, `users/${user.uid}/address/${firebaseId}`);
    await deleteDoc(addressRef);
  } catch {
    console.log('error in deleting address');
  }
};

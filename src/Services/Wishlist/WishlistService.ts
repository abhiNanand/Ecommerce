import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
}

// Add wishlist in Firestore
export const addToWishlist = async (product: Product) => {
  const user = auth.currentUser; // Get current user
  if (!user) {
    console.log("User not logged in");
    return;
  }

  try {
    await addDoc(collection(db, "wishlist"), {
      userId: user.uid,
      ...product,
    });
    console.log("Added to wishlist:", product);
  } catch (error) {
    console.error("Error adding to wishlist:", error);
  }
};

// Fetch wishlist on login
export const getWishlistItems = async (): Promise<Product[]> => {
  const user = auth.currentUser;
  if (!user) {
    console.log("User not logged in");
    return [];
  }

  try {
    const q = query(collection(db, "wishlist"), where("userId", "==", user.uid));

    // ✅ Add `await` to correctly fetch Firestore documents
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id, // Correctly extract document ID
      ...doc.data(), // Spread Firestore data (this should match Product type)
    })) as Product[]; // Explicitly cast to Product array

  } catch (error) {
    console.error("Error fetching wishlist items:", error);
    return [];
  }
};

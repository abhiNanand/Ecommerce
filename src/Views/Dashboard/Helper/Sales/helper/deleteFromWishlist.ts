 
import { removeFromWishlist, getWishlistItems } from "../../../../../Services/Wishlist/WishlistService";

 import { Product } from "../../../../../Shared/Product";
 export default async function  DeleteFromWishlist(item:Product)
 {
   
   try{
      const wishlistItems= await getWishlistItems();
      const wishlistItem = wishlistItems.find(wishlistItem=> wishlistItem.id === item.id);

      if(!wishlistItem)
      {
         alert('item not found in wishlist');
         return;
      }
 
    // Check if firebaseId is defined
    if (!wishlistItem.firebaseId) {
      alert("Item does not have a firebaseId");
      return;
    }
      await removeFromWishlist(wishlistItem.firebaseId);
      console.log(`Item with firebaseId ${wishlistItem.firebaseId} removed from wishlist.`);

   }
   catch (error) {
      console.error("Error removing item from wishlist:", error);

 }


}
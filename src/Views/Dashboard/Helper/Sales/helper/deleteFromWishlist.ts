import {
  removeFromWishlist,
  getWishlistItems,
} from '../../../../../Services/Wishlist/WishlistService';

import { Product } from '../../../../../Shared/Product';

export default async function DeleteFromWishlist(item: Product) {
  try {
    const wishlistItems = await getWishlistItems();
    const wishlistItem = wishlistItems.find(
      (wishlistitem) => wishlistitem.id === item.id
    );

    if (!wishlistItem) {
      return;
    }

    // Check if firebaseId is defined
    if (!wishlistItem.firebaseId) {
      return;
    }
    await removeFromWishlist(wishlistItem.firebaseId);
    console.log(
      `Item with firebaseId ${wishlistItem.firebaseId} removed from wishlist.`
    );
  } catch (error) {
    console.error('Error removing item from wishlist:', error);
  }
}

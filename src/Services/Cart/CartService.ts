import {collection,addDoc,getDocs,query,where,doc,deleteDoc} from 'firebase/firestore';
import { auth,db } from '../firebase/firebase';

interface Product{
    id:string;
    title:string;
    image:string;
    price:number;
}

//add to cart in firestore
export const addToCart = async (product:Product)=>{

    const user = auth.currentUser;//get current user
    if(!user)
    {
        console.log("User not logged in ");
        return;
    }
    try{
        await addDoc(collection(db,"cart"),{userId:user.uid,...product,});
        console.log("added to cart",product);
    }
    catch(error)
    {
        console.error("error adding to the cart:",error);
    }
}



//delete from cart
export const removeFromCart =  async(productId:string)=>
{
    const user= auth.currentUser;

    if(!user){
    console.error("User not logged in!");
    return;
    }

    try 
    {
        await deleteDoc(doc(db,"cart",productId)); //delete item by its Firestore ID
    }
    catch(error)
    {
        console.error("Error removing item from cart:",error);
    }
}


// Fetch only the logged-in user's cart items
export const getCartItems = async (): Promise<Product[]> => {
    const user = auth.currentUser; // Get current user
    if (!user) {
      console.error("User not logged in!");
      return [];
    }
  
    try {
      const q = query(collection(db, "cart"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
  
      return querySnapshot.docs.map((doc) => {
        const data = doc.data() as Product;  // Explicitly cast data to Product
        return {
          id: doc.id,  // Ensure id is a string
          title: data.title ?? "",  // Use Nullish Coalescing (??) instead of ||
          image: data.image ?? "",
          price: data.price ?? 0,
        };
      });
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return [];
    }
  };
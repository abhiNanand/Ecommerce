
import { getWishlistItems } from "../../../../Services/Wishlist/WishlistService";

import { Product } from "../../../../Shared/Product";
import {useEffect,useState}  from 'react';
import {auth} from '../../../../Services/firebase/firebase'
import { onAuthStateChanged,User } from "firebase/auth";
import { ShoppingCart,Trash2 } from 'lucide-react';
import { addToCart } from "../../../../Services/Cart/CartService";
import { removeFromWishlist } from "../../../../Services/Wishlist/WishlistService";
import './Wishlist.scss';

export default function Wishlist()
{
     
    const [wishlistItems,setWishlistItems] = useState<Product[]>([]);
    const [user,setUser] = useState<User | null>(auth.currentUser); 

    useEffect(()=>{

        const unsuscribe = onAuthStateChanged(auth,(currentUser)=>setUser(currentUser));
        return ()=> unsuscribe();
    },[]);
 
    useEffect(()=>{
        const fetchWishlistItems=async()=>
        {
            if(!user)
            {
                setWishlistItems([]);
                return ;
            }
         const items = await getWishlistItems();
         setWishlistItems(items);
        }
        fetchWishlistItems();
    },[user]);

    const handleDelete = async (item:Product) => {
       // 🔍 Debugging log
        console.log(typeof item.id);
        await removeFromWishlist(item.id);
        setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== item.id));
         
    };
    
      
    return(
         <div className="wishlist">
<div className="wishlist-top">
<h3>wishlist({wishlistItems.length})</h3>
<button>Move All to Bag</button>
</div>

<div className="wishlist-items">
    {wishlistItems.map((item)=>(<div className="wishlist-item" key={item.id}> <img src={item.image} height="100px" width="100px"/>
    <button type="button" onClick={()=>handleDelete(item)}><Trash2 size={24}/></button>
    <button type="button" onClick={()=>addToCart(item)}><ShoppingCart size={24}/>Add to Cart</button> 
    <p>{item.title}</p> 
    <p>{item.price}</p>
    </div> ))}
</div>
         </div>
    )
}
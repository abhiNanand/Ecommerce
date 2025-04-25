
 
import { WhatsappIcon, EmailIcon, TelegramIcon ,WhatsappShareButton, EmailShareButton, TelegramShareButton} from 'react-share';
import { Share,Link } from 'lucide-react';
import { useState } from 'react';
 

interface ShareProductProps {
    readonly pathname: string;
}
import { toast } from 'react-toastify';

export default function ShareProduct({ pathname }: ShareProductProps) {
    const shareLink = `https://abhi-ecommerce-app.netlify.app${pathname}`;
    const [open, setOpen] = useState<boolean>(false);
    return (<div className="share-product-container">

        <button type="button" className="sharedBtn" onClick={() => setOpen(!open)} onBlur={
            () => { setTimeout(() => setOpen(false), 300) }}> <Share size={20} /> </button>
        {open && (<div className="share-sites">

            <WhatsappShareButton url={shareLink}>
                <WhatsappIcon size={32} round /><span>Whatsapp</span>
            </WhatsappShareButton>

            <br />

            <EmailShareButton url={shareLink}>
                <EmailIcon size={32} round /><span>Email</span>
            </EmailShareButton>
            <br />
            <TelegramShareButton url={shareLink}>
                <TelegramIcon size={32} round /><span>Telegram</span>
            </TelegramShareButton>
            <br />
            <button className="copy-link" onClick={() => { navigator.clipboard.writeText(shareLink); toast.success("link copied") }}><Link size={28}/><span>CopyLink</span></button>


        </div>)}
    </div>);
}


// Why readonly?
// In React (especially with TypeScript), props are meant to be immutable — once passed to a component, they shouldn’t be changed inside that component.

// Marking a prop as readonly ensures:

// Type safety:
// You can't accidentally reassign the prop inside the component.


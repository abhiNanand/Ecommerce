
import { WhatsappShareButton, EmailShareButton, TelegramShareButton } from 'react-share';
import { WhatsappIcon, EmailIcon, TelegramIcon } from 'react-share';
import { Share } from 'lucide-react';
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
                <WhatsappIcon size={32} round />
            </WhatsappShareButton><span>Whatsapp</span>

            <br />

            <EmailShareButton url={shareLink}>
                <EmailIcon size={32} round /><span>Email</span>
            </EmailShareButton>
            <br />
            <TelegramShareButton url={shareLink}>
                <TelegramIcon size={32} round /><span>Telegram</span>
            </TelegramShareButton>
            <br />
            <button onClick={() => { navigator.clipboard.writeText(shareLink); toast.success("link copied") }}>Copy Link</button>


        </div>)}
    </div>);
}


// Why readonly?
// In React (especially with TypeScript), props are meant to be immutable — once passed to a component, they shouldn’t be changed inside that component.

// Marking a prop as readonly ensures:

// Type safety:
// You can't accidentally reassign the prop inside the component.


{/* <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded transition"
      >
        <ClipboardCopy size={16} />
        {copied ? "Copied!" : "Copy Link"}
      </button> */}


//       const [copied, setCopied] = useState(false);

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(shareUrl);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000); // reset after 2 sec
//     } catch (err) {
//       console.error("Failed to copy link:", err);
//     }
//   };

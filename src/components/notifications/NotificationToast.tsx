'use client'
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { RiCloseFill } from "react-icons/ri";

interface Props {
    notification: {
        text_notification: string,
        url_notification: string,
    };
};

export const NotificationToast = ({ notification }: Props) => {

    const pathname = window.location.pathname;
    let pathToRedirect = '/';
 
    if( pathname.startsWith('/admin')) pathToRedirect = '/admin/notifications?page=1';
    if( pathname.startsWith('/dashboard')) pathToRedirect = '/dashboard/notifications?page=1';

    const handleNotification = () => {
        toast.dismiss();
    };

  return (
    toast(
        (t: any) => (
          <div className="toast-container notification" onClick={handleNotification}>
            <div className="flex flex-col items-center justify-center" style={{ maxWidth: '100%', width: '100%' }}>
              {/* <button className="ms-auto" onClick={() => toast.dismiss(t.id)}>
                <RiCloseFill />
              </button> */}
              <Link
                href={ notification.url_notification || pathToRedirect }
                className="flex flex-row items-center justify-center w-full gap-x-7 max-w-[500px]"
                onClick={handleNotification}
              >
                <Image
                  src={"/images/evolvenx_icon.png"}
                  alt={""}
                  width={50}
                  height={50}
                  className="notification-img rounded-full shadow-lg p-1"
                />
                <div className="w-full">
                  <p className="font-light text-sm">{ notification.text_notification }</p>
                </div>
              </Link>
            </div>
          </div>
        ),
        {
            duration: 4000
        }
      )
      
    // toast.custom(
    //     <Link onClick={ handleNotification } href={ pathToRedirect } className="notification">
    //         <div className='max-w-[500px] notification-card py-3 px-3 md:px-6 rounded-md flex m-auto gap-2 sm:gap-4 xl:gap-8 cursor-pointer flex-row'>
    //             <div className="flex flex-row items-center justify-start w-full gap-x-7">
    //                 <Image
    //                     src={"/images/evolvenx_icon.png"} 
    //                     alt={""} 
    //                     width={50} 
    //                     height={50} 
    //                     className="notification-img rounded-full shadow-lg p-1"
    //                 />
    //                 <div className="w-full">
    //                     <p className="font-light text-sm text-10">Texto de la notificacion</p>
    //                 </div>
    //             </div>
    //         </div>
    //     </Link>
    //     ), { 
    //     duration: 4000,
       )   // })
}

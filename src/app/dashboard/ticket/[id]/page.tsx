import { Box, TicketHeader, TicketInformation } from "@/components";
import { MessageBox } from "@/components/ticket/MessageBox";

export default function TicketPage() {
  return (
    <div className="w-full max-w-[1200px] flex flex-col lg:flex-row justify-between mt-7 gap-x-8">
        <Box paddingBottom="pb-0">
            <TicketHeader
                title="Titulo del ticket"
                type="admin"
            />
            <div className="w-full">
                <MessageBox
                    company_id={ 1 }
                    isTicketOpen
                    userInTicket
                />
            </div>
        </Box>
        <TicketInformation
            isTicketOpen
            ticketStatus={ 1 }
            userInTicket
            userType="customer"
        />
    </div>
  );
}
import { Box, DashboardTitle, Options, SendSuggestions } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Cliente',
    description: `Comentarios y suegerencias`,
    openGraph: {
        title: 'Cliente',
        description: `Comentarios y sugerencias`,
    }
};

export default function SendSuggestionsPage() {
  return (
    <div className="w-full max-w-[1200px] flex flex-col lg:flex-row justify-between mt-7 gap-x-8">
        <Box>
            <DashboardTitle title="Buzón de comentarios y sugerencias"/>
            <div className="px-2 md:px-8 w-full">
            <SendSuggestions/>
            </div>
        </Box>
        <Options
          options={[]}
          type="customer"
        />
    </div>
  );
}
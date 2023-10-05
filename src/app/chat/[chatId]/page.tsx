import { auth } from '@clerk/nextjs'
import React from 'react'
import { redirect } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db';
import { chats } from "@/lib/db/schema";
import ChatSideBar from '@/components/ChatSideBar';

type Props = {
    params: {
        chatId: string
    }
}

const ChartPage = async ({ params: { chatId } }: Props) => {
    const { userId } = await auth();
    if(!userId){
        return redirect('/sign-in');
    }
    const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
    // if(!_chats){
    //     return redirect('/');
    // }
    // if(!_chats.find(chat => chat.id === parseInt(chatId))){
    //     return redirect('/');
    // }

    return (
        <div className="flex max-h-screen overflow-scroll">
            <div className="flex w-full max-h-screen overflow-scroll">

                {/* Chat Sidebar */}
                <div className='flex-[1] max-w-xs'>
                    <ChatSideBar chats={_chats} chatId={parseInt(chatId)} />
                </div>

                {/* Pdf viewer */}
                <div className='max-h-screen p-4 overflow-scroll flex-[5]'>
                    {/* <PDFViewer /> */}
                </div>

                {/* Chat component */}
                <div className='flex-[3] border-l-4 border-l-slate-200'>
                    {/* <ChatComponent /> */}
                </div>
            </div>
        </div>
    )
}

export default ChartPage
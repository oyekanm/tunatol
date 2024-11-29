'use client'

import { Share } from "lucide-react";
import { Button } from "../ui/button";

type Props = { title: string, text: string, url: string }

export default function ShareButton({ title, text, url }: Props) {
    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({ title, text, url });
                return;
            }

            await navigator.clipboard.writeText(url);
            alert('Link copied to clipboard!');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to share or copy link');
        }
    };

    return (
        <Button type="button"
            onClick={handleShare}
            className="size-12 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-white text-gray-800 hover:bg-white focus:outline-none focus:bg-white disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
        >
            <Share className='!size-8' />
        </Button>
    );
}


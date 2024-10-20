import { useState, useEffect } from 'react';
import { toast } from '@/components/hooks/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';

export function useResourceManagement() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const storedBookmarks = localStorage.getItem('bookmarks');
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }
  }, []);

  const toggleBookmark = (itemId: string) => {
    const newBookmarks = bookmarks.includes(itemId)
      ? bookmarks.filter((id) => id !== itemId)
      : [...bookmarks, itemId];

    setBookmarks(newBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));

    if (newBookmarks.includes(itemId)) {
      toast({
        title: 'Bookmark Added',
        description: 'The resource has been added to your bookmarks.',
        className: 'bg-yellow-200 fixed top-4 right-4 w-fit',
      });
    } else {
      toast({
        title: 'Bookmark Removed',
        description: 'The resource has been removed from your bookmarks.',
        className: 'bg-red-200 fixed top-4 right-4 w-fit',
      });
    }
  };

  const tagClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const tag = e.currentTarget.dataset.tools;
    if (tag) {
      const currentTags = new Set(searchParams.get('tags')?.split(',') || []);
      if (currentTags.has(tag)) {
        currentTags.delete(tag);
      } else {
        currentTags.add(tag);
      }
      const newTags = Array.from(currentTags);
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('tags', newTags.join(','));
      router.push(`?${newSearchParams.toString()}`);
    }
  };

  const tagList = (tag: string) => {
    return (
      <button
        key={tag}
        onClick={tagClick}
        data-tools={tag}
        className='bg-yellow-400/50 text-[10px] px-2 font-quicksand rounded-sm'
      >
        {tag}
      </button>
    );
  };

  return { bookmarks, toggleBookmark, tagList };
}
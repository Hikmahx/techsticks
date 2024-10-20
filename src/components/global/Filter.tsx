'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Input } from '../ui/input';
import { createFilterQueryString } from '@/lib/resources';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, X } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { TagManager } from './TagManager';

const FormSchema = z.object({
  sortBy: z.enum(['title', 'date']).optional(),
  filterBy: z.string().optional(),
  tagFilter: z.string().optional(),
  search: z.string().optional(),
});

export function FormInputs({
  showSubsection,
  setShowSubsection,
  isBookmarksPage = false,
}: {
  showSubsection?: boolean;
  setShowSubsection?: (value: boolean) => void;
  isBookmarksPage?: boolean;
}) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const defaultValues = {
    search: searchParams.get('search') || '',
    tagFilter: '',
    sortBy:
      searchParams.get('sortBy') === 'title' ||
      searchParams.get('sortBy') === 'date'
        ? (searchParams.get('sortBy') as 'title' | 'date')
        : 'title',
    filterBy: searchParams.get('level') || '',
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const tags = Array.from(new Set(searchParams.get('tags')?.split(',') || []));

  const hasActiveQuery = searchParams.toString() !== '';

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const currentTags = new Set(searchParams.get('tags')?.split(',') || []);
    if (data.tagFilter) {
      currentTags.add(data.tagFilter);
    }
    const newTags = Array.from(currentTags);

    const queryString = createFilterQueryString({
      search: data.search || '',
      tags: newTags,
      sortBy: data.sortBy || 'title',
      level: data.filterBy || '',
    });

    replace(`${pathname}?${queryString}`);
    
    form.setValue('tagFilter', '');
  }

  const clearAllFilters = () => {
    replace(pathname);
    form.reset({
      search: '',
      tagFilter: '',
      sortBy: 'title',
      filterBy: '',
    });
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = new Set(searchParams.get('tags')?.split(',') || []);
    currentTags.delete(tagToRemove);
    const newTags = Array.from(currentTags);

    const queryString = createFilterQueryString({
      search: searchParams.get('search') || '',
      tags: newTags,
      sortBy: searchParams.get('sortBy') as 'title' | 'date' || 'title',
      level: searchParams.get('level') || '',
    });

    replace(`${pathname}?${queryString}`);
  };

  const clearAllTags = () => {
    const queryString = createFilterQueryString({
      search: searchParams.get('search') || '',
      tags: [],
      sortBy: searchParams.get('sortBy') as 'title' | 'date' || 'title',
      level: searchParams.get('level') || '',
    });

    replace(`${pathname}?${queryString}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full mx-auto mt-8'
      >
        <div className='flex flex-col md:flex-row gap-2 bg-white rounded-lg border p-2'>
          <FormField
            name='search'
            render={({ field }) => (
              <FormItem className='flex-grow'>
                <FormControl>
                  <div className='relative'>
                    <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                    <Input
                      placeholder='Search title....'
                      className='pl-10 pr-10 py-2 w-full'
                      {...field}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name='tagFilter'
            render={({ field }) => (
              <FormItem className='md:w-1/4'>
                <FormControl>
                  <div className='relative'>
                    <Filter className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                    <Input
                      placeholder='Add a tag...'
                      className='pl-10 py-2 w-full'
                      {...field}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <div className='flex md:w-1/4 space-x-2'>
            <FormField
              name='sortBy'
              render={({ field }) => (
                <FormItem className='flex-grow'>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Sort By' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='title'>Title</SelectItem>
                      <SelectItem value='date'>Date</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name='filterBy'
              render={({ field }) => (
                <FormItem className='flex-grow'>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Filter By' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='any'>Any</SelectItem>
                      <SelectItem value='beginner'>Beginner</SelectItem>
                      <SelectItem value='intermediate'>Intermediate</SelectItem>
                      <SelectItem value='advanced'>Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Button
            type='submit'
            className='bg-blue-600 hover:bg-blue-700 text-white md:w-auto w-full'
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
          {hasActiveQuery && (
            <Button
              type='button'
              onClick={clearAllFilters}
              className='bg-red-400 hover:bg-red-700 text-white md:w-auto w-full'
            >
              <X className="w-4 h-4 mr-2" />
              Clear Filter
            </Button>
          )}
        </div>
        {!isBookmarksPage && (
          <div className='mt-4 flex justify-end items-center'>
            <label htmlFor='subsection-switch' className='mr-2'>
              Show Subsections
            </label>
            <Switch
              id='subsection-switch'
              checked={showSubsection}
              onCheckedChange={setShowSubsection}
            />
          </div>
        )}
      </form>
      <TagManager tags={tags} onRemoveTag={removeTag} onClearTags={clearAllTags} />
    </Form>
  );
}

export function ResourcesForm({
  showSubsection,
  setShowSubsection,
  isBookmarksPage = false,
}: {
  showSubsection?: boolean;
  setShowSubsection?: (value: boolean) => void;
  isBookmarksPage?: boolean;
}) {
  return (
    <div className=''>
      <FormInputs
        showSubsection={showSubsection}
        setShowSubsection={setShowSubsection}
        isBookmarksPage={isBookmarksPage}
      />
    </div>
  );
}
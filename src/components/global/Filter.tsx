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
import { Search, Filter } from 'lucide-react';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch'; // Import Switch component

const FormSchema = z.object({
  sortBy: z.enum(['title', 'date']).optional(),
  filterBy: z.string().optional(),
  tagFilter: z.string().optional(),
  search: z.string().optional(),
});

export function FormInputs({
  showSubsection,
  setShowSubsection,
}: {
  showSubsection: boolean;
  setShowSubsection: (value: boolean) => void;
}) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const basePath = pathname.split('/')[1];
  const section = pathname.split('/')[2];
  const searchParams = useSearchParams();

  const defaultValues = {
    search: searchParams.get('search') || '',
    tagFilter: searchParams.get('tags')?.split(',')[0] || '',
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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const params = new URLSearchParams(searchParams.toString());

    const queryString = createFilterQueryString({
      search: data.search || '',
      tags: data.tagFilter ? [data.tagFilter] : [],
      sortBy: data.sortBy || 'title',
      level: data.filterBy || '',
    });

    replace(`/${basePath}/${section}?${queryString}`);
  }

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
                      placeholder='Filter by tag...'
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
            Search
          </Button>
        </div>
        {/* Toggle for showing subsections */}
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
      </form>
    </Form>
  );
}

export function ResourcesForm({
  showSubsection,
  setShowSubsection,
}: {
  showSubsection: boolean;
  setShowSubsection: (value: boolean) => void;
}) {
  return (
    <div className=''>
      <FormInputs
        showSubsection={showSubsection}
        setShowSubsection={setShowSubsection}
      />
    </div>
  );
}

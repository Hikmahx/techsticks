'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { toast } from '../hooks/use-toast';
import { Input } from '../ui/input';

const FormSchema = z.object({
  sortBy: z.string().optional(),
  filterBy: z.string().optional(),
  tagFilter: z.string().optional(),
  search: z.string().optional(),
});

export function FormInputs() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {


    console.log(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-max space-y-6 flex items-center justify-center'
      >
        <FormField
          control={form.control}
          name='search'
          render={({ field }) => (
            <FormItem className='flex items-center justify-center'>
              <FormLabel className='whitespace-nowrap sr-only'>
                Search title
              </FormLabel>
              <Input placeholder='Search title....' {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='tagFilter'
          render={({ field }) => (
            <FormItem className='flex items-center justify-center'>
              <FormLabel className='whitespace-nowrap sr-only'>
                Tag filter
              </FormLabel>
              <Input placeholder='Filter by tag....' {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='sortBy'
          render={({ field }) => (
            <FormItem className='flex items-center justify-center'>
              <FormLabel className='whitespace-nowrap sr-only'>
                Sort By:
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Sort By' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='title'>Title</SelectItem>
                  <SelectItem value='Date'>date</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='filterBy'
          render={({ field }) => (
            <FormItem className='flex items-center justify-center'>
              <FormLabel className='whitespace-nowrap sr-only'>
                Filter By:
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}

export function ResourcesForm() {
  return (
    <div className=''>
      <FormInputs />
    </div>
  );
}

'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(3),
    confirmPassword: z.string(),
    accountType: z.enum(['personal', 'company']),
    companyName: z.string().optional(),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    },
  )
  .refine(
    (data) => {
      if (data.accountType === 'company') {
        return !!data.companyName;
      }

      return true;
    },
    {
      message: 'Company name is required',
      path: ['companyName'],
    },
  );

type FormValues = z.infer<typeof formSchema>;

export default function Home() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      accountType: 'personal',
      companyName: '',
    },
  });

  const accountType = form.watch('accountType');

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <main className='flex min-h-screen items-center justify-center p-24'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex w-full max-w-md flex-col gap-4'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => {
              return (
                <FormItem className='space-y-1'>
                  <FormLabel>Email</FormLabel>

                  <FormControl>
                    <Input
                      type='email'
                      placeholder='Email'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name='accountType'
            render={({ field }) => {
              return (
                <FormItem className='space-y-1'>
                  <FormLabel>Account Type</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    // defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select an account Type' />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value='personal'>Personal</SelectItem>
                      <SelectItem value='company'>Company</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {accountType === 'company' && (
            <FormField
              control={form.control}
              name='companyName'
              render={({ field }) => {
                return (
                  <FormItem className='space-y-1'>
                    <FormLabel>Company Name</FormLabel>

                    <FormControl>
                      <Input
                        placeholder='Company Name'
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          )}

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => {
              return (
                <FormItem className='space-y-1'>
                  <FormLabel>Password</FormLabel>

                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Password'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => {
              return (
                <FormItem className='space-y-1'>
                  <FormLabel>Confirm Password</FormLabel>

                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Confirm Password'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button
            type='submit'
            className='w-full'
          >
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}

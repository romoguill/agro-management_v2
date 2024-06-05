'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
} from '@client/ui/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  MarketDataQueryDTO,
  currencySchema,
  derivativeSchema,
  grainSchema,
  marketPlaceSchema,
  marketQuerySchema,
} from '@agro-management-v2/schemas';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@client/ui/components/ui/select';
import { Popover, PopoverContent } from './ui/popover';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { Button } from './ui/button';
import { cn } from '../libs/utils';
import dayjs from 'dayjs';

function DataDetailsForm() {
  const form = useForm<MarketDataQueryDTO>({
    resolver: zodResolver(marketQuerySchema),
    defaultValues: {
      currencyRef: 'DOLAR',
      derivative: 'FUTURE',
      from: new Date().toISOString(),
      to: new Date().toISOString(),
      grain: 'SOY',
      marketPlace: 'ROSARIO',
      settlement: new Date().toISOString(),
    },
  });

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="grain"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Grain</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="capitalize">
                  <SelectValue placeholder="Grain" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {grainSchema.options.map((grain) => (
                  <SelectItem key={grain} value={grain} className="capitalize">
                    {grain.toLocaleLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="marketPlace"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Market Place</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="capitalize">
                  <SelectValue placeholder="Market Place" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {marketPlaceSchema.options.map((marketPlace) => (
                  <SelectItem
                    key={marketPlace}
                    value={marketPlace}
                    className="capitalize"
                  >
                    {marketPlace.toLocaleLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="derivative"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Derivative</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="capitalize">
                  <SelectValue placeholder="Market Place" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {derivativeSchema.options.map((derivative) => (
                  <SelectItem
                    key={derivative}
                    value={derivative}
                    className="capitalize"
                  >
                    {derivative.toLocaleLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="settlement"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Settlement</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="capitalize">
                  <SelectValue placeholder="Settlement" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>{/* TODO */}</SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="currencyRef"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Currency</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="capitalize">
                  <SelectValue placeholder="Market Place" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {currencySchema.options.map((currencyRef) => (
                  <SelectItem
                    key={currencyRef}
                    value={currencyRef}
                    className="capitalize"
                  >
                    {currencyRef.toLocaleLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="from"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>From</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-[240px] pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {field.value ? (
                      dayjs(field.value).format('YYYY-MM-DD')
                    ) : (
                      <span>Date (from)</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={new Date(field.value)}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date('1900-01-01')
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="to"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>To</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-[240px] pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {field.value ? (
                      dayjs(field.value).format('YYYY-MM-DD')
                    ) : (
                      <span>Date (to)</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={new Date(field.value)}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date('1900-01-01')
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
}

export default DataDetailsForm;

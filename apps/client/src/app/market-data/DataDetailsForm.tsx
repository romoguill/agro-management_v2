'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
} from '@client/ui/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  MarketDataQueryDTO,
  grainSchema,
  marketQuerySchema,
} from '@agro-management-v2/schemas';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@client/ui/components/ui/select';

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
    </Form>
  );
}

export default DataDetailsForm;

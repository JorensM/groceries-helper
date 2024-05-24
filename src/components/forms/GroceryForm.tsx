// Core
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from 'zod';

// Components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './Form';
import { Button } from '../input/Button';
import { Grocery } from '#/types/Grocery';

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name must be at least 1 characters."
    }),
    prices: z.array(z.number())
})

export type GroceryFormValues = z.infer<typeof formSchema>

const initialValues: GroceryFormValues = {
    name: '',
    prices: []
}

type GroceryFormProps = {
    onSubmit: (formValues: GroceryFormValues) => void
    onAddStoreClick: () => void
    onDelete: (grocery: Grocery) => void
    grocery?: Grocery | null
}

export default function GroceryForm( { onSubmit, grocery, onDelete, onAddStoreClick }: GroceryFormProps) {

    const form = useForm<GroceryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: grocery || initialValues,
    })

    const pricesFieldArray = useFieldArray({
        control: form.control,
        name: 'prices'
    })

    return(
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col gap-4'
            >
                <FormField
                    control={form.control}
                    name='name'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    <h2>Prices</h2>
                    {pricesFieldArray.fields.map((field, index) => (
                        <FormField
                            control={form.control}
                            name={`prices.${index}`}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <input {...field} type='number' step='0.01'/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    <Button
                        variant='outline'
                        className='text-foreground !border-foreground'
                        type='button'
                        onClick={onAddStoreClick}
                    >
                        Add store
                    </Button>
                </div>
                
                <div className='flex justify-between'>
                    {grocery &&
                        <Button
                            variant={'ghost'}
                            className='text-destructive hover:bg-gray-200'
                            onClick={() => onDelete(grocery)}
                        >
                            Delete
                        </Button>    
                    }
                    <Button 
                        type='submit' 
                        size='sm' 
                        className='w-fit ml-auto' 
                        // disabled={!form.formState.isValid}
                    >
                        Save
                    </Button>
                </div>
            </form>
        </Form>
    )
}
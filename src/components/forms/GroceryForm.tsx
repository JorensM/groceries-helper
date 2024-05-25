// Core
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from 'zod';

// Components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './Form';
import { Button } from '../input/Button';
import { Grocery } from '#/types/Grocery';
import { Store } from '#/types/Store';
import makeGroceryPricesList from '#/util/makeGroceryPricesList';

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name must be at least 1 characters."
    }),
    prices: z.record(z.coerce.number())
})

export type GroceryFormValues = z.infer<typeof formSchema>

const initialValues: GroceryFormValues = {
    name: '',
    prices: {}
}

type GroceryFormProps = {
    onSubmit: (formValues: GroceryFormValues) => void
    onAddStoreClick: () => void
    onDelete: (grocery: Grocery) => void
    grocery?: Grocery | null
    stores: Store[]
}

export default function GroceryForm( { onSubmit, grocery, stores, onDelete, onAddStoreClick }: GroceryFormProps) {

    const form = useForm<GroceryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: grocery ? { 
            ...grocery,
            prices: makeGroceryPricesList(grocery, stores)
        } : {
            ...initialValues,
            prices: makeGroceryPricesList(null, stores)
        }
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
                <div className='flex flex-col gap-2'>
                    <h2 className='mb-1'>Prices</h2>
                    {stores.map((store) => (
                        <FormField
                            control={form.control}
                            name={`prices.${store.id}`}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>{store.name}</FormLabel>
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
                        className='text-foreground !border-foreground my-2 w-fit'
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
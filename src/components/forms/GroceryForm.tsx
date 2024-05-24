// Core
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod';

// Components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './Form';
import { Button } from '../input/Button';
import { Grocery } from '#/types/Grocery';

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name must be at least 1 characters."
    }),
    price: z.coerce.number().min(0.01, {
        message: 'Price must be at least 0.01'
    })
})

export type GroceryFormValues = z.infer<typeof formSchema>

const initialValues: GroceryFormValues = {
    name: '',
    price: 0
}

type GroceryFormProps = {
    onSubmit: (formValues: GroceryFormValues) => void
    onDelete: (grocery: Grocery) => void
    grocery?: Grocery | null
}

export default function GroceryForm( { onSubmit, grocery, onDelete }: GroceryFormProps) {

    const form = useForm<GroceryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: grocery || initialValues,
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
                <FormField
                    control={form.control}
                    name='price'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <input {...field} type='number' step='0.1'/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
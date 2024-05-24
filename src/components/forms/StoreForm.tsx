// Core
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod';

// Components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './Form';
import { Button } from '../input/Button';

// Types
import { Store } from '#/types/Store';

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name must be at least 1 characters."
    }),
    color: z.string()
})

export type StoreFormValues = z.infer<typeof formSchema>

const initialValues: StoreFormValues = {
    name: '',
    color: 'green'
}

type StoreFormProps = {
    onSubmit: (formValues: StoreFormValues) => void
    // onAddStoreClick: () => void
    onDelete: (store: Store) => void
    store?: Store | null
}

export default function StoreForm( { onSubmit, store, onDelete }: StoreFormProps) {

    const form = useForm<StoreFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: store || initialValues,
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
                    name='color'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Color</FormLabel>
                            <FormControl>
                                <input className='p-0 h-8 w-8' type='color' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <div className='flex justify-between'>
                    {store &&
                        <Button
                            variant={'ghost'}
                            className='text-destructive hover:bg-gray-200'
                            onClick={() => onDelete(store)}
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
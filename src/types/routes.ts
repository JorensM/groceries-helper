import { Store } from './Store'

export type AppLayoutContext = {
    onStoreFormDialogOpen: (store: Store | null) => void
    searchValue: string | undefined
}
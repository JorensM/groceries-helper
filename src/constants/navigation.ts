export type NavItem = {
    label: string,
    path: string
}

export const mainNavigation: NavItem[] = [
    {
        label: 'Home',
        path: '/'
    },
    {
        label: 'To buy',
        path: '/to-buy'
    },
    {
        label: 'Calculator',
        path: '/calculator'
    },
    {
        label: 'All groceries',
        path: '/groceries'
    }
]
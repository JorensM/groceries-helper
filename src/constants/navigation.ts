export type NavItem = {
    label: string,
    path?: string,
    href?: string
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
    },
    {
        label: 'Stores',
        path: '/stores'
    }
]

export const mainSecondaryNavigation: NavItem[] = [
    {
        label: 'Send feedback',
        href: 'mailto:jorensmerenjanu@gmail.com'
    },
    {
        label: 'Privacy policy',
        path: '/privacy-policy'
    }
]
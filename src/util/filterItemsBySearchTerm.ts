export default function filterItemsBySearchTerm<T extends { name: string }>(items: T[], searchTerm: string | undefined): T[] {
    return items.filter(
        (item) => !searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
}
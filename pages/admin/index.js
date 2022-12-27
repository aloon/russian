import Link from 'next/link'

export default function HomeAdmin() {
    return (
        <>
            <ul>
                <li>
                    <Link href="/admin/categories">Categories</Link>
                </li>
                <li>
                    <Link href="/admin/join-words">Join Words</Link>
                </li>
            </ul>
        </>
    )
}
import Link from 'next/link'

export default function HomeAdmin() {
    return (
        <>
            <ul>
                <li>
                    <Link href="/admin/categories">Categories in join words</Link>
                </li>
            </ul>
        </>
    )
}
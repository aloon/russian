import Link from 'next/link'

function Home() {
  return (
    <ul>
      <li>
        <Link href="/join-words">Join Words</Link>
      </li>
      <li>
        <Link href="/admin">Admin</Link>
      </li>
    </ul>
  )
}

export default Home
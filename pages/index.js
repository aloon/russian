import Link from 'next/link'

function Home() {

  return (
    <>
    <ul>
      <li>
        <Link href="/join-words/categories">Join Words</Link>
      </li>
      <li>
        <Link href="/admin">Admin</Link>
      </li>
    </ul>
    </>
  )
}

export default Home
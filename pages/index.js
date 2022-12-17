import Link from 'next/link'

function Home() {
  let dbPasswd = "postgres"
  if(process.env.NODE_ENV == "production") {
    dbPasswd = process.env.DB_PASSW
  }
  return (
    <>
    <div>
      -{process.env.NODE_ENV}- <br />
      -{dbPasswd}-<br/>
      -{process.env.DB_PASSW}-<br />
      </div>
    <ul>
      <li>
        <Link href="/join-words">Join Words</Link>
      </li>
      <li>
        <Link href="/admin">Admin</Link>
      </li>
    </ul>
    </>
  )
}

export default Home
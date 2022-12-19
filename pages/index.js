import Link from 'next/link'

function Home() {
  let dbPasswd = "postgres"
  if(process.env.NODE_ENV == "production") {
    dbPasswd = process.env["DB_PASSW"]
  }
console.log(process.env);
  return (
    <>
    <div>
      -{process.env.NODE_ENV}- <br />
      -{dbPasswd}-<br/>
      </div>
      {/* <ul>
        {Object.entries(process.env).map((e) => {
         // console.log(e);
          return (
            <li>*</li>
          )
        })}
      </ul> */}
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
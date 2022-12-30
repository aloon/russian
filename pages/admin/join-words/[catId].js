import React from 'react';
import Title from './title';
import { useRouter } from 'next/router'

export async function getServerSideProps(context) {
    const  { catId } = context.params;
     
    return {props :{catId:catId}}
  }

export default function JoinWordsAdmin() {
    const router = useRouter()
    const { catId } = router.query
    //console.log(router.query);
    //console.log(context.query);
    return (
        <div>
            <main>
                return
                <Title catId={catId} />
            </main>
            <footer>
            </footer>
        </div>
    )
}
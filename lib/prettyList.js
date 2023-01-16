import React from 'react';
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.css'

const PrettyList = (props) => {
    return (<>
        <ul>
            {props.items.map((item, index) =>
                <li><Link href={item.href}>{item.text}</Link></li>
            )}
        </ul>
    </>)
}

export default PrettyList
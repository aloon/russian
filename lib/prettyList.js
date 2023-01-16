import React from 'react';
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.css'

const PrettyList = (props) => {
    return (<>
        <ul>
            {props.items.map((item, index) =>
                <li key={index + 'li'}><Link key={index + 'link'} href={item.href}>{item.text}</Link></li>
            )}
        </ul>
    </>)
}

export default PrettyList
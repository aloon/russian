import React from 'react';
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.css'

const PrettyList = (props) => {
    return props.items.map((item, index) => <Link key={index + 'link'} href={item.href}><div class="float-left btn btn-secondary m-4">{item.text}</div></Link>)
}

export default PrettyList
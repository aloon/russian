import React from 'react';
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.css'

const PrettyList = (props) => {
    return <div className="form-row text-center">
        {props.items.map((item, index) => <Link key={item.href} href={item.href}><div className="w-75 btn btn-secondary m-2">{item.text}</div></Link>)}
    </div>
}

export default PrettyList
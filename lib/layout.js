import React from 'react';

export const Layout = (props) => {
    return <div>
        <main>
            <div className='p-2'>{props.children}</div>
        </main>
        <footer>
        </footer>
    </div>
}
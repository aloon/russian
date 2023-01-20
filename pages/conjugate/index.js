import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { url_site } from '../../lib/constants';
import Back from '../../lib/back';
import Login from '../login'
import { Layout } from '../../lib/layout';

const eStatus = { Unknow: 0, Ok: 1, Ko: 2 }

const Option = (props) => {
    let clazz = "btn btn-secondary m-2"
    const [status, setStatus] = useState(eStatus.Unknow);

    const handleClick = () => {
        setStatus(props.good ? eStatus.Ok : eStatus.Ko)
        props.onClick()
    }

    switch (status) {
        case eStatus.Ok:
            clazz = "btn btn-success m-2"
            break;
        case eStatus.Ko:
            clazz = "btn btn-danger m-2"
            break;
        case eStatus.Unchecked:
            clazz = "btn btn-secondary m-2"
            break;
    }
    return (<button className={clazz} onClick={handleClick}>{props.option}</button>)
}

const Conjugate = () => {
    const [token, setToken] = useState(null);
    const [verb, setVerb] = useState('');
    const [sentence, setSentence] = useState('');
    const [options, setOptions] = useState([]);
    const [goodOption, setGoodOption] = useState('');
    const [childrenRefs, setChildrenRefs] = useState([]);
    const blank = "____________"
    const keyBlank = "XXX"
    const random = () => (Math.random() > 0.5) ? 1 : -1
    const printSentence = (sentence) => sentence.replace(keyBlank, blank)

    useEffect(() => {
        setToken(localStorage.getItem("token") || sessionStorage.getItem("token"));
        if (token != null) {
            fetch(`${url_site}/api/conjugate/1`)
                .then(res => res.json())
                .then(data => {
                    setVerb(data.verb)
                    setOptions(data.options)
                    setGoodOption(data.options[0])
                    setSentence(data.sentence)
                   // setChildrenRefs(data.options.map((e) => React.createRef()))
                })
        }
    }, [token])

    function handleClick(pos) {
        setSentence(sentence.replace(keyBlank, goodOption))
        //childrenRefs[pos].current.setStatus(eStatus.Ok)
        console.log(childrenRefs)
    }

    if (token == null)
        return (<Login />)
    else {
        return (<div className="card" style={{ maxWidth: '100%' }}>
            <div className="card-header">{verb}</div>
            <div className="card-body">
                <h5 className="card-title">{printSentence(sentence)}</h5>
                {
                    options.sort(random).map((o, i) => <Option
                        key={i} option={o} good={o === goodOption}
                        ref={childrenRefs[i]}
                        onClick={() => handleClick(i)}
                    />)
                }
            </div>
        </div>);
    }
}

export default function IndexConjugate() {
    const [seed, setSeed] = useState(1);
    const reload = () => setSeed(Math.random())
    return (
        <Layout>
            <Back href={"/"} />
            
            <Conjugate />
        </Layout>
    )
}


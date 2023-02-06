import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { url_site } from '../../lib/constants';
import Back from '../../lib/back';
import Login from '../login'
import { Layout } from '../../lib/layout';

const eStatus = { Unknow: 0, Ok: 1, Ko: 2 }

class Option extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: eStatus.Unknow,
            option: props.option,
            isGood: props.good
        };
    }

    handleClick = () => {
        this.setState({ status: this.state.isGood ? eStatus.Ok : eStatus.Ko });
        this.props.onClick()
    }

    clazz() {
        if (this.state.status === eStatus.Ok) return "btn btn-success m-2"
        if (this.state.status === eStatus.Ko) return "btn btn-danger m-2"
        return "btn btn-secondary m-2"
    }

    render() {
        return (<button className={this.clazz()} onClick={this.handleClick}>{this.state.option}</button>)
    }
}

const Conjugate = (props) => {
    const [token, setToken] = useState(null);
    const [verb, setVerb] = useState('');
    const [sentence, setSentence] = useState('');
    const [choices, setChoices] = useState([]);
    const [goodOption, setGoodOption] = useState('');
    const [childrenRefs, setChildrenRefs] = useState([]);
    const blank = "____________"
    const keyBlank = "XXX"
    const random = () => (Math.random() > 0.5) ? 1 : -1
    const printSentence = (sentence) => sentence.replace(keyBlank, blank)

    useEffect(() => {
        console.log("useEffect")
        setToken(localStorage.getItem("token") || sessionStorage.getItem("token"));
        if (token != null) {
            console.log(choices)
            fetch(`${url_site}/api/conjugate/1`, { headers: { 'token': token } })
                .then(res => res.json())
                .then(data => {
                    setVerb(data.verb)
                    setChoices(data.choices)
                    setGoodOption(data.choices[0])
                    setSentence(data.sentence)
                    setChildrenRefs(data.choices.map((e) => React.createRef()))
                })
        }
    }, [token])

    function handleClick() {
        setSentence(sentence.replace(keyBlank, goodOption))
        childrenRefs.forEach((e) => {
            if (e.current.state.isGood)
                e.current.setState({ status: eStatus.Ok })
        })
    }

    if (token == null)
        return (<Login />)
    else {
        return (<div className="card" style={{ maxWidth: '100%' }}>
            <div className="card-header">{verb}</div>
            <div className="card-body">
                <h5 className="card-title">{printSentence(sentence)}</h5>
                {                    
                    choices.sort(random).map((o, i) => <Option
                        key={i} option={o} good={o === goodOption}
                        ref={childrenRefs[i]}
                        onClick={() => handleClick()}
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


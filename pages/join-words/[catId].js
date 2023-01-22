import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { useRouter } from 'next/router'
import { JoinWordsStatus, url_site } from '../../lib/constants';
import Back from '../../lib/back';
import { Reload } from '../../lib/reload';

export async function getServerSideProps(context) {
    const { catId } = context.params;
    return { props: { catId: catId } }
}

function Title(props) {
    return (<>
        <h1 className="text-center">{props.value}</h1><br />
    </>);
}

class WordElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: JoinWordsStatus.Unchecked,
            element: props.word
        };
    }

    handleClick() {
        this.props.onClick()
    }

    render() {
        let clazz = "";
        switch (this.state.status) {
            case JoinWordsStatus.Unchecked:
                clazz = "p-3 bg-light border";
                break;
            case JoinWordsStatus.Pre:
                clazz = "p-3 bg-warning border";
                break;
            case JoinWordsStatus.Ok:
                clazz = "p-3 bg-success border";
                break;
            case JoinWordsStatus.Ko:
                clazz = "p-3 bg-danger border";
                break;
        }
        return (<div className={clazz} onClick={() => this.handleClick()}>{this.state.element.word}</div>);
    }
}

const Game = (props) => {

    const [status, setStatus] = useState([[], []]);
    const [childrenRefs, setChildrenRefs] = useState([[], []]);
    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(localStorage.getItem("token") || sessionStorage.getItem("token"));
        if (token != null) {
            fetch(url_site + "/api/join-words/" + parseInt(props.catId), { headers: { 'token': token } })
                .then(res => res.json())
                .then(data => data.map(col => col
                    .sort(() => (Math.random() > 0.5) ? 1 : -1)
                    .map(item => ({ id: item.id, word: item.word, status: JoinWordsStatus.Unchecked })                    ))
                ).then(data => {
                    setStatus(data);
                    setChildrenRefs(data.map((c) => c.map((e) => React.createRef())))
                });
        }
    }, [token])

    function anySelectedElement() {
        let any = false;
        status.forEach((col) => {
            col.forEach((item) => {
                if (item.status != JoinWordsStatus.Unchecked && item.status != JoinWordsStatus.Ko && item.status != JoinWordsStatus.Ok) {
                    any = true;
                }
            });
        });
        return any;
    }

    function isPreSelectedElement(col, pos) {
        return status[col][pos].status == JoinWordsStatus.Pre;
    }

    function onePreSelectedElementInOtherCol(col) {
        const otherCol = (col == 0) ? 1 : 0;
        let any = false;
        status[otherCol].forEach((item) => {
            if (item.status == JoinWordsStatus.Pre) {
                any = true;
            }
        });
        return any;
    }

    function otherPos(col) {
        const otherCol = (col == 0) ? 1 : 0;
        let oPos = -1;
        status[otherCol].forEach((item, i) => {
            if (item.status == JoinWordsStatus.Pre) {
                oPos = i;
            }
        });
        return oPos;
    }

    function isOk(col, pos) {
        const otherCol = (col == 0) ? 1 : 0;
        let otherPos = -1;
        status[otherCol].forEach((item, i) => {
            if (item.status == JoinWordsStatus.Pre) {
                otherPos = i;
            }
        });
        return status[col][pos].id == status[otherCol][otherPos].id;
    }

    function handleClick(col, pos) {
        //const status = structuredClone(status);
        console.log(childrenRefs)
        if ([JoinWordsStatus.Unchecked, JoinWordsStatus.Pre].includes(status[col][pos].status)) {
            const otherCol = (col == 0) ? 1 : 0;
            if (!anySelectedElement()) {
                childrenRefs[col][pos].current.setState({ status: JoinWordsStatus.Pre });
                status[col][pos].status = JoinWordsStatus.Pre;
            } else if (isPreSelectedElement(col, pos)) {
                childrenRefs[col][pos].current.setState({ status: JoinWordsStatus.Unchecked });
                status[col][pos].status = JoinWordsStatus.Unchecked;
            } else if (onePreSelectedElementInOtherCol(col)) {
                const oPos = otherPos(col);
                const statusResult = isOk(col, pos) ? JoinWordsStatus.Ok : JoinWordsStatus.Ko;
                childrenRefs[col][pos].current.setState({ status: statusResult });
                status[col][pos].status = statusResult;
                childrenRefs[otherCol][oPos].current.setState({ status: statusResult });
                status[otherCol][oPos].status = statusResult;
            }
            //this.setState({ status: status });
        }
    }

    return (<div className="container px-4 text-center" key={"container"}>
        <div className="row gx-5" key={"container2"}>
            {[0, 1].map((col) => {
                return <div className="d-grid gap-3 col" key={"c" + col}>
                    {status[col].map((item, pos) => <WordElement word={item}
                        key={col + "_" + item.id}
                        ref={childrenRefs[col][pos]}
                        onClick={() => handleClick(col, pos)} />
                    )}
                </div>
            })}
        </div>
    </div>);
}

export default function JoinWords() {
    const router = useRouter()
    const { catId } = router.query
    const [seed, setSeed] = useState(1);
    const reload = () => setSeed(Math.random())

    return (
        <div>
            <main>
                <div className="d-flex justify-content-between bd-highlight mb-2">
                    <div className="p-2 bd-highlight"><Back href={"/join-words/categories"} /></div>
                    <div className="btn btn-outline-primary p-3 bd-highlight m-3" onClick={reload}>
                        <Reload width="20" height="20" />
                    </div>
                </div>
                <Title value={"Join Words"} />
                <Game catId={catId} key={seed} />
            </main>
            <footer>
            </footer>
        </div>
    )
}
import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { useRouter } from 'next/router'
import { JoinWordsStatus, url_site } from '../../lib/constants';
import Back from '../../lib/back';

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
    const [catId, setCatId] = useState(props.catId);
    const [childrenRefs, setChildrenRefs] = useState([[], []]);
    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(localStorage.getItem("token") || sessionStorage.getItem("token"));
        if (token != null) {
            fetch(url_site + "/api/join-words/" + parseInt(catId), {
                headers: {
                    'token': token
                }
            })
                .then((res) => res.json())
                .then((data) => data.map((col) => col
                    .sort(() => (Math.random() > 0.5) ? 1 : -1)
                    .map((item) => {
                        return { id: item.id, word: item.word, status: JoinWordsStatus.Unchecked }
                    }))
                ).then(function (data) {
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

    function otherPosSameCol(col) {
        let oPos = -1;
        status[col].forEach((item, i) => {
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

    function handleClick(col, item, pos) {
        /* 
        - ningun elemento seleccionado en ninguna columna -> seleccionano pre
        - click un elemento seleccionado con pre -> deseleccionar
        - un elemento seleccionado como pre en otra columna
            - si es el mismo -> ok
            - si es diferente -> nok
        */

        //const status = structuredClone(status);
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
                        key={"c" + col + "i" + item.id}
                        ref={childrenRefs[col][pos]}
                        onClick={() => handleClick(col, item, pos)} />
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

    const reload = () => {
        setSeed(Math.random());
    }

    return (
        <div>
            <main>
                <div className="d-flex justify-content-between bd-highlight mb-2">
                    <div className="p-2 bd-highlight"><Back href={"/join-words/categories"} /></div>
                    <div className="btn btn-outline-primary p-3 bd-highlight m-3" onClick={reload}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                        </svg>
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
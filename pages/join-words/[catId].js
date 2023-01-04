// https://es.reactjs.org/tutorial/tutorial.html

import React from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.css'
import { useRouter } from 'next/router'
import { JoinWordsStatus, url_site } from '../../lib/contants';

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

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: [[], []],
            catId: props.catId
        }
    }

    componentDidMount() {
        const _this = this;
        //const url = (process.env.NODE_ENV == "production") ? "https://russian.fly.dev" : "http://localhost:3000";
        fetch(url_site + "/api/join-words/" + this.state.catId)
            .then((res) => res.json())
            .then((data) => data.map((col) => col
                .sort(() => (Math.random() > 0.5) ? 1 : -1)
                .map((item) => {
                    return { id: item.id, word: item.word, status: JoinWordsStatus.Unchecked }
                }))
            ).then(function (data) {
                _this.setState({ status: data, catId: _this.state.catId })
                _this.childrenRefs = data.map((c) => c.map((e) => React.createRef()));
            });
    }

    anySelectedElement() {
        let any = false;
        this.state.status.forEach((col) => {
            col.forEach((item) => {
                if (item.status != JoinWordsStatus.Unchecked && item.status != JoinWordsStatus.Ko && item.status != JoinWordsStatus.Ok) {
                    any = true;
                }
            });
        });
        return any;
    }

    anySelectedElementInCol(col) {
        let any = false;
        this.state.status[col].forEach((item) => {
            if (item.status == JoinWordsStatus.Pre) {
                any = true;
            }
        });
        return any;
    }

    isPreSelectedElement(col, pos) {
        return this.state.status[col][pos].status == JoinWordsStatus.Pre;
    }

    onePreSelectedElementInOtherCol(col) {
        const otherCol = (col == 0) ? 1 : 0;
        let any = false;
        this.state.status[otherCol].forEach((item) => {
            if (item.status == JoinWordsStatus.Pre) {
                any = true;
            }
        });
        return any;
    }

    otherPos(col) {
        const otherCol = (col == 0) ? 1 : 0;
        let otherPos = -1;
        this.state.status[otherCol].forEach((item, i) => {
            if (item.status == JoinWordsStatus.Pre) {
                otherPos = i;
            }
        });
        return otherPos;
    }

    otherPosSameCol(col) {
        let otherPos = -1;
        this.state.status[col].forEach((item, i) => {
            if (item.status == JoinWordsStatus.Pre) {
                otherPos = i;
            }
        });
        return otherPos;
    }

    isOk(col, pos) {
        const otherCol = (col == 0) ? 1 : 0;
        let otherPos = -1;
        this.state.status[otherCol].forEach((item, i) => {
            if (item.status == JoinWordsStatus.Pre) {
                otherPos = i;
            }
        });
        return this.state.status[col][pos].id == this.state.status[otherCol][otherPos].id;
    }

    handleClick(col, item, pos) {
        /* 
        - ningun elemento seleccionado en ninguna columna -> seleccionano pre
        - click un elemento seleccionado con pre -> deseleccionar
        - un elemento seleccionado como pre en otra columna
            - si es el mismo -> ok
            - si es diferente -> nok
        */

        const status = structuredClone(this.state.status);        
        if ([JoinWordsStatus.Unchecked, JoinWordsStatus.Pre].includes(status[col][pos].status)) {
            const otherCol = (col == 0) ? 1 : 0;
            if (!this.anySelectedElement()) {
                this.childrenRefs[col][pos].current.setState({ status: JoinWordsStatus.Pre });
                status[col][pos].status = JoinWordsStatus.Pre;
            } else if (this.isPreSelectedElement(col, pos)) {
                this.childrenRefs[col][pos].current.setState({ status: JoinWordsStatus.Unchecked });
                status[col][pos].status = JoinWordsStatus.Unchecked;
            } else if (this.onePreSelectedElementInOtherCol(col)) {
                const otherPos = this.otherPos(col);
                const result = this.isOk(col, pos) ? JoinWordsStatus.Ok : JoinWordsStatus.Ko;
                this.childrenRefs[col][pos].current.setState({ status: result });
                status[col][pos].status = result;
                this.childrenRefs[otherCol][otherPos].current.setState({ status: result });
                status[otherCol][otherPos].status = result;
            }
            this.setState({ status: status });
        }
    }

    render() {
        return (<div className="container px-4 text-center" key={"container"}>
            <div className="row gx-5" key={"container2"}>
                {[0, 1].map((col) => {
                    return <div className="d-grid gap-3 col" key={"c" + col}>
                        {this.state.status[col].map((item, pos) => <WordElement word={item}
                            key={"c" + col + "i" + item.id}
                            ref={this.childrenRefs[col][pos]}
                            onClick={() => this.handleClick(col, item, pos)} />
                        )}
                    </div>
                })}
            </div>
        </div>);
    }
}

export default function JoinWords() {
    const router = useRouter()
    const { catId } = router.query
    return (
        <div>
            <main>
                <Link href={"/join-words/categories"}>Back</Link>
                <Title value={"Join Words"} />
                <Game catId={catId} />
            </main>
            <footer>
            </footer>
        </div>
    )
}
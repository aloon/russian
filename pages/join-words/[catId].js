// https://es.reactjs.org/tutorial/tutorial.html

import React from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.css'
import { useRouter } from 'next/router'

export async function getServerSideProps(context) {
    const { catId } = context.params;
    return { props: { catId: catId } }
}

const Status = {
    Unchecked: 0,
    Pre: 1,
    Ok: 2,
    Ko: 3
}

const game = [
    [{ "id": 10, "word": "10" }, { "id": 20, "word": "20" }, { "id": 30, "word": "30" }, { "id": 40, "word": "40" }],
    [{ "id": 10, "word": "a" }, { "id": 20, "word": "b" }, { "id": 30, "word": "c" }, { "id": 40, "word": "d" }]
];

function Title(props) {
    return (<>
        <h1 className="text-center">{props.value}</h1><br />
    </>);
}

class WordElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: Status.Unchecked,
            element: props.word
        };
    }

    handleClick() {
        switch (this.state.status) {
            case Status.Unchecked:
                this.setState({ status: Status.Pre });
                break;
            case Status.Pre:
                this.setState({ status: Status.Unchecked });
                break;
        }

        this.props.onClick()
    }

    render() {
        let clazz = "";
        switch (this.state.status) {
            case Status.Unchecked:
                clazz = "p-3 bg-light border";
                break;
            case Status.Pre:
                clazz = "p-3 bg-warning border";
                break;
            case Status.Ok:
                clazz = "p-3 bg-success border";
                break;
            case Status.Ko:
                clazz = "p-3 bg-danger border";
                break;
        }
        return (<div className={clazz} onClick={() => this.handleClick()}>
            {this.state.element.word}
        </div>);
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
        const url = (process.env.NODE_ENV == "production") ? "https://russian.fly.dev" : "http://localhost:3000";
        fetch(url + "/api/join-words/" + this.state.catId)
            .then((res) => res.json())
            .then((data) => data.map((col) => col
                .sort(() => (Math.random() > 0.5) ? 1 : -1)
                .map((item) => {
                    return { id: item.id, word: item.word, status: Status.Unchecked }
                }))
            ).then(function (data) {
                _this.setState({ status: data, catId: _this.state.catId })
                _this.childrenRefs = data.map((c) => c.map((e) => React.createRef()));
            });
    }


    handleClick(col, item, pos) {
        const status = structuredClone(this.state.status);
        const preStatus = status[col][pos].status;
        let postStatus = Status.Pre;
        if (preStatus == Status.Pre) {            
            postStatus = Status.Unchecked;
        }
        //this.childrenRefs[0][0].current.state.status = Status.Ok;
        if (postStatus == Status.Pre) {
            this.childrenRefs[col].forEach((ele) => {
                if (ele.current.state.status == Status.Pre) {
                    ele.current.state.status = Status.Unchecked;
                }
            });
            status[col].forEach((ele) => ele.status = Status.Unchecked);
        }

        status[col][pos].status = postStatus;
        this.setState({ status: status });
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
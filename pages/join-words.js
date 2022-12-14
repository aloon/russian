// https://es.reactjs.org/tutorial/tutorial.html

import React from 'react';

const Status = {
    Unchecked: 0,
    Pre: 1,
    Ok: 2,
    Ko: 3
}

const game = [
    [{ "id": 1, "word": "1" }, { "id": 2, "word": "2" }, { "id": 3, "word": "3" }],
    [{ "id": 1, "word": "a" }, { "id": 2, "word": "b" }, { "id": 3, "word": "c" }]
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

    handleClick(){
        if(this.state.status==Status.Unchecked){
            this.setState({status: Status.Pre});
        }
        else if(this.state.status==Status.Pre){
            this.setState({status: Status.Unchecked});
        }
        this.props.onClick()
    }

    render() {
        let clazz = "p-3 bg-light border";
        if (this.state.status == Status.Pre) {
            clazz = "p-3 bg-warning border";
        }
        return (<>
            <div className={clazz} onClick={() => this.handleClick()}>
                {this.state.element.word}
            </div>
        </>);
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: game.map((e) => e.map((e) => Status.Unchecked))
        };
    }

    handleClick(col, id) {
        const status = this.state.status.slice();
        status[col][id] = Status.Pre;
        this.setState({ status: status });
    }

    render() {
        return (<>
            <div className="container px-4 text-center" key={"container"}>
                <div className="row gx-5" key={"container2"}>
                    {[0, 1].map((col) =>
                        <div className="d-grid gap-3 col" key={"c" + col}>
                            {game[0].map((item) =>
                                <WordElement word={item} key={"w" + item.id} onClick={() => this.handleClick(col, item.id)} />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>);
    }
}

export default function JoinWords() {
    return (
        <div>
            <main>
                <Title value={"Join Words"} />
                <Game />
            </main>
            <footer>
            </footer>
        </div>
    )
}
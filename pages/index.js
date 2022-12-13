function Welcome() {
  return <h1 className="text-center">Bienvenido</h1>;
}

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

function allUnchecked(col) {
  console.log(game[col])
  game[col]
    //  .filter((item) => (item.Status ?? Status.Unchecked) == Status.Pre)
    .forEach((item) => {
      console.log(item);
      item.status = Status.Unchecked;
      document.getElementById("c" + col + "_" + item.id).classList.remove("bg-warning");
      document.getElementById("c" + col + "_" + item.id).classList.add("bg-light");
    });
}

const AnotherCol = (col) => col == 0 ? 1 : 0;

function IdChecked(col) {
  return game[col].filter((item) => item.status == Status.Pre)[0].id;
}

function AnyChecked(col) {
  return game[col].filter((item) => item.status == Status.Pre).length > 0;
}

function check(e) {
  //console.log(e.target.id)
  // e.target.classList.remove("bg-light");

  const col = e.target.id.split("_")[0].split("c")[1];
  const id = e.target.id.split("_")[1];

  const status = game[col].filter((item) => item.id == id)[0].status ?? Status.Unchecked;

  if (status == Status.Unchecked) {
    allUnchecked(col);
    game[col].filter((item) => item.id == id)[0].status = Status.Pre;
    if (AnyChecked(AnotherCol(col))) {
      if (IdChecked(AnotherCol(col)) == IdChecked(col)) {
        game[col].filter((item) => item.id == id)[0].status = Status.Ok;
        game[AnotherCol(col)].filter((item) => item.id == id)[0].status = Status.Ok;
        e.target.classList.add("bg-success");
        document.getElementById("c" + AnotherCol(col) + "_" + id).classList.add("bg-success");
      }
      else {
        game[col].filter((item) => item.id == id)[0].status = Status.Ko;
        game[AnotherCol(col)].filter((item) => item.id == id)[0].status = Status.Ko;
        e.target.classList.add("bg-warning");
        document.getElementById("c" + AnotherCol(col) + "_" + id).classList.add("bg-warning");
      }
    }
    else {
      e.target.classList.remove("bg-light");
      e.target.classList.add("bg-warning");
    }
  }
  else if (status == Status.Pre) {
    e.target.classList.remove("bg-warning");
    e.target.classList.add("bg-light");
    game[col].filter((item) => item.id == id)[0].status = Status.Unchecked;
  }
}

function WordElement(props) {
  const id = `c${props.col}_${props.item.id}`
  return (<div id={id} onClick={e => check(e)} className="p-3 bg-light border">{props.item.word}</div>);
}


function Game(props) {
  return (
    <div className="container px-4 text-center" key={"container"}>
      <div className="row gx-5" key={"container2"}>
        <div className="d-grid gap-3 col" key={"c1"}>
          {game[0].map((item) =>
            <WordElement key={`c1_${item.id}`} item={item} col={0} />
          )}
        </div>
        <div className="d-grid gap-3 col" key={"c2"}>
          {game[1].map((item) =>
            <WordElement key={`c1_${item.id}`} item={item} col={1} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <main>
        <Welcome />
        <Game />
      </main>
      <footer>
      </footer>
    </div>
  )
}

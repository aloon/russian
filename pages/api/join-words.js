// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  let dbPasswd = "postgres"
  if(process.env.NODE_ENV == "production") {
    dbPasswd = process.env["DB_PASSW"]
  }
  const game = {
  "a": dbPasswd,
    "b":[
    [{ "id": 10, "word": "10" }, { "id": 20, "word": "20" }, { "id": 30, "word": "30" }],
    [{ "id": 10, "word": "a" }, { "id": 20, "word": "b" }, { "id": 30, "word": "c" }]
]};
  res.status(200).json(game)
}

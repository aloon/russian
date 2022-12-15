// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const game = [
    [{ "id": 1, "word": "1" }, { "id": 2, "word": "2" }, { "id": 3, "word": "3" }],
    [{ "id": 1, "word": "a" }, { "id": 2, "word": "b" }, { "id": 3, "word": "c" }]
  ];
  res.status(200).json(game)
}

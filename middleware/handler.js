// I like to use next-connect for API endpoints because it works like express.js and lets us chain methods like .get and .post rather than doing a big switch statement or a bunch of if/else checks.
// https://fullstackdigital.io/blog/authentication-starter-kit-for-next-js-and-mongodb/

import nc from "next-connect";

function onError(err, req, res, next) {
  console.error(err);
  res.status(500).end(err.toString());
}

const handler = nc({
  onError: onError,
  onNoMatch: (req, res) => {
    res.status(404).send("Page is not found");
  },
})

export default handler
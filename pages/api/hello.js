// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import _middleware from "./_middleware"

export default function handler(req, res) {
  res.status(200).json({ name: 'ger sanchez' })
}

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request, response) {
  response.status(200).json({
    hello: 'world',
  });
}

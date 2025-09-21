import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios, { type AxiosError } from 'axios';

const API_BASE_URL = process.env.API_BASE_URL;
const BASIC_USER = process.env.BASIC_USER;
const BASIC_PASS = process.env.BASIC_PASS;

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const { url, method, body, headers: originalHeaders } = request;

  const requestPath = url?.replace('/api', '') || '';
  const targetUrl = `${API_BASE_URL}${requestPath}`;
  const token = Buffer.from(`${BASIC_USER}:${BASIC_PASS}`).toString('base64');

  try {
    const headers: { [key: string]: string } = {
      Authorization: `Basic ${token}`,
    };
    if (originalHeaders['content-type']) {
      headers['Content-Type'] = originalHeaders['content-type'];
    }
    if (originalHeaders.cookie) {
      headers.Cookie = originalHeaders.cookie;
    }

    const axiosResponse = await axios({
      method: method as 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
      url: targetUrl,
      headers,
      data: body,
    });

    response.status(axiosResponse.status).json(axiosResponse.data);
  } catch (error) {
    console.error('Proxy Error:', error);
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError;
      if (err.response) {
        response.status(err.response.status).json(err.response.data);
        return;
      }
    }
    response.status(500).json({ message: 'An internal server error occurred.' });
  }
}

import axios from "axios";
import * as express from "express";
import * as next from "next";
import getConfig from "next/config";
import { parseCookies } from "nookies";

const { publicRuntimeConfig } = getConfig();

export function getAPIClient(
  ctx?:
    | Pick<next.NextPageContext, "req">
    | {
        req: next.NextApiRequest;
      }
    | {
        req: express.Request;
      }
    | null
    | undefined
) {
  // const { 'votofacil-token': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: publicRuntimeConfig.apiUrl,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  api.interceptors.request.use(
    (config) => {
      const { "shaw-token": token } = parseCookies(ctx);
      if (token) {
        config.params = {
          ...config.params,
          token,
        };
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return api;
}

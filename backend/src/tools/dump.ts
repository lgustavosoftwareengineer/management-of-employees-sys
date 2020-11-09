/* eslint-disable @typescript-eslint/ban-types */
import { Response } from 'express';
import moment from 'moment';

interface DumpDTO {
  codeParam: number;
  jsonParam: object | null;
  response: Response;
}

/**
 * @param {number} codeParam Código HTTP de resposta
 * @param {object} jsonParam objeto JSON de resposta
 * @param {Response} response parâmetro de resposta do método HTTP utilizado
 */

function dump({ codeParam, jsonParam, response }: DumpDTO): Response {
  return response
    .status(codeParam)
    .json({ timestamp: moment().format(), data: jsonParam });
}
export default dump;

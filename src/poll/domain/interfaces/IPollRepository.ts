import { ApiError } from './../../../common/data/models/ApiError';
import { Poll } from "../models/Poll";

export interface IPollRepository {
  createPoll(p: Poll): ApiError
}
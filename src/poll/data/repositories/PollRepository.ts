import { IPollRepository } from './../../domain/interfaces/IPollRepository';

class PollRepository implements IPollRepository {

}

export const pollRepository: IPollRepository = new PollRepository()
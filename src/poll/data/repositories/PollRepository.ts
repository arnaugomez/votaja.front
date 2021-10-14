import { addDoc } from '@firebase/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../../../common/data/firebase';
import { Err } from '../../../common/data/models/Error';
import { Poll } from '../../domain/models/Poll';
import { IPollRepository } from './../../domain/interfaces/IPollRepository';

class PollRepository implements IPollRepository {

  async createPoll(p: Poll): Promise<Err> {
    const docRef = await addDoc(collection(db, "polls"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
    return null
  }
}

export const pollRepository: IPollRepository = new PollRepository()
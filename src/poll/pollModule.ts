import { PollRepository } from "./data/repositories/PollRepository";
import { IPollRepository } from "./domain/interfaces/IPollRepository";
import { IVoteStore } from "./domain/interfaces/IVoteStore";
import { useVoteStoreDep } from "./view/store/voteStore";

export const pollRepository: IPollRepository = new PollRepository();

export const useVoteStore: () => IVoteStore = useVoteStoreDep;

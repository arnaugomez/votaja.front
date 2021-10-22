import { CProps } from "../../../common/view/view-models/CProps";
import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useCallback,
} from "react";
import { Vote } from "src/poll/domain/models/Vote";
import { IVoteStore } from "src/poll/domain/interfaces/IVoteStore";
import { Poll } from "src/poll/domain/models/Poll";
import { pollRepository } from "src/poll/data/repositories/PollRepository";

const VoteContext = createContext<Vote>(null);
const SetVoteContext = createContext<Dispatch<SetStateAction<Vote>>>(null);

export function VoteProvider({ children }: CProps) {
  const [vote, setVote] = useState<Vote>(null);
  return (
    <VoteContext.Provider value={vote}>
      <SetVoteContext.Provider value={setVote}>
        {children}
      </SetVoteContext.Provider>
    </VoteContext.Provider>
  );
}

const LS_VOTE_OF_POLL_PREFIX = "voteOfPoll_";

export function useVoteStore(): IVoteStore {
  const vote = useContext(VoteContext);
  const setVote = useContext(SetVoteContext);

  const createVote = useCallback(
    async (v: Vote, p: Poll): Promise<void> => {
      const { vote, err } = await pollRepository.createVote(p.id, v);
      if (err) {
        // TODO: Handle error with toaster
        console.error(err.message);
        return;
      }

      setVote(vote);
      console.log({ vote, err });

      try {
        localStorage.setItem(LS_VOTE_OF_POLL_PREFIX + p.id, vote.id);
      } catch {
        console.error("Could not save vote to local storage");
      }
    },
    [setVote]
  );

  const updateVote = useCallback(
    async (v: Vote, p: Poll) => {
      const err = await pollRepository.updateVote(p.id, v);
      if (err) {
        // TODO: Handle error with toaster
        console.error(err.message);
        return;
      }
      setVote(v);
    },
    [setVote]
  );

  const getVoteFromLocalStorage = useCallback(
    (p: Poll): Vote => {
      try {
        const voteId = localStorage.getItem(LS_VOTE_OF_POLL_PREFIX + p.id);
        const vote = p.getVoteById(voteId);
        setVote(vote);
        return vote;
      } catch {
        return null;
      }
    },
    [setVote]
  );

  return { vote, createVote, updateVote, getVoteFromLocalStorage };
}

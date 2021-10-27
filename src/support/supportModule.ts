import { SupportRespository } from "./data/repositories/SupportRepository";
import { ISupportRepository } from "./domain/interfaces/ISupportRepository";
import { ISupportStore } from "./domain/interfaces/ISupportStore";
import { useSupportStoreDep } from "./view/store/supportStore";

export const useSupportStore: () => ISupportStore = useSupportStoreDep;

export const supportRepository: ISupportRepository = new SupportRespository();

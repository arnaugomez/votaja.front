import { FSuggestion } from './../models/FSuggestion';
import { Suggestion } from './../../domain/models/Suggestion';
import { cleanse } from 'src/common/util/cleanse';

export const toFSuggestion = (s: Suggestion): FSuggestion => cleanse(s)
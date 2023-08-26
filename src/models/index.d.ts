import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";





type EagerVariables = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Variables, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly symbol: string;
  readonly formula?: string | null;
  readonly name: string;
  readonly modelId: string;
  readonly isFormula: boolean;
  readonly point?: (string | null)[] | null;
  readonly dependencies?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyVariables = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Variables, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly symbol: string;
  readonly formula?: string | null;
  readonly name: string;
  readonly modelId: string;
  readonly isFormula: boolean;
  readonly point?: (string | null)[] | null;
  readonly dependencies?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Variables = LazyLoading extends LazyLoadingDisabled ? EagerVariables : LazyVariables

export declare const Variables: (new (init: ModelInit<Variables>) => Variables) & {
  copyOf(source: Variables, mutator: (draft: MutableModel<Variables>) => MutableModel<Variables> | void): Variables;
}

type EagerModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Model, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly Variables?: (Variables | null)[] | null;
  readonly description?: string | null;
  readonly dashboardLayouts?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Model, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly Variables: AsyncCollection<Variables>;
  readonly description?: string | null;
  readonly dashboardLayouts?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Model = LazyLoading extends LazyLoadingDisabled ? EagerModel : LazyModel

export declare const Model: (new (init: ModelInit<Model>) => Model) & {
  copyOf(source: Model, mutator: (draft: MutableModel<Model>) => MutableModel<Model> | void): Model;
}
import { Action } from "@ngrx/store";

/**
 * An action with a typed payload attached.
 */
export interface PayloadAction<T> extends Action {
    payload: T;
}

/**
 * An asynchronous action type.
 */
export interface AsyncActionType {
    BEGIN: string;
    SUCCESS: string;
    FAILURE: string;
    UPDATE: string;
}

/**
 * The ID of the application, used with @ngrx actions.
 */
export const appId = "@landmark/demo";

/**
 * Creates a synchronous action type.
 * @param id The area of the application represented by the asynchronous action.
 */
export function Action(id) {
    return `${appId}/${id}`;
}

/**
 * Creates an asynchronous action type.
 * @param id The area of the application represented by the asynchronous action.
 */
export function AsyncAction(id) {
    return {
        BEGIN: `${appId}/${id}/BEGIN`,
        SUCCESS: `${appId}/${id}/SUCCESS`,
        FAILURE: `${appId}/${id}/FAILURE`,
        UPDATE: `${appId}/${id}/UPDATE`,
    } as AsyncActionType;
}

/**
 * An action creator, used to create an action for the given payload type.
 */
export type ActionCreator<TPayloadType extends Action = any> = (type: string, payload: TPayloadType) => PayloadAction<TPayloadType>;

/**
 * An async action creator, used to build async actions for an asynchronous action type.
 */
export interface AsyncActionCreators<TRequestPayloadType, TResponsePayloadType = TRequestPayloadType, TUpdatePayloadType = TResponsePayloadType> {
    begin(payload?: TRequestPayloadType): PayloadAction<TRequestPayloadType>;
    failure(payload: TResponsePayloadType | Error): PayloadAction<Error>;
    success(payload?: TResponsePayloadType): PayloadAction<TResponsePayloadType>;
    update(payload: TUpdatePayloadType): PayloadAction<TUpdatePayloadType>;
}

/**
 * Creates a synchronous action creator.
 * @param type The action type.
 */
export function createAction<TPayloadType = any>(type: string) {
    return (payload?: TPayloadType) => ({
        type,
        payload
    });
}

/**
 * Creates asynchronous actions for a given action type.
 * @param asyncActionType The asynchronous action type used to create actions.
 */
export function createAsyncActions<TRequestPayloadType, TResponsePayloadType, TUpdatePayloadType = any>(asyncActionType: AsyncActionType) {
    return {
        begin: (payload?: TRequestPayloadType) => ({
            type: asyncActionType.BEGIN,
            payload,
        }),
        failure: (payload: TResponsePayloadType | Error) => ({
            type: asyncActionType.FAILURE,
            payload,
        }),
        success: (payload?: TResponsePayloadType) => ({
            type: asyncActionType.SUCCESS,
            payload,
        }),
        update: (payload: TUpdatePayloadType) => ({
            type: asyncActionType.UPDATE,
            payload,
        }),
    } as AsyncActionCreators<TRequestPayloadType, TResponsePayloadType, TUpdatePayloadType>;
}

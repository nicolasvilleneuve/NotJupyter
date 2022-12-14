import {ActionType} from "../action-types";
import {Action, DeleteCellAction, InsertCellAfterAction, MoveCellAction, UpdateCellAction} from "../actions";
import {CellTypes, Directions} from "../cell";
import {Dispatch} from "redux";
import Bundler from "../../bundler";

export const updateCell = (id: string, content: string): UpdateCellAction => {
    return {
        type: ActionType.UPDATE_CELL,
        payload: {
            id,
            content
        }
    };
};

export const moveCell = (id: string, direction: Directions): MoveCellAction => {
    return {
        type: ActionType.MOVE_CELL,
        payload: {
            id,
            direction
        }
    };
};

export const deleteCell = (id: string): DeleteCellAction => {
    return {
        type: ActionType.DELETE_CELL,
        payload: id
    };
};

export const insertCellAfter = (id: string | null, cellType: CellTypes): InsertCellAfterAction => {
    return {
        type: ActionType.INSERT_CELL_AFTER,
        payload: {
            id,
            type: cellType
        }
    };
};


export const createBundle = (cellId: string, input: string) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.BUNDLE_START,
            payload: {
                cellId
            }
        });
    const result = await Bundler(input);

    const {code, err} = result;

    dispatch({
        type: ActionType.BUNDLE_COMPLETE,
        payload: {
            cellId,
            bundle: {
                code,
                err
            }
        }
    })
    };
};

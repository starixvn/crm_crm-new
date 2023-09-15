import React, { useContext, useEffect, useCallback } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import LangHelper from '@jsroot/common/langHelper';

const useBlocker = function( blocker, when = true ) {
    const { navigator } = useContext(NavigationContext);
    useEffect( () => {
        if(!when) {
            return undefined;
        }
        const unblock = navigator.block( tx => {
            const autoUnblockingTx = {
                ...tx,
                retry() {
                    unblock();
                    tx.retry();
                }
            };

            blocker( autoUnblockingTx );
        });

        return unblock;
    }, [ navigator, blocker, when ] );
};

const usePrompt = function( message, when = true ) {
    const blocker = useCallback(
        tx => {
            if (window.confirm(message)){
                tx.retry();
            }
        },
        [ message ]
    );
    useBlocker( blocker, when );
};

export const FormCheckDirtyComponent = ({ isDirty, tab }) => {
    const message = LangHelper.formatString(LangHelper.getResource('ThereAreSomeChangesOnTabConfirmMessage'), tab);
    usePrompt(message, isDirty );
    return null;
};
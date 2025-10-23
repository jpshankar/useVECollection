import VECollection from 'vecollection';
import { useCallback, useState } from 'react';

interface VECollectionHook<S extends object> {
    addToCollection: (_: S) => void,
    removeFromCollection: (_: S) => void,
    collection: VECollection<S>    
}

export default function useVECollection<T extends object>(array?: Array<T>): VECollectionHook<T> {
    const collection = new VECollection<T>(array);

    const [collectionState, setCollectionState] = useState<VECollection<T>>(collection);

    const addToCollection = useCallback((elem: T) => {
        setCollectionState((collectionSoFar) => {
            const collectionCopy = collectionSoFar.copy();
            collectionCopy.add(elem);
            return collectionCopy;
        });
    }, []);

    const removeFromCollection = useCallback((elem: T) => {
       setCollectionState((collectionSoFar) => {
            const collectionCopy = collectionSoFar.copy();
            // TODO: capture failure for logging
            collectionCopy.remove(elem);
            return collectionCopy;
       });
    }, []);

    return { addToCollection, removeFromCollection, collection: collectionState };
};
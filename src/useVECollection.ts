import VECollection from 'vecollection';
import { useCallback, useState } from 'react';

interface VECollectionHook<S extends object> {
    addToCollection: (_: S) => void,
    addAllToCollection: (_: VECollection<S>) => void,
    removeFromCollection: (_: S) => void,
    removeFirstFoundFromCollection: (_: (_: S) => boolean) => void,
    collection: VECollection<S>    
}

export default function useVECollection<T extends object>(set: Set<T> = new Set<T>()): VECollectionHook<T> {
    const collection = new VECollection<T>(set);

    const [collectionState, setCollectionState] = useState<VECollection<T>>(collection);

    const addToCollection = useCallback((elem: T) => {
        setCollectionState((collectionSoFar) => {
            const collectionCopy = collectionSoFar.copy();
            collectionCopy.add(elem);
            return collectionCopy;
        });
    }, []);

    const addAllToCollection = useCallback((allElems: VECollection<T>) => {
        setCollectionState((collectionSoFar) => {
            const collectionCopy = collectionSoFar.copy();
            collectionCopy.addAll(allElems);
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

    const removeFirstFoundFromCollection = useCallback((findFn: (_: T) => boolean) => {
        setCollectionState((collectionSoFar) => {
            const collectionCopy = collectionSoFar.copy();
            // TODO: capture failure for logging
            collectionCopy.findAndRemoveFirstOccurrence(findFn);
            return collectionCopy;
       });
    }, []);

    return { addToCollection, addAllToCollection, removeFromCollection, removeFirstFoundFromCollection, collection: collectionState };
};
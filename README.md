# useVECollection
React hook for [VECollection](https://github.com/jpshankar/VECollection).

#### How to use

```TypeScript
import useVECollection from 'usevecollection';

interface ExampleObject {
    exampleField: string
};

const exampleObject: ExampleObject = {
    exampleField: "exampleField";
}

const { addToCollection, removeFromCollection, collection } = useVECollection([exampleObject]);

addToCollection({exampleField: "secondExample"});
removeFromCollection(exampleObject);
```

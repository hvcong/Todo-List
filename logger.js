export default function logger(reducer) {
    return (prevState, action, args) => {
        console.group(action)
        console.log('Prev State: ',prevState)
        console.log('Action Arguments: ',args)
        const newState = reducer(prevState, action, args)
        console.log('Next State: ', newState)
        console.groupEnd()
        return newState
    }
}
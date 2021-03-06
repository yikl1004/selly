import _ from 'lodash'

const eventList = ['change', 'keydown', 'focus', 'mounted', 'input']
const exceptionList = ['default']
const getProps = <ArgTypes = object>(
    argTypes: ArgTypes,
    excludes: string[] = [],
) => {
    // exception props
    let props = Object.keys(argTypes).filter(type =>
        exceptionList.every(exception => exception !== type),
    )
    // event props add prefix '@'
    props = props.map(type => {
        if (eventList.some(event => event === type)) {
            return `on${_.capitalize(type)}`
        }
        return type
    })

    if (excludes.length) {
        props = _.difference(props, excludes)
    }

    return props
}

export default getProps

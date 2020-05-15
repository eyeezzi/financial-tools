# Learning React

## Progressive React Mastery

1. Create and use a simple static component.

- A component is just a function that returns JSX. It needs to import 'react'.
- You import the component where you want to use it and simply declare it as a html element in the parent component's JSX.

2. You can pass arguments to the component (which is just a function), by listing the args=value pairs in the compoents declaration. The args are the accessible as peoprteis of the 'props' parameter on in the component function. In the component's JSX, you can access these values using curly braces.

3. State management with 'useState' Hook

- react.useState(obj|func) takes in an object or a function returning an object and creates a state container for it. It returns the object and function to update the object. [an object here means any JS entity like int, strings, or object.

- the update function accepts the new state as argument. It has a replace semantics so be careful to provide the complete value of the new object else upspecified properties will be removed.

- you can have as many useState declarations as you need in a single component.

- https://youtu.be/9xhKH43llhU

4. Rendering with react.useEffect(effect, deps...) Hook

- useEffect allows doing stuff when the component is re-rendered.

- The effect is a function that executes on every rendering of the component. The deps argument specifies a list of state only whose changes will trigger the effect.

- Be careful of having an effect that changes its dependencies because that just results in an infinite execution loop.

- multiple use effects can be used in a single component.

- A useEffect can return a function and that function is only run when the component is to be unmounted...that is hidden or removed from the DOM by its parent.

- https://youtu.be/j1ZRyw7OtZs
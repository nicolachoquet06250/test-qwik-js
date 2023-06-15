import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

export default component$(() => {
    const route = useLocation();
    
    return (<>
        <h1>coucou {route.params.id}</h1>
    </>)
});
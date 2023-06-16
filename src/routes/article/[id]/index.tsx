import { component$ } from '@builder.io/qwik';
import { RequestHandler, useLocation } from '@builder.io/qwik-city';

export const onGet: RequestHandler = async ({ params, request, headers, url, redirect, json }) => {
    if (params.id == 12) {
        const redirectUrl = new URL('/', url).toString();

        if (
            headers.get('accept') === 'application/json' ||
            request.headers.get('accept') === 'application/json'
        ) {
            throw json(308, {
                code: 308,
                redirect: redirectUrl
            });
        }

        throw redirect(308, redirectUrl);
    } else if (
        headers.get('accept') === 'application/json' ||
        request.headers.get('accept') === 'application/json'
    ) {
        throw json(200, {
            code: 200,
            title: `coucou ${params.id}`
        })
    }
}

export default component$(() => {
    const { params } = useLocation();
    
    return (<>
        <h1>coucou {params.id}</h1>
    </>)
});
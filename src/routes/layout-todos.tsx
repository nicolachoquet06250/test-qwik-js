import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import Header from '~/components/starter/header/header';
import Footer from '~/components/starter/footer/footer-todos';

import styles from './styles.css?inline';

export { onGet } from './cache';

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <Header />
      <main>
        <h1>Yahouuuuuuuuuuuuuuuuuu</h1>
        <Slot />
      </main>
      <Footer />
    </>
  );
});

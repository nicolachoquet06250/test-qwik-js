import { useSignal, useVisibleTask$, component$ } from '@builder.io/qwik';
import {
  type DocumentHead,
  routeLoader$,
  routeAction$,
  zod$,
  z,
  Form,
} from '@builder.io/qwik-city';
import styles from './todolist.module.css';

const listItemSchema = z.object({
  text: z.string().trim().min(1),
});

interface ListItem {
  text: string;
}

export let list: ListItem[] = [
  {
    text: 'un text'
  }
];

const defaultInputValue = 'default value';

export const useListLoader = routeLoader$(() => list);

export const useAddToListAction = routeAction$(
  (item) => {
    // const inputValue = useInputValueLoader();
    if (list.map(i => i.text).includes(item.text)) {
      return {
        success: false,
        fieldErrors: {
          text: `Le text d'une todo doit être unique`
        }
      };
    }

    list.push(item);
    // inputValue.value = '';

    return {
      success: true,
    };
  },
  zod$(listItemSchema)
);
export const useRemoveToListAction = routeAction$(
  (item) => {
    list = list.filter(_item => item.text !== _item.text);

    return {
      success: true
    };
  },
  zod$({
    text: z.string().trim().min(1),
  })
);

export default component$(() => {
  const list = useListLoader();
  const remove = useRemoveToListAction();
  const add = useAddToListAction();

  const inputValue = useSignal(defaultInputValue);

  useVisibleTask$(({ track }) => {
    track(() => add.value);

    if (add.value?.success) {
      inputValue.value = defaultInputValue
    }
  });

  return (
    <>
      <div class="container container-center">
        <h1>
          <span class="highlight">TODO</span> List
        </h1>
      </div>

      <div role="presentation" class="ellipsis"></div>

      <div class="container container-center">
        {(list.value.length && (
          <ul class={styles.list}>
            {list.value.map((item, index) => (
              <li key={`items-${index}`}>
                <Form action={remove} spaReset>
                  {item.text}
                  <input type="hidden" name="text" value={item.text} />
                  <button type="submit" class="button-dark danger">
                    X
                  </button>
                </Form>
              </li>
            ))}
          </ul>
        )) || <span class={styles.empty}>No items found</span>}
      </div>

      <div class="container container-center">
        <Form action={add}>
          <div style={`display: flex; flex-direction: row; justify-content: center;`}>
            <div style={`display: flex; flex-direction: column; align-items: flex-start;`}>
              <input 
                name="text"
                bind:value={inputValue}
                required
                class={styles.input}
              />
              {!add.value?.success && <div style={`margin-top: 10px;`}>{add.value?.fieldErrors?.['text']}</div>}
            </div>

            <button 
              type="submit"
              class="button-dark"
            > Add item </button>
          </div>
        </Form>

        <p class={styles.hint}>PS: This little app works even when JavaScript is disabled.</p>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Qwik Todo List',
};

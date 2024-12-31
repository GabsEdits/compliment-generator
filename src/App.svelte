<script lang="ts">
  import { writable } from 'svelte/store';
  const name = writable("");
  const useName = writable(false);
  const complimentGenerated = writable(false);
  const showInput = writable(false);

  async function fetchCompliment(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  }

  async function generateCompliment(event?: Event) {
    const input = event ? (event.target as HTMLInputElement) : { value: $name };
    name.set(input.value);
    const url = $useName
      ? `https://compliment-api.deno.dev/random/name/${input.value}`
      : `https://compliment-api.deno.dev/random/withoutname`;
    try {
      const compliment = await fetchCompliment(url);
      document.getElementById("result").innerText = compliment;
      complimentGenerated.set(true);
    } catch (error) {
      console.error('Error fetching compliment:', error);
      document.getElementById("result").innerText = "Failed to fetch compliment";
    }
  }

  function toggleUseName(value: boolean) {
    useName.set(value);
    generateCompliment();
  }

  window.addEventListener("keydown", (event) => {
    if (event.key === " " && event.target === document.body) {
      event.preventDefault();
      generateCompliment();
    }
  });
</script>

<main class="mt-20 h-[90vh]">
  <h1 class="font-black mb-1 text-3xl">Compliment Generator</h1>
  <small class="mb-10 block">Receive a random compliment</small>

  <section class="flex flex-col gap-1 w-full sm:h-[80%] lg:h-[60%] rounded-xl overflow-hidden">
      <section
        class="bg-zinc-100 dark:bg-zinc-900 p-10 flex flex-col justify-center items-center gap-4 w-full h-full"
      >
        <h2 class="font-bold text-sm">Select Name</h2>

        <h3 class="font-bold text-base">Do you want to use name in the compliment?</h3>

        <div class="flex flex-row gap-[0.1rem] rounded-xl overflow-hidden">
            <button class={`bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 hover:dark:bg-zinc-700 transition-colors py-2 px-6 ${$showInput ? 'bg-zinc-300 dark:bg-zinc-700' : 'bg-zinc-200 dark:bg-zinc-800'}`} on:click={() => showInput.set(true)}>Yes</button>
            <button class={`bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 hover:dark:bg-zinc-700 transition-colors py-2 px-6 ${$showInput === false ? 'bg-zinc-300 dark:bg-zinc-700' : 'bg-zinc-200 dark:bg-zinc-800'}`} on:click={() => { toggleUseName(false); showInput.set(false); }}>No</button>
        </div>

        {#if $showInput }
          <input
            type="text"
            class="border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-zinc-200 dark:bg-zinc-800"
            on:input={(event) => { toggleUseName(true); generateCompliment(event); }}
            on:keypress={(event) => {
              if (event.key === 'Enter') {
                toggleUseName(true);
                generateCompliment(event);
              }
            }}
            />
        {/if}
      </section>

    <section
      class="bg-zinc-100 dark:bg-zinc-900 p-10 flex flex-col justify-center items-center gap-4 w-full h-full"
    >
      <h2 class="font-bold text-sm">Result</h2>
        <p id="result" class="text-4xl font-black">Empty</p>
        {#if $complimentGenerated}
          <button class="bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 hover:dark:bg-zinc-700 py-2 px-6 rounded-xl w-max transition-colors" on:click={() => generateCompliment()}>Regenerate</button>
        {/if}
    </section>
  </section>

  <footer class="flex flex-col gap-3 mt-10">
    <a
      href="https://github.com/GabEdits/compliment-generator"
      target="_blank"
      class="underline text-zinc-600 dark:text-zinc-300 dark:hover:text-zinc-200 hover:text-zinc-950 transition-colors font-extrabold duration-500"
      >Source Code</a
    >

    <p>
      Made with ❤️ for <a
        class="font-black underline text-black dark:text-white transition-colors"
        href="https://highseas.hackclub.com">Highseas</a
      >
    </p>
    <p class="flex flex-col gap-1">
      <small><b>Tip:</b> Press Space to regenerate a compliment</small>
    </p>
  </footer>
</main>

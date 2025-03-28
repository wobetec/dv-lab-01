<script>
    let localStorage = globalThis.localStorage ?? {};
    let dataTheme = localStorage.dataTheme ?? "dark";
    let root = globalThis?.document?.documentElement;

    $: localStorage.dataTheme = dataTheme;

    $: root?.setAttribute("data-theme", dataTheme);
</script>

<label class="data-theme">
    Theme:
    <select bind:value={ dataTheme }>
        <option value="light"> Light </option>
        <option value="dark"> Dark </option>
    </select>
</label>

<style>
    label.data-theme {
        position: absolute;
        top: 15px;
        right: 15px;
    }
</style>
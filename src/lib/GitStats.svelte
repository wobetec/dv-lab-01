<script>
    import { onMount } from 'svelte';
    export let username = 'wobetec';

    let githubData = null;
    let error = null;
    let loading = true;

    onMount(async () => {
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            githubData = await response.json();
        } catch (err) {
            error = err;
        } finally {
            loading = false;
        }
    });
</script>

<article>
    {#if loading}
        <p>Loading...</p>
    {:else if error}
        <p class="error">Something went wrong: {error.message}</p>
    {:else if githubData}
        <h2>My Github Stats</h2>
        <dl>
            <dt>Followers</dt>
            <dt>Following</dt>
            <dt>Public Repos</dt>
            <dd><span>{githubData.followers}</span></dd>
            <dd><span>{githubData.following}</span></dd>
            <dd><span>{githubData.public_repos}</span></dd>
        </dl>
    {/if}
</article>

<style>

    article {
        max-width: 800px;
        margin: 0 auto;
        padding: 10px;
        text-align: center;
        border: 1px solid var(--border-color-darker);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: space-around;
    }

    p {
        font-size: 1.5em;
        color: var(--text-color);
        margin: 10px auto;
    }

    dl {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin: 5px 0;
    }

    dt {
        font-weight: bold;
        color: var(--text-color);
    }

    dd > span{
        padding: 10px;
        font-weight: normal;
        color: var(--text-color);
        border-radius: 100%;
        border: 2px solid var(--primary-color);
        font-size: 1.5em;
    }

</style>
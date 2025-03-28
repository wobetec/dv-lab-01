<script>
    export let username = 'wobetec';
</script>

<article>
    {#await fetch(`https://api.github.com/users/${username}`) }
        <p>Loading...</p>
        {:then response}
        {#await response.json()}
            <p>Decoding...</p>
        {:then data} 
            <h2>My Github Stats</h2>
            <dl>
                <dt>Followers</dt>
                <dt>Following</dt>
                <dt>Public Repos</dt>
                <dd><span>{data.followers}</span></dd>
                <dd><span>{data.following}</span></dd>
                <dd><span>{data.public_repos}</span></dd>
            </dl>
        {:catch error}
            <p class="error">Something went wrong: {error.message}</p>
        {/await}
        {:catch error}
            <p class="error">Something went wrong: {error.message}</p>
    {/await}
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
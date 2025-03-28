<script>
    export let data = {};
    import { base } from "$app/paths";
</script>

<article>
    <a href={`${base}${data.url}`} target="_blank" rel="noopener noreferrer">
        <div class="img">
            <img src="{data.img}" alt="img">
        </div>
        <div class="text">
            <h2>{data.title}</h2>
            <p>{data.description}</p>
        </div>
    </a>
</article>

<style>
    article {
        width: 100%;
        max-width: 300px;
        aspect-ratio: 3/4;
        border-radius: 20px;
        border: 2px solid var(--border-color-darker);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

    div.text {
        height: 100px;
        padding: 10px;
        background-color: var(--border-color);
    }

    div.img {
        width: 100%;
        height: calc(100% - 100px);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }   

    a {
        text-decoration: none;
        color: inherit;
    }
</style>
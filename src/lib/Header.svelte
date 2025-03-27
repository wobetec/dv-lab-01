<script>
    export let links = [];
    import { base } from "$app/paths";
    import { page } from "$app/stores";

    import Center from "$lib/Center.svelte";
</script>

<header>
    <Center>
        <nav>
            {#each links as link}
            <a
                href={link.url.startsWith("http") ? link.url: `${base}${link.url}`}
                class:current={$page.route.id === link.url}
                target={link.url.startsWith("http") ? "_blank" : undefined}
            >
                {link.title}
            </a>
            {/each}
        </nav>
    </Center>
</header>

<style>
    header {
        margin: 20px auto;
        width: 100%;
    }

    nav {
        width: 100%;
        height: 50px;
        border-bottom: 1px solid var(--border-color-darker);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
    }

    nav > a {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        font-size: 20px;
        color: var(--text-color);
        transition: all 0.3s ease-in-out;
        border-radius: 20px 20px 0 0;
    }
    
    nav > a.current {
        font-weight: bold;
        border-bottom: 5px solid var(--border-color-darker);
    }

    nav > a:hover {
        background-color: var(--border-color);
    }
</style>
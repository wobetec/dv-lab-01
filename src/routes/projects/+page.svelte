<svelte:head>
    <title>Projects</title>
</svelte:head>

<script>
    import GalleryCard from '$lib/GalleryCard.svelte';
    import projects from '$lib/data/projects.json';
    import Center from '$lib/Center.svelte';
</script>

<main>
    <Center>
        <div class="gallery-container">
            {#each projects as p}
                <GalleryCard data={p}/>
            {/each}
        </div>
    </Center>
</main>

<style>
    .gallery-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        padding: 20px;
        justify-items: center;
    }
</style>

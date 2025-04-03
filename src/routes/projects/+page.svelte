<svelte:head>
    <title>Projects</title>
</svelte:head>

<script>
    import GalleryCard from '$lib/GalleryCard.svelte';
    import projects from '$lib/data/projects.json';
    import Center from '$lib/Center.svelte';

    import Pie from '$lib/graphs/Pie.svelte';
    import * as d3 from 'd3';
    
    let query = "";
    let filteredProjects;
    let rolledData;
    let pieData;

    let selectedSeasonIndex = -1;
    $: selectedSeason = selectedSeasonIndex > -1 ? pieData[selectedSeasonIndex].label : null;
    $: filteredBySeason = filteredProjects.filter(project => {
        if (selectedSeason) {
            return project.season === selectedSeason;
        }

        return true;
    });

    $: {
        filteredProjects = projects.filter(project => {
            let values = Object.values(project).join("\n").toLowerCase();
            
            return values.includes(query.toLowerCase());
        });

        
        rolledData = d3.rollups(filteredProjects, v => v.length, d => d.season);
        pieData = rolledData.map(([season, count]) => {
            return { value: count, label: season };
        });
    }
</script>

<main>
    <Center>
        <div class="search-container">
            <input type="search" bind:value={query} aria-label="Search projects" placeholder="🔍 Search projects..." />
        </div>
        <Pie data={pieData} bind:selectedIndex={selectedSeasonIndex} />
        <div class="gallery-container">
            {#each filteredBySeason as p}
                <GalleryCard data={p}/>
            {/each}
        </div>
    </Center>
</main>

<style>
    .search-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
    }

    input {
        width: 100%;
        max-width: 400px;
        padding: 10px;
        border-radius: 20px;
        border: 2px solid var(--border-color-darker);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        margin: 0 auto;
    }

    .gallery-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        padding: 20px;
        justify-items: center;
    }
</style>

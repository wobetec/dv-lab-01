<script>
    import * as d3 from 'd3';

    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

    let arc = arcGenerator({
        startAngle: 0,
        endAngle: 2 * Math.PI
    });

    export let data = [];
    export let selectedIndex = -1;
    
    let sliceGenerator = d3.pie().value(d => d.value);
    
    let arcData;
    let arcs;
    
    $:{
        arcData = sliceGenerator(data);
        arcs = arcData.map(d => arcGenerator(d));
    } 

    let colors = d3.scaleOrdinal(d3.schemeTableau10);
</script>

<div class='container'>
    <svg viewBox="-50 -50 100 100">
        {#each arcs as arc, index}
            <path d={arc} fill={ colors(index) }
                class:selected={selectedIndex === index}
                on:click={e => selectedIndex = index} />
        {/each}
    </svg>
    
    <ul class="legend">
        {#each data as d, index}
            <li style="--color: { colors(index) }">
                <span class="swatch"></span>
                {d.label} <em>({d.value})</em>
            </li>
        {/each}
    </ul>
</div>

<style>
    svg {
        max-width: 20em;
        overflow: visible;
    }

    svg:has(path:hover) path:not(:hover) {
        opacity: 50%;
    }

    path {
        transition: 500ms;
    }

    .container{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.6em;
    }

    .legend{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(8em, 1fr));
        gap: 0.6em;
        border: 1px solid var(--border-color-darker);
        padding: 1em;
        margin: 1em;
    }

    .legend li{
        display:flex;
        align-items: center;
        gap: 0.6em;
    }

    .swatch{
        display: inline-block;
        background-color: var(--color);
        width: 1em;
        height: 1em;
    }

    svg:has(.selected) path:not(.selected) {
    opacity: 50%;
    }

    .selected {
        --color: oklch(60% 45% 0) !important;
        
        &:is(path) {
            fill: var(--color) !important;
        }
        
        &:is(li) {
            color: var(--color);
        }
    }

    ul:has(.selected) li:not(.selected) {
        color: gray;
    }

    path:hover {
        opacity: 100% !important;
    }

</style>
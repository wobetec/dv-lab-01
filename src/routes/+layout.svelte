<script>
    import Header from "$lib/Header.svelte";
    import ThemeSelect from "$lib/ThemeSelect.svelte";
</script>

<ThemeSelect/>
<Header links={[
    { url: '/', title: 'Home' },  
    { url: '/projects', title: 'Projects' },
    { url: '/contact', title: 'Contact' },
    { url: '/meta', title: 'Meta' },
    { url: 'https://esdras-cavalcanti.vercel.app', title: 'Resumo' },
    // { url: '/snake', title: 'Snake' },
]}/>

<slot/>